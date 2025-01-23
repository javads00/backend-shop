import axios from "axios";

export const AxiosData = async (props: {
  url: string;
  method: string;
  accesstoken: string;
  refreshtoken: string;
}) => {
  let { url, method, accesstoken, refreshtoken } = props;

  try {
    const res = await axios({
      baseURL: url,
      method: method,
      headers: {
        accessToken: accesstoken,
        refreshToken: refreshtoken,
      },
    });

    if (res?.status === (200 | 201)) {
      return res.data;
    }
    return res.data;
  } catch (err) {
    if (err?.response?.status === 401) {
      return { error: "authorization" };
    }
    return err?.response?.data;
  }
};
