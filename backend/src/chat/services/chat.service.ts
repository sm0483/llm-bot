import { logger } from "../../shared/logger";
import { ChatMessage } from "../types/socket.types";
import { GroqUtil } from "../utils/groq.util";
import { ContextRepository } from "../repository/context.repository";
import { EmbeddingUtil } from "../utils/embedding.util";
import { KEYS } from "../../config/keys";

export class ChatService {
  private groqUtil: GroqUtil;
  private contextRepository: ContextRepository;
  private embeddingUtil: EmbeddingUtil;

  constructor() {
    this.groqUtil = new GroqUtil(KEYS.GROQ_API_KEY);
    this.contextRepository = new ContextRepository();
    this.embeddingUtil = new EmbeddingUtil(KEYS.GOOGLE_API_KEY);
  }

  public async processMessage(message: string): Promise<ChatMessage> {
    try {
      const messageEmbeddings =
        await this.embeddingUtil.generateEmbedding(message);

      const retrievedContextData = await this.contextRepository.getContext(
        messageEmbeddings,
        "movies",
        "vector_index",
        "embeddings",
        5
      );
      logger.info(retrievedContextData);

      const systemMessage = this.createSystemMessage(retrievedContextData);

      const aiResponse = await this.groqUtil.getCompletion(
        systemMessage,
        message
      );

      return {
        message: aiResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
        context: message,
      };
    } catch (error) {
      logger.error(`Chat service error: ${error}`);
      throw error;
    }
  }

  private createSystemMessage(retrievedContextData: any): string {
    const contextDataString = retrievedContextData
      ? `Retrieved Context Data:\n${JSON.stringify(retrievedContextData, null, 2)}`
      : "No retrieved context data available.";

    return `
      You are an AI assistant named fin designed to respond the user's query.
  
      data: ${contextDataString}

      try to answer based on the data provided if no data don't contain that information just answer it from your knowledge
      don't tell the use system is not provided any inforamtion

    `.trim();
  }
}
