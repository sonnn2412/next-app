import * as React from "react";
import { useContext } from "react";
import AuthServices from "services/auth.service";
import { HTTPS_STATUS_SUCCESS } from "@/constants/common";
import { useRouter } from "next/router";
import { LoginPayload } from "types/auth";
import { setCookie } from "utils/cookieAction";
import { AuthContextType } from "types/auth";
import { AuthContext } from "@/context/AuthProvider";

export default function Login() {
  const router = useRouter();
  const auth: AuthContextType = useContext(AuthContext);

  const login = async () => {
    const user: LoginPayload = {
      email: "doctor1@ishimotensyoku.jp",
      password: "secret1",
    };
    const res: any = await AuthServices.login(user);
    if (res.status === HTTPS_STATUS_SUCCESS) {
      setCookie("access_token", res.data.access_token);
      setCookie(
        "user",
        JSON.stringify({
          family_name: res.data.family_name,
          first_name: res.data.first_name,
          family_name_kana: res.data.family_name_kana,
          email: res.data.email,
        })
      );
      auth.setUser({
        family_name: res.data.family_name,
        first_name: res.data.first_name,
        family_name_kana: res.data.family_name_kana,
        email: res.data.email,
      });
      router.push("/");
    }
  };
  // End container content
  return (
    <>
      <button onClick={login}>Login</button>
    </>
  );
}
