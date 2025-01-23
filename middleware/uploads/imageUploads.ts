import sharp from "sharp";
import fs from "fs";
import { pathOfFile } from "../../loaders/expressLoader";
import { RequestError } from "../../utils/errors";
import path from "path";
export const uploadImages = async (photos: any, fileName: string) => {
  if (!photos) return "";

  const urlSaveImage = `${pathOfFile}/uploads/${fileName}/`;
  await fs.promises.mkdir(`${urlSaveImage}`, { recursive: true });
  let imagesArray = "";
  const random = Math.floor(Math.random() * 9999999 + 10);
  const photoName = `${random}.jpg`;

  const uri = photos.split(";base64,").pop();
  const imgBuffer = Buffer.from(uri, "base64");
  const { data: sharpBuffer1 } = await sharp(imgBuffer)
    .rotate()
    .resize(400)
    .jpeg({ mozjpeg: true })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .toBuffer({ resolveWithObject: true });

  await fs.promises.writeFile(`${urlSaveImage}${photoName}`, sharpBuffer1);
  imagesArray = `uploads/${fileName}/${photoName}`;
  return imagesArray;
};

export const uploadVideo = async (file: any, dirName: string) => {
  try {
    let dirnameFile;
    const urlSaveImage = `uploads/${dirName}/`;
    await fs.promises.mkdir(`${pathOfFile}/${urlSaveImage}`, {
      recursive: true,
    });
    const uri = file.split(";base64,").pop();
    const BufferVideo = Buffer.from(uri, "base64");

    var random = Math.floor(Math.random() * 9999999 + 10);

    dirnameFile = `${urlSaveImage}${random}.mp4`;
    fs.writeFileSync(`${pathOfFile}/${dirnameFile}`, BufferVideo);
    return dirnameFile;
  } catch (err) {
    return err;
  }
};

export const uploadSound = async (file: any, dirName: string) => {
  try {
    let dirnameFile;
    const urlSaveImage = `uploads/${dirName}/`;
    await fs.promises.mkdir(`${pathOfFile}/${urlSaveImage}`, {
      recursive: true,
    });
    var random = Math.floor(Math.random() * 9999999 + 10);
    const uri = file.split(";base64,").pop();
    const BufferSound = Buffer.from(uri, "base64");
    dirnameFile = `${urlSaveImage}${random}.mp3`;
    fs.writeFileSync(`${pathOfFile}/${dirnameFile}`, BufferSound);
    return dirnameFile;
    return null;
  } catch (err) {
    return err;
  }
};

export const uploadPdf = async (file: any, dirName: string) => {
  try {
    let dirnameFile;
    const urlSaveImage = `uploads/${dirName}/`;
    await fs.promises.mkdir(`${pathOfFile}/${urlSaveImage}`, {
      recursive: true,
    });

    var random = Math.floor(Math.random() * 9999999 + 10);

    if (file?.pdf && file?.pdf) {
      dirnameFile = `${urlSaveImage}${random}.pdf`;
      fs.writeFileSync(`${pathOfFile}/${dirnameFile}`, file?.pdf.data);
      return dirnameFile;
    }

    return null;
  } catch (err) {
    return err;
  }
};

interface Photo {
  length: number;
  data: Buffer;
  mimetype: string;
  size: number;
}

export const upload = async (photos: { file: Photo }, dirName: string) => {
  let filterImage = ["image/png", "image/jpeg"];

  if (!photos) {
    return {
      success: false,
      error: new RequestError("عکسی وجود ندارد"),
    };
  }
  if (!photos.file) {
    return {
      success: false,
      error: new RequestError("عکسی وجود ندارد"),
    };
  }

  if (photos && photos.file?.length && photos.file?.length !== 1) {
    return {
      success: false,
      error: new RequestError("بیشتر از یک عکس نمیتوانید اپلود کنید"),
    };
  }
  const file = photos.file;

  if (!filterImage.includes(file.mimetype)) {
    return {
      success: false,
      error: new RequestError("عکس خود را درست اپلود کنید"),
    };
  }

  const fileSmall = `uploads/${dirName}/small`;
  const fileBig = `uploads/${dirName}/big`;

  const filePathSmall = path.join(pathOfFile, fileSmall);
  const filePathBig = path.join(pathOfFile, fileBig);

  await fs.promises.mkdir(filePathSmall, { recursive: true });
  await fs.promises.mkdir(filePathBig, { recursive: true });
  const random = Math.floor(Math.random() * 9999999 + 10);
  const photoName = `/${random}.jpg`;

  const urlPathSmall = path.join(fileSmall, photoName);
  const urlPathBig = path.join(fileBig, photoName);

  const resizedImageSmall = await sharp(file.data)
    .resize(200, 200)
    .toFormat("png")
    .toBuffer();

  const resizedImageBig = await sharp(file.data)
    .resize(400, 400)
    .toFormat("png")
    .toBuffer();

  await fs.promises.writeFile(
    path.join(pathOfFile, urlPathSmall),
    resizedImageSmall
  );

  await fs.promises.writeFile(
    path.join(pathOfFile, urlPathBig),
    resizedImageBig
  );

  let urlSmall = fileSmall + photoName;
  let urlbig = fileBig + photoName;

  return {
    success: true,
    result: {
      small: urlSmall,
      big: urlbig,
    },
  };
};

export const avatars = async (photos: { file: Photo }, dirName: string) => {
  let filterImage = ["image/png", "image/jpeg"];

  if (!photos) {
    return {
      success: false,
      error: new RequestError("عکسی وجود ندارد"),
    };
  }
  if (!photos.file) {
    return {
      success: false,
      error: new RequestError("عکسی وجود ندارد"),
    };
  }

  if (photos && photos.file?.length && photos.file?.length !== 1) {
    return {
      success: false,
      error: new RequestError("بیشتر از یک عکس نمیتوانید اپلود کنید"),
    };
  }
  const file = photos.file;

  if (!filterImage.includes(file.mimetype)) {
    return {
      success: false,
      error: new RequestError("عکس خود را درست اپلود کنید"),
    };
  }

  const fileBig = `uploads/${dirName}`;

  const filePathBig = path.join(pathOfFile, fileBig);

  await fs.promises.mkdir(filePathBig, { recursive: true });
  const random = Math.floor(Math.random() * 9999999 + 10);
  const photoName = `/${random}.jpg`;

  const urlPathBig = path.join(fileBig, photoName);

  const resizedImageSmall = await sharp(file.data)
    .resize(200, 200)
    .toFormat("png")
    .toBuffer();

  await fs.promises.writeFile(
    path.join(pathOfFile, urlPathBig),
    resizedImageSmall
  );

  let urls = fileBig + photoName;

  return {
    success: true,
    result: urls,
  };
};

export const uploadSliderImage = async (
  photos: { file: Photo },
  dirName: string
) => {
  const filterImage = ["image/png", "image/jpeg", "image/webp"];

  if (!photos || !photos.file) {
    return {
      success: false,
      error: new RequestError("عکسی وجود ندارد"),
    };
  }

  const file = photos.file;

  if (!filterImage.includes(file.mimetype)) {
    return {
      success: false,
      error: new RequestError("لطفاً عکس خود را با فرمت صحیح آپلود کنید"),
    };
  }

  // ایجاد مسیر برای ذخیره تصویر
  const fileDir = `uploads/${dirName}`;
  const filePath = path.join(pathOfFile, fileDir);

  console.log(filePath, "filePath");

  await fs.promises.mkdir(filePath, { recursive: true });

  const random = Math.floor(Math.random() * 9999999 + 10);
  const photoName = `/${random}.jpg`;

  const urlPath = path.join(fileDir, photoName);

  // تغییر فرمت تصویر به JPG بدون تغییر سایز
  const resizedImage = await sharp(file.data)
    .toFormat("jpg") // فقط تغییر فرمت
    .toBuffer();

  await fs.promises.writeFile(path.join(pathOfFile, urlPath), resizedImage);

  const url = `${fileDir}${photoName}`;

  return {
    success: true,
    result: {
      url,
    },
  };
};

export const uploadSvg = async (photos: { file: Photo }, dirName: string) => {
  // فیلتر برای پذیرش فقط فایل‌های SVG
  const allowedMimeType = "image/svg+xml";

  if (!photos || !photos.file) {
    return {
      success: false,
      error: new RequestError("فایلی برای آپلود وجود ندارد"),
    };
  }

  const file = photos.file;

  // بررسی اینکه آیا فرمت فایل SVG است یا نه
  if (file.mimetype !== allowedMimeType) {
    return {
      success: false,
      error: new RequestError("لطفاً فقط فایل‌های SVG آپلود کنید"),
    };
  }

  // ایجاد مسیر برای ذخیره فایل SVG
  const fileDir = `uploads/${dirName}`;
  const filePath = path.join(pathOfFile, fileDir);

  // اطمینان از وجود مسیر ذخیره
  await fs.promises.mkdir(filePath, { recursive: true });

  // تولید نام تصادفی برای فایل
  const random = Math.floor(Math.random() * 9999999 + 10);
  const photoName = `/${random}.svg`;

  const urlPath = path.join(fileDir, photoName);

  // ذخیره مستقیم فایل SVG بدون تغییر
  await fs.promises.writeFile(path.join(pathOfFile, urlPath), file.data);

  const url = `${fileDir}${photoName}`;

  return {
    success: true,
    result: {
      url,
    },
  };
};
