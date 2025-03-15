const KEYS = {
  PORT: process.env.PORT || "3000",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/your_db",
  APP_URL: process.env.APP_URL || "http://localhost:5173",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export { KEYS };
