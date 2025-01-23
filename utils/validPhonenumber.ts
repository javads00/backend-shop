import d from "google-libphonenumber";
const temp = d.PhoneNumberUtil.getInstance();

export const validatePhoneNumber = (code: string, mobile: string) => {
  const number = temp.parseAndKeepRawInput(mobile, code);
  const valid = temp.isValidNumberForRegion(number, code);

  return valid;
};
