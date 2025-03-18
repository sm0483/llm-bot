import express from "express";
import { IRoute } from "./shared/types/IRoute";
import { IChannel } from "./shared/types/IChannel";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "express-async-errors";
import { ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import database from "./config/db.config";

import { logger, morganStream } from "./shared/logger";
import errorHandler from "./shared/middleware/error-handler";
import pageNotFound from "./shared/error/not-found";
import { KEYS } from "./config/keys";
import { socketConfig } from "./config/socket.config";
import { createServer, Server as HttpServer } from "http";
import { Server } from "socket.io";

class App {
  public app: express.Application;
  public start: string;
  public port: string;
  public server: HttpServer;

  constructor(routes: IRoute[], channels: IChannel[]) {
    this.start = "/api/v1";
    this.app = express();
    this.port = KEYS.PORT;

    this.initDb();
    this.initMiddleware();
    this.initRoutes(routes);
    this.initErrorHandler();
    this.server = this.setupSocketServer(channels);
  }

  private initMiddleware = () => {
    const limiter = rateLimit({
      windowMs: parseInt(KEYS.RATE_LIMIT_WINDOW_MS),
      max: parseInt(KEYS.RATE_LIMIT_MAX),
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
    await database.connect();
  };

  private initErrorHandler = () => {
    this.app.use(pageNotFound);
    this.app.use(errorHandler as unknown as ErrorRequestHandler);
  };

  public listen = () => {
    this.server.listen(this.port, () => {
      logger.info(`connected to port ${this.port}`);
    });
  };

  private setupSocketServer = (channels: IChannel[]) => {
    const server = createServer(this.app);
    const io = new Server(server, socketConfig);

    channels.forEach(({ path, controller }) => {
      const namespace = io.of(path);
      const controllerInstance = new controller();

      namespace.on("connection", (socket) => {
        logger.info(`New client connected to ${path}: ${socket.id}`);
        controllerInstance.registerHandlers(socket);

        socket.on("disconnect", () => {
          logger.info(`Client disconnected from ${path}: ${socket.id}`);
        });
      });
    });

    logger.info(`Socket.IO initialized with ${channels.length} channels`);
    return server;
  };

  public getApp = () => {
    return this.app;
  };
}

export default App;
