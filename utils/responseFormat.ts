import { Request, Response } from "express";

export type errorType = {
  message?: string;
  field?: string;
};

export type ResponseType = {
  res: Response;
  statusCode: number;
  message?: string;
  error?: errorType[];
  result?: object | string;
  req: Request;
};

export const responseFormat = async (data: ResponseType) => {
  if (data.result) {
    return data.res.status(data.statusCode).json({
      success: true,
      message: data.message,
      data: data.result,
    });
  }

  return data.res.status(data.statusCode).json({
    success: false,
    error: data.error,
  });
};
