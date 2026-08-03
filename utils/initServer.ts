import { existsSync, mkdirSync } from 'fs';
export const initServer = () => {
  let dirs = ['public/uploads/avatars'];

  dirs.forEach((dir) => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });
};
