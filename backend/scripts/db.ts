import { logger } from "../src/shared/logger";
import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let dbInstance: Db;

export const connectDB = async (dbUrl: string) => {
  try {
    client = new MongoClient(dbUrl);
    await client.connect();

    logger.info("Connected to MongoDB Atlas");
  } catch (err) {
    logger.error("Connection error:", err);
    throw err;
  }
};

export const getDb = (dbName: string): Db => {
  dbInstance = client.db();
  dbInstance = dbName ? client.db(dbName) : client.db();
  if (!dbInstance) {
    throw new Error("Database not initialized! Call connectDB first");
  }
  return dbInstance;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    logger.info("MongoDB connection closed");
  }
};
