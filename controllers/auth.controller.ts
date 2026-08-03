import { Request, Response, NextFunction } from "express";
import { responseFormat } from "../utils/responseFormat";
import config from "../config";
import { consoleLogger } from "../helper/consoleLogger";
import { AuthService } from "../services/auth/auth.service";
// import { User } from "../models/User";
// import { dbRefresh } from "../loaders/databaseLoader";
const authServiceHandler = new AuthService();

/**
 * @method : POST
 * @path : '/auth/register-admin'
 * @description : Register admin
 * @access : Private / with restricted header
 */
export const registerAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.headers;
    const result = await authServiceHandler.registerAdmin(req);

    if (result.success === false) {
      return next(result.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 201,
      message: config.langs[req.local].user_created,
      result: { ...result.data },
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};

export const authLoginNationalCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authServiceHandler.loginNationalCodeAuth(req);

    if (user.success === false) {
      return next(user.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].user_login,
      result: user,
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};

export const userCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authServiceHandler.registerUser(req);

    if (user.success === false) {
      return next(user.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: "کاربر با موفقیت ثبت نام شد",
      result: user,
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};

export const userLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authServiceHandler.loginUser(req);

    if (user.success === false) {
      return next(user.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].user_login,
      result: user,
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};
