import { Request, Response, NextFunction } from "express";
import { responseFormat } from "../utils/responseFormat";
import { ErrorAbstract } from "../utils/errors";
import config from "../config";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ErrorAbstract) {
    responseFormat({
      req,
      res,
      statusCode: err.statusCode,
      error: err.errorMessages(),
    });
    return;
  }

  responseFormat({
    req,
    res,
    statusCode: 500,
    error: [
      {
        message: config.langs[req.local].server_error,
      },
    ],
  });
};
