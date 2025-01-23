import dotenv from "dotenv";
import { LangType } from "../types/common";
import * as locales from "../locales";
import "../types/request";

// load env file
const env = dotenv.config();

if (!env) {
  throw new Error();
}

// load lang
const langs: LangType = locales;

export default {
  port: parseInt(process.env.PORT || "4000", 10),
  langs,
  coreOrigin: process.env.ORIGIN!,
  databaseUrl: process.env.MONGO_URL!,
  databaseUrlTest: process.env.MONGO_URL_TEST!,
  redisUrl: process.env.REDIS_SERVER!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  accessTokenSecretCitizen: process.env.ACCESS_TOKEN_SECRET_CITIZEN!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  restrictedRoute: process.env.RESTRICTED_ROUTE!,
  hostname: process.env.HOSTNAME!,
  frontUrl: process.env.FRONT_URL!,
  passByIp: parseInt(process.env.PASS_LIMIT_BY_IP_DAY!),
  passByEmail: parseInt(process.env.PASS_LIMIT_BY_EMAIL_HOUR!),
  rabbitUrl: process.env.RABBIT_MQ_URL!,
  rabbitToken: process.env.RABBIT_TOKEN!,
  logOfPathTerminam: process.env.PathOfLogs!,
  dolatUser: process.env.USERNAMEDOLAT,
  dolatPassword: process.env.PASSWORDDOLAT,
  scope: process.env.SCOPE,
  grantType: process.env.GRANTTYPE,
  redirectDolat: process.env.REDIRECTURI,
  hashData: process.env.HASH_DATA_SECRET!,
  socketPort: Number(process.env.SOCKETPORT || 1024),
};
