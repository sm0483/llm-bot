import { Socket } from "socket.io";
import { ChatService } from "../services/chat.service";
import { logger } from "../../shared/logger";
import { handleError } from "../utils/error.util";
import { MessageRequest } from "../types/socket.types";
import { BotResponse } from "../types/bot.types";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  public registerHandlers(socket: Socket): void {
    this.registerMessageHandlers(socket);
  }

  private registerMessageHandlers(socket: Socket): void {
    socket.on("send_message", async (data: MessageRequest) => {
      try {
        const response = await this.chatService.processMessage(data.message);

        const botResponse = new BotResponse(
          response.message,
          response.context,
          socket.id
        );

        socket.emit("receive_message", botResponse);
        logger.debug(`Processed message from ${socket.id}`);
      } catch (error) {
        const errorMessage = handleError(error, "Error processing message");
        const errorResponse = new BotResponse(
          errorMessage.message,
          {},
          socket.id
        );
        socket.emit("receive_message", errorResponse);
      }
    });
  }
}
