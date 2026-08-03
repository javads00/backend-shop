import axios from "axios";
// import config from "./../config";

const IPPANEL_URL = "http://ippanel.com/api/select";

export const sendOtpCode = async (mobile: string, code: string) => {
  if (!mobile || !code) {
    return null;
  }

  const params = {
    op: "pattern",
    user: "khakali",
    pass: "sags@#s4Da34335",
    fromNum: "3000505",
    toNum: "09929049328",
    patternCode: "5gm1sr0thnu9qjn",
    inputData: [
      {
        "tracking-code": code,
      },
    ],
  };
  const res = await axios.post(IPPANEL_URL, params);

  return res;
};
