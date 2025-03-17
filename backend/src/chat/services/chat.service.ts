import { logger } from "../../shared/logger";
import { ChatMessage } from "../types/socket.types";
import { GroqUtil } from "../utils/groq.util";
import { ContextRepository } from "../repository/context.repository";
import { EmbeddingUtil } from "../utils/embedding.util";
import { KEYS } from "../../config/keys";
import { ServerError } from "../../shared/error/custom-error";

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
        10
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
      throw new ServerError();
    }
  }

  private createSystemMessage(retrievedContextData: any): string {
    let contextInfo = "";

    if (retrievedContextData && retrievedContextData.length > 0) {
      const contextSnippets = retrievedContextData
        .map((item: any) => item.text)
        .join("\n\n");
      contextInfo = `\n\nRelevant Information:\n${contextSnippets}\n\n`;
    }

    return `
      You are an AI assistant named fin designed to answer user queries. 
      Use the following information to answer the user's question, if relevant:
      ${contextInfo}
      If the information needed is not present, answer from your general knowledge.
      Avoid mentioning the presence of retrieved data directly.
    `.trim();
  }
}
