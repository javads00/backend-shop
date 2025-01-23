import express from "express";
import { body } from "express-validator";

import { generateAvatar } from "../middleware/generateFolder";
import { invalidError } from "../utils/errors";
import { validateRequest } from "../middleware/validator";

import {
  createProductController,
  getProductController,
  uploadFileController,
} from "../controllers/procuct.router";

const router = express.Router();

router
  .route("/product")
  .post(
    [
      body("name")
        .optional()
        .trim()
        .isString()
        .withMessage(invalidError("slider_error"))
        .bail()
        .isLength({ min: 1, max: 68 })
        .withMessage(invalidError("slider_error")),

      body("image")
        .optional()
        .trim()
        .isString()
        .withMessage(invalidError("slider_error_image"))
        .bail()
        .isLength({ min: 1, max: 68 })
        .withMessage(invalidError("slider_error_image")),
    ],
    validateRequest,
    createProductController
  );

router.route("/product/site").get(getProductController);

router.route("/product/image").post(generateAvatar, uploadFileController);

export default router;
