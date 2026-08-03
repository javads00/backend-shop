import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/errors';
import config from '../config';

export const restrictedRoute = async (req: Request, _res: Response, next: NextFunction) => {
  if (req.headers['resadmin'] !== config.restrictedRoute) {
    return next(new AuthorizationError(config.langs[req.local].authorization_error));
  }

  next();
};
