type NonFunctional<T> = T extends Function ? never : T;

export function E2A<T>(enumeration: any): NonFunctional<T[keyof T]>[] {
  return Object.keys(enumeration)
    .filter((key) => isNaN(Number(key)))
    .map((key) => enumeration[key])
    .filter(
      (val) => typeof val === "number" || typeof val === "string"
    ) as NonFunctional<T[keyof T]>[];
}

export const createID = (length: number) => {
  // بررسی اینکه طول ورودی یک عدد مثبت باشد
  if (length <= 0) {
    return {
      success: false,
      errro: new Error("Length must be a positive number"),
    };
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString(); // تبدیل به رشته و بازگشت
};
