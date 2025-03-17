import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import { logger } from "../../shared/logger";

export class EmbeddingUtil {
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor(apiKey: string, modelName: string = "text-embedding-004") {
    dotenv.config();

    if (!apiKey) {
      const error =
        "Error: Google API key is not provided and GOOGLE_API_KEY environment variable is not set";
      logger.error(error);
      throw new Error(error);
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = modelName;
    logger.info(`EmbeddingUtil initialized with model: ${modelName}`);
  }

  public async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const result = await model.embedContent(text);

      logger.debug(`Generated embedding for text (${text.length} chars)`);
      return result.embedding.values;
    } catch (error) {
      logger.error(`Error generating embedding: ${error}`);
      throw error;
    }
  }

  public async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    try {
      logger.info(`Generating batch embeddings for ${texts.length} texts`);
      const embeddings = await Promise.all(
        texts.map((text) => this.generateEmbedding(text))
      );
      return embeddings;
    } catch (error) {
      logger.error(`Error generating batch embeddings: ${error}`);
      throw error;
    }
  }
}
