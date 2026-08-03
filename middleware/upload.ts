import multer from "multer";
import path from "path";

export const uploadPath = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadPath);
  },
  filename: function (_req, file, cb) {
    const currentDate = new Date().toJSON().slice(0, 10);
    const filename = currentDate + "-" + Math.round(Math.random() * 1e9);
    cb(null, filename + path.extname(file.originalname));
  },
});

const fileFilter = (_req: any, _file: any, cb: any) => {
  // const MINE_TYPE_ALLOWED: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'text/css'];
  // if (MINE_TYPE_ALLOWED.includes(file.mimetype)) {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Error: File upload only supports the following filetypes - ' + MINE_TYPE_ALLOWED), false);
  // }
  cb(null, true);
};

const limits = {
  fileSize: 100 * 1024 * 1024, // 100MB
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
}).single("file");
