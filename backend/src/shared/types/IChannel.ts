import type { Socket } from "socket.io";

export interface IChannel {
  path: string;
  controller: new () => {
    registerHandlers: (socket: Socket) => void;
  };
}
