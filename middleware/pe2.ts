import { Request, Response, NextFunction } from "express";

export let p2e = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

export const converPhone = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.body && req.body?.mobile) {
    req.body.mobile = p2e(req.body.mobile);
  }
  next();
};
