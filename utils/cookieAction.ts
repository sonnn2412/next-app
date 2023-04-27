export const setCookie = (cName: string, cValue: string) => {
  document.cookie = cName + "=" + encodeURIComponent(cValue) + ";path=/";
};

export const getCookie = (cName: string) => {
  const name = cName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const deleteCookie = (cName: string) => {
  document.cookie =
    cName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + "; path=/";
};

export const getCookieInInitialProps = (cookieString: string) => {
  let accessToken = null;
  if (cookieString) {
    cookieString.split(";").forEach((cookie: any) => {
      const [key, value] = cookie.split("=");
      if (key.trim() === "access_token") {
        accessToken = value.trim();
      }
    });
  }
  return accessToken;
};
