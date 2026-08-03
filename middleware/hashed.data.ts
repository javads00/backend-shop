import crypto from "crypto";

const encryptionKey = "@IRANSYSTEM110";
const salt = Buffer.from("4976616e204d65647665646576", "hex");
const iterations = 1000;

export function encryptIranSystem(clearText: string): string {
  // تولید کلید و IV با PBKDF2
  const keyAndIv = crypto.pbkdf2Sync(
    encryptionKey,
    salt,
    iterations,
    48,
    "sha1"
  );

  const key = keyAndIv.slice(0, 32);
  const iv = keyAndIv.slice(32, 48);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(clearText, "utf16le", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
}
