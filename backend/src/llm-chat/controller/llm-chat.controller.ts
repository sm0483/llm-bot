import { Socket } from "socket.io";
import { LlmChatService } from "../services/llm-chat.service";
import { logger } from "../../shared/logger";
import { handleError } from "../utils/error.util";
import { MessageRequest } from "../types/socket.types";
import { BotResponse } from "../types/bot.types";

export class LLmChatController {
  private llmChatService: LlmChatService;

  constructor() {
    this.llmChatService = new LlmChatService();
  }

  public registerHandlers(socket: Socket): void {
    this.registerMessageHandlers(socket);
  }

  private registerMessageHandlers(socket: Socket): void {
    socket.on("send_message", async (data: MessageRequest) => {
      try {
        const response = await this.llmChatService.processMessage(data.message);

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
