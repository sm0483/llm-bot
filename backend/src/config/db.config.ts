import { logger } from "../shared/logger";
import { MongoClient, Db, MongoClientOptions } from "mongodb";
import { KEYS } from "./keys";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const mongoOptions: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS:30000
};

export async function getDbInstance(): Promise<Db> {
  if (cachedDb) {
    logger.verbose("Using cached database instance");
    return cachedDb;
  }

  if (!KEYS.MONGO_URI) {
    throw new Error("MONGO_URI environment variable not configured");
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(KEYS.MONGO_URI, mongoOptions);
      logger.debug("Creating new MongoDB client");
    }

    cachedDb = cachedClient.db(KEYS.DB_NAME);
    logger.info(`Connected to database: ${KEYS.DB_NAME}`);

    cachedClient.on("serverClosed", (event) => {
      logger.warn("MongoDB connection closed", event);
    });

    cachedClient.on("serverOpening", (event) => {
      logger.info("MongoDB connection established", event);
    });

    return cachedDb;
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);

    if (cachedClient) {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
    }

    throw new Error("Failed to connect to database");
  }
}

export async function closeDbConnection(): Promise<void> {
  if (cachedClient) {
    logger.info("Closing MongoDB connection...");
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    logger.info("MongoDB connection closed");
  }
}

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const db = await getDbInstance();
    await db.command({ ping: 1 });
    return true;
  } catch (error) {
    logger.error("Database health check failed:", error);
    return false;
  }
}
