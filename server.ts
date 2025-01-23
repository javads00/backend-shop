import "colors";
import config from "./config";
import express from "express";
import { serverConfig } from "./loaders";
import { logAndTerminate } from "./utils/logAndTerminate";
// import { dbRefresh } from "./loaders/databaseLoader";
const runServer = async () => {
  const app = express();
  // dbRefresh();
  const server = await serverConfig(app);

  server.listen(config.port, () => {
    console.log(
      `Server is running on port : ${config.port}`.green.underline.bold
    );
  });

  const exitHandler = logAndTerminate(server, {
    coredump: false,
    timeout: 500,
  });

  process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
  process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
  process.on("SIGTERM", exitHandler(0, "SIGTERM"));
  process.on("SIGINT", exitHandler(0, "SIGINT"));
};

runServer().then();
