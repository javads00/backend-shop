import express, { Application } from "express";
import { createServer } from "http";
import cors from "cors";
import config from "../config";
import { attacheLang } from "../middleware/attache";
import { errorHandler } from "../middleware/errorHandler";
import { httpLogger } from "../services/common/httpLogger";
import { initServer } from "../utils/initServer";
import fileUpload from "express-fileupload";
import useragent from "express-useragent";

import authRouter from "../routes/auth.route";
import sliderRouter from "../routes/slider.route";
import productRouter from "../routes/product.route";

export let pathOfFile = String(process.env.PathOfFiles);

console.log(pathOfFile, "pathOfFile");

export const loadServer = async (app: Application) => {
  const server = createServer(app);
  const serviceUrl = "/api/user";

  app.use(express.static(pathOfFile));
  app.use(useragent.express());

  app.use(httpLogger);
  initServer();

  app.use(
    express.urlencoded({ limit: "200mb", extended: true }),
    express.json({ limit: "200mb" })
  );

  app.use(
    fileUpload({
      createParentPath: true,
      limits: { fileSize: 200 * 1024 * 1024 }, // Set the file size limit to 100 MB
    })
  );
  app.use(
    cors({
      origin: config.coreOrigin,
      methods: ["POST", "PUT", "GET", "DELETE"],
      credentials: true,
    })
  );

  app.use(attacheLang);

  app.set("trust proxy", true);

  app.use(serviceUrl, authRouter);
  app.use(serviceUrl, sliderRouter);
  app.use(serviceUrl, productRouter);

  app.use(errorHandler);

  return server;
};
