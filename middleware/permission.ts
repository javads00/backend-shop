import { Request, Response, NextFunction } from "express";
import config from "../config";
import { PermissionError } from "../utils/errors";
import { PermissionEnum } from "../helper/enums";

export const adminAuth = (roles: PermissionEnum[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (
      roles.filter((e) => req.currentUser!.role.permissions.includes(e))
        .length !== roles.length
    ) {
      return next(
        new PermissionError(config.langs[req.local].permission_auth_error)
      );
    }
    next();
  };
};
