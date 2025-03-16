import { Application } from "express";
import { initSocketService } from "./socket.service";

export const setupSocketServer = (app: Application) => {
  const server = initSocketService(app);
  return server;
};
