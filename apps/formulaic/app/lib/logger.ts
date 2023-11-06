import pino from "pino";

const LOG_LEVEL = process.env.LOG_LEVEL || "debug";

export const logger = pino({
  level: LOG_LEVEL,
  prettyPrint: {
    colorize: true,
    translateTime: true,
  },
});

export type Logger = typeof logger;

export const createLogger = (name: string) => logger.child({ name });
