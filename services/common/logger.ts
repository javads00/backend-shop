import winston from "winston";
import config from "../../config";

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const colorizer = winston.format.colorize();
const alignedWithColorsAndTime = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple(),
  winston.format.printf((msg) =>
    colorizer.colorize(
      msg.level,
      `${msg.timestamp} - ${msg.level}: ${msg.message} - route : ${
        msg.method
      }  ${msg.url} - status : ${msg.status} ${
        msg.show ? `- message : ${msg.show}` : ""
      }`
    )
  )
);

const options = {
  file: {
    level: "info",

    filename: `${config.logOfPathTerminam}/app.logs`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: alignedWithColorsAndTime,
  },
};

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export const onlyConsoleLog = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false,
});
