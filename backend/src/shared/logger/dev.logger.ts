import { createLogger, format, transports } from "winston";

export const developmentLogger = createLogger({
  level: "info",
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});
