import { generateEmbedding } from "./embeddings";
import { connectDB, getDb, closeDB } from "./db";
import { Collection, Db } from "mongodb";
import { logger } from "../src/shared/logger";

interface MovieDocument {
  Title: string;
  Plot: string;
  Genre: string;
  imdbRating: string;
  embeddings?: number[];
}

interface SearchResult {
  Title: string;
  Plot: string;
  Genre: string;
  Score: number;
  Relevance: number;
}

async function searchSimilarMovies(
  query: string,
  limit = 5,
  collection: Collection<MovieDocument>
): Promise<SearchResult[]> {
  try {
    if (!query?.trim()) throw new Error("Invalid query");
    if (limit < 1 || limit > 100)
      throw new Error("Limit must be between 1-100");

    const queryEmbedding = await generateEmbedding(query);

    return await collection
      .aggregate<SearchResult>([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embeddings",
            queryVector: queryEmbedding,
            limit: Math.min(limit * 2, 200),
            numCandidates: 100,
          },
        },
        { $sort: { Relevance: -1 } },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            embeddings: 0,
          },
        },
      ])
      .toArray();
  } catch (error) {
    logger.error("Search failed:", error);
    throw error;
  }
}

export async function exampleUsage(collectionName: string) {
  try {
    const DB_URI = process.env.MONGO_URI;
    const DB_NAME = process.env.DB_NAME;
    const COLLECTION_NAME = collectionName;
    if (!DB_URI || !DB_NAME) {
      logger.error(
        "Missing required environment variables: MONGO_URI or DB_NAME"
      );
      return;
    }
    await connectDB(process.env.MONGO_URI!);
    const db = getDb(process.env.DB_NAME!);
    const moviesCollection = db.collection<MovieDocument>(COLLECTION_NAME);

    const results = await searchSimilarMovies(
      "prison drama",
      5,
      moviesCollection
    );
    console.log("Search results:", results);
  } finally {
    await closeDB();
  }
}

exampleUsage("movies");
