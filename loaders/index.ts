import { loadServer } from "./expressLoader";
import { dbConnection } from "./databaseLoader";
import { Application } from "express";
export const serverConfig = async (app: Application) => {
  const server = await loadServer(app);

  await dbConnection();
  return server;
};
