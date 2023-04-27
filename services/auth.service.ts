import axios from "axios";
import { LoginPayload, PasswordChange } from "types/auth";
import { getCookie } from "utils/cookieAction";
import { getHeaders } from "utils/getHeaders";

const AuthServices = {
  login(payload: LoginPayload) {
    return axios.post("/login", payload);
  },
  logout() {
    return axios.post("/logout", null, getHeaders());
  },
  changePassword(data: PasswordChange) {
    return axios.put("/update_password", data, {
      headers: { Authorization: `Bearer ${getCookie("access_token")}` },
    });
  },
};

export default AuthServices;
