import { ServerOptions } from "socket.io";

export const socketConfig: ServerOptions = {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT || "60000", 10),
  pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL || "25000", 10),
  transports: ["websocket", "polling"],
  path: "/socket.io",
  serveClient: false,
  adapter: undefined,
  parser: undefined,
  connectTimeout: parseInt(process.env.SOCKET_CONNECT_TIMEOUT || "45000", 10),
  connectionStateRecovery: {
    maxDisconnectionDuration: parseInt(
      process.env.SOCKET_MAX_DISCONNECTION_DURATION || "20000",
      10,
    ),
    skipMiddlewares: true,
  },
  cleanupEmptyChildNamespaces: true,
};
