import { Application } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketConfig } from "../../config/socket.config";
import { SocketController } from "../controller/socket.controller";
import { logger } from "../../shared/logger";

export const initSocketService = (app: Application) => {
  const server = createServer(app);

  const io = new Server(server, socketConfig);

  const socketController = new SocketController();

  io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    socketController.registerHandlers(socket);

    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  logger.info("Socket.IO server initialized");
  return server;
};
