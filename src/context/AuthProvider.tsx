import { createContext } from "react";
import * as React from "react";
import { AuthContextType, UserType } from "types/auth";
import { getCookie } from "utils/cookieAction";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let authenticated: string | null = null;
  if (typeof window !== "undefined") authenticated = getCookie("access_token");

  const setUser = (user: UserType) => {
    setState({ ...state, user });
  };
  const [state, setState] = React.useState<AuthContextType>({
    user: null,
    setUser: setUser,
  });
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
