import pino from "pino";
import pretty from "pino-pretty";
const stream = pretty({
  colorize: true,
});

const LOG_LEVEL = process.env.LOG_LEVEL || "debug";

export const logger = pino(
  {
    level: LOG_LEVEL,
  },
  stream
);

export type Logger = typeof logger;

export const createLogger = ({ name }: { name: string }) =>
  logger.child({ name });
