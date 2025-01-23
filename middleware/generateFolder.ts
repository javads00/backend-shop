import { Request, Response, NextFunction } from "express";
import { PermissionError } from "../utils/errors";

export const generateAvatar = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.files) {
    return next(new PermissionError("لطفا فایل خود را اپلود کنید"));
  }
  next();
};
