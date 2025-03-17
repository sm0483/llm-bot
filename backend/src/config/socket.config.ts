import { ServerOptions } from "socket.io";
import { KEYS } from "./keys";

export const socketConfig: ServerOptions = {
  cors: {
    origin: KEYS.APP_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  pingTimeout: parseInt(KEYS.SOCKET_PING_TIMEOUT || "60000", 10),
  pingInterval: parseInt(KEYS.SOCKET_PING_INTERVAL || "25000", 10),
  transports: ["websocket", "polling"],
  path: "/socket.io",
  serveClient: false,
  adapter: undefined,
  parser: undefined,
  connectTimeout: parseInt(KEYS.SOCKET_CONNECT_TIMEOUT || "45000", 10),
  connectionStateRecovery: {
    maxDisconnectionDuration: parseInt(
      KEYS.SOCKET_MAX_DISCONNECTION_DURATION || "20000",
      10
    ),
    skipMiddlewares: true,
  },
  cleanupEmptyChildNamespaces: true,
};
