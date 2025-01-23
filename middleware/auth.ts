import { Response, Request, NextFunction } from "express";
import { redisClient } from "../redis/config";
import JWT from "jsonwebtoken";
import { AuthorizationError } from "../utils/errors";
import config from "../config";
import { consoleLogger } from "../helper/consoleLogger";
import { Socket } from "socket.io";

export interface HeadersSocket {
  accesstoken: string;
  refreshtoken: string;
}

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { accesstoken, refreshtoken } = req.headers;

    // check if both exist
    if (!accesstoken || !refreshtoken) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    if (!accesstoken) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    const decodeAccess = JWT.verify(
      accesstoken as string,
      config.accessTokenSecret
    );

    req.currentUser = decodeAccess as any;
    next();
  } catch (error) {
    consoleLogger(error.message);
    return next(
      new AuthorizationError(config.langs[req.local].authorization_error)
    );
  }
};

export const authSocket = async (
  headers: HeadersSocket,
  socket: Socket,
  next: any
) => {
  try {
    const { accesstoken, refreshtoken } = headers;

    // check if both exist
    if (!accesstoken || !refreshtoken) {
      socket.disconnect(true);
      return next(
        new AuthorizationError(config.langs["fa"].authorization_error)
      );
    }

    if (!accesstoken) {
      socket.disconnect(true);
      return next(
        new AuthorizationError(config.langs["fa"].authorization_error)
      );
    }

    const decodeAccess = JWT.verify(
      accesstoken as string,
      config.accessTokenSecret
    );
    socket.userId = decodeAccess as any;
    next();
  } catch (error) {
    socket.disconnect(true);
    consoleLogger(error.message);
    return next(new AuthorizationError(config.langs["fa"].authorization_error));
  }
};

export const authUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { accesstoken, refreshtoken } = req.headers;

    // check if both exist
    if (!accesstoken || !refreshtoken) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    if (!accesstoken) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    const decodeAccess = JWT.verify(
      accesstoken as string,
      config.accessTokenSecretCitizen
    );

    req.currentUser = decodeAccess as any;
    next();
  } catch (error) {
    consoleLogger(error.message);
    return next(
      new AuthorizationError(config.langs[req.local].authorization_error)
    );
  }
};

export const hashRefreshToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { refreshtoken } = req.headers;

    if (!refreshtoken) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    const decodeRefresh = JWT.verify(
      refreshtoken as string,
      config.refreshTokenSecret
    ) as {
      id: string;
    };

    if (!decodeRefresh) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    const findInRedis = await redisClient.get(decodeRefresh.id);

    if (!findInRedis) {
      return next(
        new AuthorizationError(config.langs[req.local].authorization_error)
      );
    }

    const parsData = await JSON.parse(findInRedis);

    req.currentUser = parsData;
    next();
  } catch (error) {
    consoleLogger(error.message);
    return next(
      new AuthorizationError(config.langs[req.local].authorization_error)
    );
  }
};
