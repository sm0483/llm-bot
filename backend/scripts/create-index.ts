import { MongoClient } from "mongodb";
import { connectDB, getDb, closeDB } from "./db";
import { logger } from "../src/shared/logger";

export async function createVectorIndex(collectionName: string) {
  const DB_URI = process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME;
  const COLLECTION_NAME = collectionName;
  if (!DB_URI || !DB_NAME) {
    logger.error(
      "Missing required environment variables: MONGO_URI or DB_NAME"
    );
    return;
  }
  const client = new MongoClient(DB_URI as string);

  try {
    await connectDB(DB_URI as string);
    const db = getDb(DB_NAME as string);

    const indexCreationResult = await db.command({
      createSearchIndexes: COLLECTION_NAME,
      indexes: [
        {
          name: "vector_index",
          definition: {
            mappings: {
              dynamic: false,
              fields: {
                embeddings: {
                  type: "knnVector",
                  dimensions: 768,
                  similarity: "cosine",
                },
              },
            },
          },
        },
      ],
    });

    console.log("Vector search index created:", indexCreationResult);
  } catch (err) {
    console.error("Error creating vector search index:", err);
  } finally {
    await closeDB();
  }
}

createVectorIndex('movies')