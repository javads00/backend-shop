import { langName } from "../locales/langEnum";
import "socket.io";

export type UserPayload = {
  userId: string;
  isVerified: boolean;
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
      local: langName;
      reqIp: string;
    }
  }
}

declare module "socket.io" {
  interface Socket {
    userId?: UserPayload;
  }
}
