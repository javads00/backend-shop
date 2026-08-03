import config from "../../config";
import { User } from "../../models/User";

import { FullRegister, LoginAdmin } from "./auth.type";
import { Request } from "express";
import { verify } from "argon2";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenService";
import { RequestError } from "../../utils/errors";
import { UserRole } from "../../helper/enums";
import { validatePhoneNumber } from "../../utils/validPhonenumber";
export class AuthService {
  constructor() {}

  async registerAdmin(req: Request) {
    const { password, nationalCode, firstName, lastName, mobile } =
      req.body as FullRegister;
    const validPhone = validatePhoneNumber("IR", mobile.substring(1));

    if (!validPhone) {
      return {
        success: false,
        error: new RequestError(
          config.langs[req.local].phone_number_error_valid
        ),
      };
    }

    let exitsUser;

    exitsUser = await User.findOne({ mobile });

    if (exitsUser) {
      return {
        success: false,
        error: new RequestError(config.langs[req.local].auth_exist_error),
      };
    }

    exitsUser = await User.findOne({ nationalCode });

    if (exitsUser) {
      return {
        success: false,
        error: new RequestError("کد ملی وجود دارد"),
      };
    }

    let exitUserAdmin: any = await User.findOne({ type: "admin" });

    if (exitUserAdmin) {
      return {
        success: false,
        error: new RequestError("کاربر ادمین وجود دارد "),
      };
    }

    const createResponse: any = await User.create({
      password,
      nationalCode,
      firstName,
      type: "admin",
      lastName,
      mobile,
    });

    const { accessToken } = await generateAccessToken(createResponse.id);
    const { refreshToken } = await generateRefreshToken(createResponse.id);

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  async loginNationalCodeAuth(req: Request) {
    const { nationalCode, password } = req.body as LoginAdmin;
    let exitsUser;
    console.log(nationalCode, "2");

    exitsUser = await User.findOne({
      nationalCode: nationalCode,
      type: UserRole.admin,
    }).select("+password   updatedAt firstName lastName");

    if (!exitsUser) {
      return {
        success: false,
        error: new RequestError(config.langs[req.local].auth_not_exist_error),
      };
    }
    const isValid = await verify(exitsUser.password, password);
    if (!isValid) {
      return {
        success: false,
        error: new RequestError(config.langs[req.local].auth_login_error),
      };
    }

    const { accessToken } = await generateAccessToken(exitsUser.id);

    const { refreshToken } = await generateRefreshToken(exitsUser.id);

    exitsUser = await User.findOne({
      _id: exitsUser.id,
    }).select(
      "   updatedAt firstName  nationalCode    mobile  username lastName"
    );

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        ...exitsUser?.toJSON(),
      },
    };
  }

  async registerUser(req: Request) {
    const { password, nationalCode, firstName, lastName } =
      req.body as FullRegister;

    let exitsUser;

    // const validPhone = validatePhoneNumber("IR", mobile.substring(1));
    // if (!validPhone) {
    //   return {
    //     success: false,
    //     error: new RequestError(
    //       config.langs[req.local].phone_number_error_valid
    //     ),
    //   };
    // }

    // exitsUser = await User.findOne({ mobile });

    // if (exitsUser) {
    //   return {
    //     success: false,
    //     error: new RequestError(config.langs[req.local].auth_exist_error),
    //   };
    // }

    exitsUser = await User.findOne({ nationalCode });

    if (exitsUser) {
      return {
        success: false,
        error: new RequestError("کد ملی وجود دارد"),
      };
    }

    // let exitUserAdmin: any = await User.findOne({ type: "user" });

    // if (exitUserAdmin) {
    //   return {
    //     success: false,
    //     error: new RequestError("کاربر  وجود دارد "),
    //   };
    // }

    await User.create({
      password,
      nationalCode,
      firstName,
      type: "user",
      lastName,
    });

    return {
      success: true,
      data: [],
    };
  }

  async loginUser(req: Request) {
    const { nationalCode, password } = req.body as LoginAdmin;
    let exitsUser;

    exitsUser = await User.findOne({
      nationalCode: nationalCode,
      type: UserRole.user,
    }).select("+password   updatedAt firstName lastName");

    if (!exitsUser) {
      return {
        success: false,
        error: new RequestError(config.langs[req.local].auth_not_exist_error),
      };
    }
    const isValid = await verify(exitsUser.password, password);
    if (!isValid) {
      return {
        success: false,
        error: new RequestError(config.langs[req.local].auth_login_error),
      };
    }

    const { accessToken } = await generateAccessToken(exitsUser.id);

    const { refreshToken } = await generateRefreshToken(exitsUser.id);

    exitsUser = await User.findOne({
      _id: exitsUser.id,
    }).select("updatedAt firstName  nationalCode  mobile  lastName");

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        ...exitsUser?.toJSON(),
      },
    };
  }
}
