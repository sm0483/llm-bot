import { Socket } from "socket.io";
import { GroqService } from "../services/groq.service";
import { logger } from "../../shared/logger";
import { handleError } from "../utils/error.util";
import { MessageRequest, ChatMessage } from "../types/socket.types";

class BotResponse {
  public readonly message: string;
  public readonly context: any;
  public readonly timestamp: string;
  public readonly socketId: string;

  constructor(message: string, context: any, socketId: string) {
    this.message = message;
    this.context = context;
    this.timestamp = new Date().toISOString();
    this.socketId = socketId;
  }

  public toJSON() {
    return {
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
      socketId: this.socketId,
    };
  }
}

export class SocketController {
  private groqService: GroqService;

  constructor() {
    this.groqService = new GroqService();
  }

  public registerHandlers(socket: Socket): void {
    this.registerMessageHandlers(socket);
    this.registerContextHandlers(socket);
  }

  private registerMessageHandlers(socket: Socket): void {
    socket.on("send_message", async (data: MessageRequest) => {
      try {
        const response = await this.groqService.processMessage(
          data.message,
          data.context,
        );

        const botResponse = new BotResponse(
          response.message,
          response.context,
          socket.id,
        );

        socket.emit("receive_message", botResponse);
        logger.debug(`Processed message from ${socket.id}`);
      } catch (error) {
        const errorMessage = handleError(error, "Error processing message");
        const errorResponse = new BotResponse(
          errorMessage.message,
          {},
          socket.id,
        );
        socket.emit("receive_message", errorResponse);
      }
    });
  }

  private registerContextHandlers(socket: Socket): void {
    socket.on("update_context", async (context: any) => {
      try {
        await this.groqService.updateContext(context);
        socket.emit("context_updated", {
          success: true,
          socketId: socket.id,
          timestamp: new Date().toISOString(),
        });
        logger.debug(`Updated context for ${socket.id}`);
      } catch (error) {
        const errorMessage = handleError(error, "Error updating context");
        socket.emit("context_updated", {
          success: false,
          error: errorMessage.message,
          socketId: socket.id,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }
}
