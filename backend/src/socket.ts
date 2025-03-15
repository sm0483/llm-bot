import { Application } from "express";
import { initSocketService } from "./chat/services/socket.service";

export const setupSocketServer = (app: Application) => {
  const server = initSocketService(app);
  return server;
};
