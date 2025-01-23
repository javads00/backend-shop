import axios from "axios";
import { NotFoundError } from "../utils/errors";
import config from "../config";

// تایپ دقیق پارامترها
interface SendSMSNormalParams {
  msg: string;
  listUser: string[];
}

async function sendFastMessage(params: Record<string, any>): Promise<any> {
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

// اصلاح و نوع‌دهی دقیق به پارامترها
export const sendSMSNormal = async ({ msg, listUser }: SendSMSNormalParams) => {
  try {
    const param = {
      op: "send",
      uname: process.env.UserSms,
      pass: process.env.PasswordSms,
      message: msg,
      fromNum: process.env.fnumNumberSms,
      to: listUser, // تایپ دقیق
    };

    const status = await sendFastMessage(param);
    return status;
  } catch (err) {
    return {
      success: false,
      error: new NotFoundError(config.langs["fa"].sms_record),
    };
  }
};

export default sendSMSNormal;
