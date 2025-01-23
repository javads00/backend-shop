// import
import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
// end import

export const validateData = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const data = matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });

  // remove fake input in body
  req.body = data;
  next();
};
