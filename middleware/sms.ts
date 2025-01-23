import axios from "axios";
import { NotFoundError } from "../utils/errors";
import config from "../config";

async function sendFastMessage(params: any): Promise<any> {
  try {
    const IPPANEL_URL = "http://ippanel.com/api/select";

    const res = await axios.post(IPPANEL_URL, params);

    if (res?.status === 201 || res?.status === 200) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: new NotFoundError(config.langs["fa"].data_not_found_sms),
    };
  } catch (err) {
    return {
      success: false,
      error: new NotFoundError(config.langs["fa"].data_not_found_sms),
    };
  }
}

async function sendSMS(configSms: any): Promise<any> {
  let { phone, type, code, fullname, password, username, link } = configSms;

  // fnum 403 , 422 pid ,

  const params: { [key: string]: any } = {
    ////کد پیگیری فرستادن
    trackingCode: {
      op: "pattern",
      user: process.env.UserSms,
      pass: process.env.PasswordSms,
      fromNum: process.env.fnumNumberSms,
      toNum: String(phone),
      patternCode: process.env.TrackingCodePatern,
      inputData: [{ "tracking-code": String(code) }],
    },

    ////ارسال کد
    verificationCode: {
      op: "pattern",
      user: process.env.UserSms,
      pass: process.env.PasswordSms,
      fromNum: process.env.fnumNumberSms,
      toNum: String(phone),
      patternCode: process.env.VerificationCodePatern,
      inputData: [{ "verification-code": String(code) }],
    },

    registrationAdmin: {
      op: "pattern",
      user: process.env.UserSms,
      pass: process.env.PasswordSms,
      fromNum: process.env.fnumNumberSms,
      toNum: String(phone),
      patternCode: process.env.RegistrationAdminPatern,
      inputData: [
        {
          fullname: String(fullname),
          userName: String(username),
          password: String(password),
        },
      ],
    },

    recordSound: {
      op: "pattern",
      user: process.env.UserSms,
      pass: process.env.PasswordSms,
      fromNum: process.env.fnumNumberSms,
      toNum: String(phone),
      patternCode: process.env.RecordSoundPatern,
      inputData: [
        {
          link: String(link),
        },
      ],
    },

    forgetPasword: {
      op: "pattern",
      user: process.env.UserSms,
      pass: process.env.PasswordSms,
      fromNum: process.env.fnumNumberSms,
      toNum: String(phone),
      patternCode: process.env.ForgetPaswordPatern,
      inputData: [
        {
          code: String(code),
        },
      ],
    },
  };

  try {
    const param = params[type];

    const status = await sendFastMessage(param);

    return status;
  } catch (err) {
    return {
      success: false,
      error: new NotFoundError(config.langs["fa"].sms_record),
    };
  }
}

export default sendSMS;
