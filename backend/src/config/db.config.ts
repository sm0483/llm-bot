import { MongoClient, Db, MongoClientOptions } from "mongodb";
import { KEYS } from "./keys";
import { logger } from "../shared/logger";

const mongoOptions: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 30000,
};

class Database {
  private client: MongoClient;
  private db: Db;
  private isConnected: boolean = false;

  constructor(url: string = KEYS.MONGO_URI, dbName: string = KEYS.DB_NAME) {
    this.client = new MongoClient(url, mongoOptions);
    this.db = this.client.db(dbName);
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
        logger.info("Successfully connected to MongoDB");
      } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
  }

  public getDb(): Db {
    return this.db;
  }

  public async close(): Promise<void> {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
      logger.info("MongoDB connection closed");
    }
  }
}

const database = new Database();
export default database;
