import winston from "winston";

import ENV from "@config/env.config";

const logger = winston.createLogger({
  level: ENV.LOG_LEVEL,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "log/errors.log",
      level: "error",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp} <-> ${level.toString()}: ${message}]`;
    })
  ),
});

export default logger;
