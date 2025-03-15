import { Groq } from "groq-sdk";
import { logger } from "../../shared/logger";
import { ChatMessage } from "../types/socket.types";
import { GroqConfig } from "../types/groq.types";
import ContextDataModel from "../models/context.models";

export class GroqService {
  private client: Groq;
  private contextData: any = {};
  private config: GroqConfig;
  private systemContext: string = "";

  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    this.config = {
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: parseFloat(process.env.GROQ_TEMPERATURE || "0.7"),
      maxTokens: parseInt(process.env.GROQ_MAX_TOKENS || "1024", 10),
    };

    this.initializeSystemContext();
    logger.info("Groq service initialized with System context");
  }

  private async initializeSystemContext(): Promise<void> {
    try {
      const contextDoc = await ContextDataModel.findOne().lean();
      this.systemContext = contextDoc?.text || "";
      logger.debug("Loaded System context data");
    } catch (error) {
      logger.error("Error loading System context:", error);
      this.systemContext = "";
    }
  }

  public async updateContext(newContext: any): Promise<void> {
    this.contextData = { ...this.contextData, ...newContext };
    logger.debug(`Context updated: ${Object.keys(newContext).join(", ")}`);
  }

  public async processMessage(
    message: string,
    newContext?: any
  ): Promise<ChatMessage> {
    if (newContext) {
      await this.updateContext(newContext);
    }

    try {
      const systemMessage = this.createSystemMessage();

      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message },
        ],
        model: this.config.model,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      });

      return {
        message: completion.choices[0].message.content,
        sender: "bot",
        timestamp: new Date().toISOString(),
        context: message,
      };
    } catch (error) {
      logger.error(`Groq API error: ${error}`);
      throw error;
    }
  }

  private createSystemMessage(): string {
    const combinedContext = {
      systemContextData: this.systemContext,
      ...this.contextData,
    };

    return `you are a chatbot that will respond based on the system context and the user query and the previous user query.
    use these details to provide more abt response to the user query.

    System context : ${JSON.stringify(combinedContext.systemContextData, null, 2)}
    Current user query: ${JSON.stringify(combinedContext, null, 2)}
    Previous user query: not given now 

    if user asks a questions out of your system context, you can answer based on your knowledge or
     you can ask the user to provide more information to

    - in introduction, you can provide the information about the system and the data you have
    provide the response based on the data provided above.
    `;
  }
}
