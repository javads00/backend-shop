import crypto from "crypto";
import config from "../config";

import { UserRole } from "../helper/enums";

export const encryptCitizen = (text: any) => {
  const hashed_password = crypto
    .createHmac("sha256", config?.hashData)
    .update(String(text))
    .digest("base64");
  return hashed_password;
};

export type EncryptData = {
  username?: string;
  lastName: string;
  firstName: string;
  mobile: string;
  nationalCode?: string;
  password?: string;
  type?: UserRole;
  id?: any;
  departments?: any;
  role?: any;
};

export const encryptObjCitizen = (body: EncryptData) => {
  let {
    firstName,
    lastName,
    type,
    mobile,
    username,
    departments,
    role,
    nationalCode,
    password,
  } = body;
  const values = `firstName:${firstName}-lastName:${lastName}-type:${type}-mobile:${mobile}-nationalCode:${nationalCode}-username:${username}-department:${departments.join(
    ","
  )}-role:${role}-password:${password}`;

  const hashed_password = crypto
    .createHmac("sha256", config?.hashData)
    .update(values)
    .digest("base64");

  return hashed_password;
};
