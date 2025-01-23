import { Request } from "express";
import { StaffChange } from "../models/StaffChanges";
import { httpLoggerMessage } from "../services/common/httpLogger";
interface ChangeDataProps {
  req: Request;
  employ?: string | unknown;
  role?: string;
  department?: string;
  hash: string;
  status_message: number;
  version?: number;
}

////
//1 اضافه کردن کاربر
//2 ویرایش کاربر

export const statusMessage = (status: number) => {
  switch (status) {
    case 1:
      return "اضافه کردن کاربر";
    case 2:
      return "ویرایش کردن کاربر";
    default:
      return "";
  }
};

export const changeData = async ({
  req,
  employ,
  hash,
  status_message,
  version,
}: ChangeDataProps) => {
  let statusMessages = statusMessage(status_message);
  let { ip, method, url, useragent } = await httpLoggerMessage(req);

  if (employ) {
    await StaffChange.create({
      hash,
      employ,
      message: statusMessages,
      ip,
      method,
      useragent,
      url,
      user: req.currentUser?.userId,
      version: version ? version : 1,
    });
  }

  return {};
};
