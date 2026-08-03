import { GenderEnum } from "helper/enums";

export type LoginType = {
  mobile: string;
  nationalCode: string;
};
export type OTPType = {
  mobile: string;
  otp: string;
  fcm?: string; 
};

export type VerifyRegister = {
  firstName: string;
  lastName: string;
  accessMobile: string;
  fcm?: string;
  nationalCode?: string;
  address?: string;
  username: string;
  otp: string;
};

export type VerifyRegisterOtptype = {
  firstName: string;
  lastName: string;
  accessMobile: string;
  fcm?: string;
  nationalCode?: string;
  address?: string;
  username?: string;
  otp: string;
  password: string;
};
export type Register = {
  email: string;
  password: string;
  userName: string;
};

export type ForgetPassword = {
  email: string;
};

export type ResetPassword = {
  token: string;
  password: string;
};

export type FullRegister = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role?: string;
  personalCode?: string;
  nationalCode: string;
  departments?: string[];
  gender?: GenderEnum;
};

export type LoginAdmin = {
  username: string;
  password: string;
  token?: string;
  nationalCode:string;
};

export type LoginAdminSms = {
  mobile: string;
  code: string;
};
