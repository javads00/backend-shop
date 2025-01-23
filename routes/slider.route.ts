import express from "express";
import { body } from "express-validator";

import { generateAvatar } from "../middleware/generateFolder";
import { invalidError } from "../utils/errors";
import { validateRequest } from "../middleware/validator";

import {
  uploadFileController,
  addSliderSite,
  getSliderSite,
} from "../controllers/slider.controller";

const router = express.Router();

router
  .route("/slider/admin")
  .get(getSliderSite)
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
    addSliderSite
  );

router.route("/slider/upload/panel").post(generateAvatar, uploadFileController);

export default router;
