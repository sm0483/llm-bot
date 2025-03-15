import { logger } from "../../shared/logger";
import { ChatMessage } from "../types/socket.types";

export const handleError = (
  error: any,
  defaultMessage: string,
): ChatMessage => {
  logger.error(`${defaultMessage}: ${error.message || error}`);

  const isDev = process.env.NODE_ENV !== "production";
  const errorDetails = isDev ? `: ${error.message || "Unknown error"}` : "";

  return {
    message: `Sorry, I'm having trouble processing your request${errorDetails}`,
    sender: "bot",
    timestamp: new Date().toISOString(),
  };
};
