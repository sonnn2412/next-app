import { useEffect, useState } from "react";
import { getCookie } from "utils/cookieAction";

export function useAuthSession() {
  const [auth, setAuth] = useState<string | null>(null);
  let authenticated: string | null = null;
  if (typeof window !== "undefined") authenticated = getCookie("access_token");
  useEffect(() => {
    setAuth(authenticated);
  }, [authenticated]);
  return auth;
}
