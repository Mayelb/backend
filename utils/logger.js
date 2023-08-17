import { format } from "winston";
import winston from "winston/lib/winston/config";
 

export const addLogger = winston.createLogger({
    format: winston.format.combine( format.simple(), format.colorize({ all: true }), format.timestamp()),
  transports: [
    new winston.transports.Console({
      level: "debug", 
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "warn",
    }),
  ],
});

 
 