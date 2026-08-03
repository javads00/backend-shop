import axios from "axios";

export const Axios = async (props: { url: string; token?: string }) => {
  let { url, token } = props;

  try {
    // تبدیل ورودی‌ها به رشته
    url = String(url);
    token = String(token);

    const res = await axios({
      baseURL: url,
      method: "POST",
      headers: {
        Authorization:
          "Basic bXkubmFzaW1zaGFocjprZDlzMWlsZmY5NmVoYzZta2NneWh2eWdsOGNmcTQ5OQ==",
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
