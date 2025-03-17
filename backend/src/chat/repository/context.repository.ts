import { Document } from "mongodb";
import { logger } from "../../shared/logger";
import { getDbInstance } from "../../config/db.config";
import { ServerError } from "../../shared/error/custom-error";

interface ContextSearchResult extends Document {
  content: string;
  metadata?: any;
  score: number;
  [key: string]: any;
}

export class ContextRepository {
  private db;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.db = await getDbInstance();
  }

  public async getContext(
    queryVector: number[],
    collectionName: string,
    indexName: string,
    path: string,
    limit: number = 5
  ): Promise<ContextSearchResult[]> {
    try {
      if (!queryVector || queryVector.length === 0) {
        throw new Error("Invalid query vector - vector cannot be empty");
      }

      if (!collectionName?.trim()) {
        throw new Error(
          "Invalid collection name - collection name cannot be empty"
        );
      }

      if (limit < 1 || limit > 100) {
        throw new Error("Limit must be between 1-100");
      }

      const collection = await this.db.collection(collectionName);

      const results = await collection
        .aggregate([
          {
            $vectorSearch: {
              index: indexName,
              path: path,
              queryVector: queryVector,
              limit: Math.min(limit * 2, 200),
              numCandidates: 100,
            },
          },
          {
            $project: {
              _id: 0,
              embeddings: 0,
              score: { $meta: "vectorSearchScore" },
              Poster: 0,
              Production: 0,
              Website: 0,
              Response: 0,
            },
          },
          { $sort: { score: -1 } },
          {
            $match: {
              score: { $gt: 0.7 },
            },
          },
          { $limit: limit },
        ])
        .toArray();

      return results as ContextSearchResult[];
    } catch (error) {
      logger.error(`Context search failed: ${error}`);
      throw new ServerError();
    }
  }
}
