import { langName, langField } from '../locales/langEnum';
import { UserPayload } from './request';

export type LangType = {
  [name in langName]: {
    [message in langField]: string;
  };
};

export type DbFieldsType = {
  name: string;
  value: any;
};

export type ReqType = {
  currentUser?: UserPayload;
  local: langName;
  reqIp: string;
  headers: any;
  useragent: any;
  query: any;
};
