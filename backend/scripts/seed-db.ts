import { generateBatchEmbeddings } from "./embeddings";
import { connectDB, getDb, closeDB } from "./db";
import dotenv from "dotenv";
import { logger } from "../src/shared/logger";
import fs from "fs";
import path from "path";

dotenv.config();

interface Movie {
  Title: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

function prepareEmbeddingText(movie: Movie): string {
  return [
    `Plot: ${movie.Plot}`,
    `Genre: ${movie.Genre}`,
    `Director: ${movie.Director}`,
    `Actors: ${movie.Actors}`,
    `Awards: ${movie.Awards}`,
  ]
    .join("\n")
    .replace(/\s+/g, " ")
    .trim();
}

const CHUNK_SIZE = 1;
const DATA_PATH = path.resolve(__dirname, "data/data.json");

export async function processMovies() {
  const rawData = fs.readFileSync(DATA_PATH, "utf-8");
  const { movies } = JSON.parse(rawData) as { movies: Movie[] };
  const DB_URI = process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME;
  const COLLECTION_NAME = "movies";
  if (!DB_URI || !DB_NAME) {
    logger.error(
      "Missing required environment variables: MONGO_URI or DB_NAME"
    );
    return;
  }

  await connectDB(DB_URI);
  const db = getDb(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  for (let i = 0; i < movies.length; i += CHUNK_SIZE) {
    const chunk = movies.slice(i, i + CHUNK_SIZE);
    const texts = chunk.map(prepareEmbeddingText);

    try {
      const embeddings = await generateBatchEmbeddings(texts);
      const docs = chunk.map((movie, idx) => ({
        ...movie,
        embeddings: embeddings[idx],
        lastUpdated: new Date(),
      }));

      await collection.insertMany(docs);
      logger.info(`Processed ${i + chunk.length}/${movies.length}`);
    } catch (error) {
      logger.error(`Failed chunk ${i}-${i + CHUNK_SIZE}:`, error);
    }
  }

  await closeDB();
}

processMovies();
