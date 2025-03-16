import dotenv from "dotenv";
dotenv.config();

const KEYS = {
  PORT: process.env.PORT || "3000",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/your_db",
  APP_URL: process.env.APP_URL || "http://localhost:5173",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_NAME: process.env.DB_NAME || "your_db",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || "900000",
  RATE_LIMIT_MAX:process.env.RATE_LIMIT_MAX || "100"
};

export { KEYS };
