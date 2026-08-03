

import axios from "axios";

export async function verifyRecaptcha(token: string) {
  const secretKey = "6LfGVf8pAAAAAAd3Diq9ndct-jRwhb1mUOk9T4m0";
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  );
  return data.success;
}
