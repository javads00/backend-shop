import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";

export const validateParams = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const params = matchedData(req, {
    locations: ["params"],
    includeOptionals: false,
  });
  // حذف پارامترهای جعلی

  req.params = params;
  next();
};
