import { unlinkSync } from 'fs';
import { consoleLogger } from '../helper/consoleLogger';
import { pathOfFile } from '../loaders/expressLoader';
import path from 'path';

export const deleteFile = async (filePath: string) => {
  try {
    const pathToRemove = path.join(pathOfFile, filePath);

    unlinkSync(pathToRemove);
    return true;
  } catch (error) {
    consoleLogger(error.message);
    return false;
  }
};
