import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";

export const validateQuery = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const params = matchedData(req, {
    locations: ["query"], // Change "params" to "query" to validate query parameters
    includeOptionals: false,
  });

  req.query = params; // Set req.query to the validated parameters

  next();
};
