import express from "express";
import { body } from "express-validator";
import {
  authLoginNationalCodeController,
  registerAdminController,
  userCreateController,
  userLoginController,
} from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validator";
import { validateData } from "../middleware/validateData";
import { invalidError } from "../utils/errors";
import { restrictedRoute } from "../middleware/restricted";

const router = express.Router();

router.post(
  "/auth/register-admin",
  restrictedRoute,
  [
    body("nationalCode")
      .trim()
      .isString()
      .withMessage(invalidError("national_code_error"))
      .bail()
      .isLength({ min: 7, max: 10 })
      .withMessage(invalidError("national_code_error")),
    body("firstName")
      .trim()
      .isString()
      .withMessage(invalidError("first_name_error"))
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage(invalidError("first_name_error_length")),
    body("lastName")
      .trim()
      .isString()
      .withMessage(invalidError("last_name_error"))
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage(invalidError("last_name_error_length")),
    body("mobile")
      .trim()
      .isString()
      .withMessage(invalidError("phone_number_error"))
      .bail()
      .isLength({ min: 11, max: 11 })
      .withMessage(invalidError("phone_number_error_valid"))
      .bail()
      .isInt()
      .withMessage(invalidError("phone_number_error")),

    body("password")
      .trim()
      .isString()
      .withMessage(invalidError("password_validate_length"))
      .bail()
      .isLength({ min: 8, max: 50 })
      .withMessage(invalidError("password_validate_length")),
  ],
  validateRequest,
  registerAdminController
);

router.post(
  "/auth/login",
  [
    body("nationalCode")
      .trim()
      .isString()
      .withMessage(invalidError("national_code_error"))
      .bail()
      .isLength({ min: 7, max: 10 })
      .withMessage(invalidError("national_code_error")),
    body("password")
      .trim()
      .isString()
      .withMessage(invalidError("password_validate_length"))
      .bail()
      .isLength({ min: 8, max: 50 })
      .withMessage(invalidError("password_validate_length")),
  ],
  validateRequest,
  validateData,
  authLoginNationalCodeController
);

router
  .route("/users")
  .post(
    [
      body("nationalCode")
        .trim()
        .isString()
        .withMessage(invalidError("national_code_error"))
        .bail()
        .isLength({ min: 7, max: 10 })
        .withMessage(invalidError("national_code_error")),

      body("password")
        .optional()
        .trim()
        .isString()
        .withMessage(invalidError("password_validate_length"))
        .bail()
        .isLength({ min: 8, max: 50 })
        .withMessage(invalidError("password_validate_length")),
    ],
    validateRequest,
    userCreateController
  );

router
  .route("/users/login")
  .post(
    [
      body("nationalCode")
        .trim()
        .isString()
        .withMessage(invalidError("national_code_error"))
        .bail()
        .isLength({ min: 7, max: 10 })
        .withMessage(invalidError("national_code_error")),
      body("password")
        .trim()
        .isString()
        .withMessage(invalidError("password_validate_length"))
        .bail()
        .isLength({ min: 8, max: 50 })
        .withMessage(invalidError("password_validate_length")),
    ],
    validateRequest,
    validateData,
    userLoginController
  );

export default router;
