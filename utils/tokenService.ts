import JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const createID = async () => {
  const id = await uuidv4();
  return id;
};

export const generateAccessToken = async (userId: string) => {
  const accessToken = JWT.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: 60 * 30 * 1000,
  });
  return {
    accessToken,
  };
};
export const generateRegisterToken = async (phone: string, otp: string) => {
  const accesssMobile = JWT.sign(
    { phone, otp },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "365d",
    }
  );
  return {
    accesssMobile,
  };
};

export const generateAccessTokenCitizen = async (
  userId: string,
  isVerified: boolean
) => {
  const accessToken = JWT.sign(
    { userId, isVerified },
    process.env.ACCESS_TOKEN_SECRET_CITIZEN!,
    {
      expiresIn: 60 * 30 * 1000,
    }
  );
  return {
    accessToken,
  };
};

export const generateRefreshCitizenToken = async () => {
  const id = await createID();
  const refreshToken = JWT.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET_CITIZEN!,
    {
      expiresIn: 60 * 60 * 24 * 30 * 1000,
    }
  );

  return {
    refreshToken,
  };
};

export const verifyRegisterToken = async (token: any) => {
  try {
    const data = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

    return {
      success: true,
      phone: data.phone,
      otp: data.otp,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      id: "",
    };
  }
};

export const generateRefreshToken = async (userId: string) => {
  const refreshToken = JWT.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: 60 * 60 * 24 * 30 * 1000,
  });

  return {
    refreshToken,
  };
};
