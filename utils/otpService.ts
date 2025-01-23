import { RoleDoc } from "../models/Role";
import { redisClient } from "../redis/config";

export const createID = (length: number) => {
  // بررسی اینکه طول ورودی یک عدد مثبت باشد
  if (length <= 0) {
    return {
      success: false,
      errro: new Error("Length must be a positive number"),
    };
  }
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
};

export const generateOtp = async (
  mobile: string,
  userId: string,
  role: string | RoleDoc,
  isVerified: boolean
) => {
  const check = await redisClient.get(mobile);

  if (check) {
    const temp = JSON.parse(check);
    return temp.otp;
  }
  const otp = await createID(2);

  await redisClient.set(
    mobile,
    JSON.stringify({ otp, userId, role, isVerified }),
    "EX",
    60 * 2
  );
  return otp;
};
