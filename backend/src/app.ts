import express from "express";
import { IRoute } from "./shared/types/IRoute";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "express-async-errors";
import { ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { getDbInstance } from "./config/db.config";

import { morganStream } from "./shared/logger";
import errorHandler from "./shared/middleware/error-handler";
import pageNotFound from "./shared/error/not-found";
import { setupSocketServer } from "./socket/socket";
import { KEYS } from "./config/keys";

class App {
  public app: express.Application;
  public start: string;
  public port: string;
  public server: ReturnType<typeof setupSocketServer>;

  constructor(routes: IRoute[]) {
    this.start = "/api/v1";
    this.app = express();
    this.initDb();
    this.initMiddleware();
    this.initRoutes(routes);
    this.port = KEYS.PORT;
    this.initErrorHandler();
    this.server = setupSocketServer(this.app);
  }

  private initMiddleware = () => {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message:
        "Too many requests from this IP, please try again after 15 minutes",
    });

    this.app.use(limiter);
    this.app.use(morgan("combined", { stream: morganStream }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: [KEYS.APP_URL as string],
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "UPDATE"],
      })
    );
  };

  private initRoutes = (routes: IRoute[]) => {
    routes.forEach((route) => {
      this.app.use(this.start, route.router);
    });
  };
  private initDb = async () => {
    await getDbInstance();
  };

  private initErrorHandler = () => {
    this.app.use(pageNotFound);
    this.app.use(errorHandler as unknown as ErrorRequestHandler);
  };

  public listen = () => {
    this.server.listen(this.port, () => {
      console.log(`connected to port ${this.port}`);
    });
  };

  public getApp = () => {
    return this.app;
  };
}

export default App;
