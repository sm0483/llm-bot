import { Groq } from "groq-sdk";
import { logger } from "../../shared/logger";

export class GroqUtil {
  private client: Groq;
  private config: {
    model: string;
    temperature: number;
    maxTokens: number;
  };

  constructor(
    apiKey: string,
    model?: string,
    temperature?: string,
    maxTokens?: string
  ) {
    this.client = new Groq({
      apiKey: apiKey,
    });

    this.config = {
      model: model || "llama-3.3-70b-versatile",
      temperature: parseFloat(temperature || "0.7"),
      maxTokens: parseInt(maxTokens || "1024", 10),
    };

    logger.info("Groq provider initialized");
  }

  public async getCompletion(
    systemMessage: string,
    userMessage: string
  ): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
        model: this.config.model,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error(`Groq API error: ${error}`);
      throw error;
    }
  }
}
