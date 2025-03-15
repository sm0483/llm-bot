import { productionLogger } from "./prod.logger";
import { developmentLogger } from "./dev.logger";
import { KEYS } from "../../config/keys";

export const logger =
  KEYS.NODE_ENV === "production" ? productionLogger : developmentLogger;

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
