import fs from "fs/promises";
import { pathOfFile } from "../../loaders/expressLoader";
async function deleteImage(url: string): Promise<boolean> {
  if (!url) {
    return false;
  }

  const path = `${pathOfFile}/` + url;

  try {
    await fs.access(path, fs.constants.F_OK);
    await fs.unlink(path);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default deleteImage;
