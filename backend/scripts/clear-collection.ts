import { connectDB, getDb, closeDB } from "./db";
import { logger } from "../src/shared/logger";

export async function clearCollection(collectionName: string) {
  const DB_URI = process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME;

  if (!DB_URI || !DB_NAME) {
    logger.error(
      "Missing required environment variables: MONGO_URI or DB_NAME"
    );
    return;
  }
  try {
    await connectDB(DB_URI);
    const db = getDb(DB_NAME);

    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    if (collections.length > 0) {
      await db.collection(collectionName).drop();
      console.log(`Collection ${collectionName} dropped successfully`);
    } else {
      console.log(
        `Collection ${collectionName} does not exist, nothing to drop`
      );
    }
  } catch (err) {
    console.error(`Error clearing collection ${collectionName}:`, err);
    throw err;
  } finally {
    await closeDB();
  }
}

clearCollection('movies')