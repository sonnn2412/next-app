import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import AuthenticatedLayout from "@/app/layouts/authenticated";
import NoAuthenticatedLayout from "@/app/layouts/no-authenticated";
import axios, { AxiosResponse } from "axios";
import { HTTPS_STATUS_UNAUTHORIZATION } from "@/constants/common";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthProvider";

import { deleteCookie, getCookie, setCookie } from "utils/cookieAction";

import { useAuthSession } from "@/lib/hooks/users";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();

  //if authenticated
  const authenticated = useAuthSession();

  axios.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    function (error) {
      const status: number = error?.response?.status;
      if (status === HTTPS_STATUS_UNAUTHORIZATION) {
        const resultPrevRoute = sessionStorage.getItem("prevRoute");
        if (!resultPrevRoute && router.asPath !== "/login")
          sessionStorage.setItem("prevRoute", router.asPath);
        if (getCookie("access_token")) {
          deleteCookie("access_token");
          deleteCookie("user");
          window.location.href = "/login";
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return getLayout(
    <AuthProvider>
      {authenticated ? (
        <AuthenticatedLayout>
          <Component {...pageProps} />
        </AuthenticatedLayout>
      ) : (
        <NoAuthenticatedLayout>
          <Component {...pageProps} />
        </NoAuthenticatedLayout>
      )}
    </AuthProvider>
  );
}
