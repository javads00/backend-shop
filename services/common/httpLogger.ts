import morgan from "morgan";
import json from "morgan-json";
import { logger } from "./logger";
// import {postLogToMongoDB} from './logger';
import { Request } from "express";
import ip from "ip";
import os from "node:os";
const format = json({
  method: ":method",
  url: ":url",
  ip: ":remote-addr",
  status: ":status",
  contentLength: ":res[content-length]",
  useragent: ":user-agent",
  responseTime: ":response-time",
});

export const httpLogger = morgan(format, {
  stream: {
    write: (message) => {


      const { method,url,status, contentLength, responseTime, useragent} = JSON.parse(message);

   

      // postLogToMongoDB();


      if (Number(status) >= 400) {
        // error
        logger.error("HTTP LOG NOT SUCCESS", {
          timestamp: new Date().toString(),
          method,
          url,
          status: Number(status),
          contentLength,
          responseTime: Number(responseTime),
          useragent,
        });
      } else {
        // info
        logger.info("HTTP LOG SUCCESS", {
          timestamp: new Date().toString(),
          method,
          url,
          status: Number(status),
          contentLength,
          responseTime: Number(responseTime),
          message,
        });
      }
    },
  },
});

export const httpLoggerMessage = (req: Request) => {
  const { method, url } = req;

  const contentLength = req.get('content-length') || 0;
  const useragent = req.get('user-agent') || '';



  var getIP = ip.address();
  return {
    timestamp: new Date().toString(),
    method,
    url,
    contentLength,
    useragent,
    ip: getIP,
    os: os.platform(),
  };
};
