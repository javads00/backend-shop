import multer from "multer";
import { Request } from "express";

const avatarSize = 1 * 1024 * 1024;

const avatarFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  return file?.mimetype?.includes("image") ? cb(null, true) : cb(null, false);
};

const avatarStorage = multer.memoryStorage();

const avatarUploadHandler = multer({
  storage: avatarStorage,
  fileFilter: avatarFilter,
  limits: { fileSize: avatarSize },
});

export const avatarUploader = avatarUploadHandler.single("avatar");
