import { getCookie } from "./cookieAction";

export const getHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getCookie("access_token")}` },
  };
};
