import config from '../config';
import { Request, Response, NextFunction } from 'express';
import { langName } from '../locales/langEnum';
import { getClientIp } from '@supercharge/request-ip/dist';


export const attacheLang = async (req: Request, _res: Response, next: NextFunction) => {
  const {
    lang,
  } : {
    lang: langName;
  } = req.headers as any;
  if (req.headers.lang && config.langs[lang]) {
    req.local = lang;
  } else {
    req.local = langName.fa;
  }
  
  // inside middleware handler

  const clientIp = getClientIp(req);

  req.reqIp = clientIp ? clientIp.replace('::ffff:', '') : '';

  next();
};
