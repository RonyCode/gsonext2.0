import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function useToken(token: string | null, valueToken: string | null) {
  function setToken(token: string) {
    return setCookie(token, valueToken);
  }

  function getToken() {
    return getCookie(token || "");
  }

  function removeToken() {
    return deleteCookie(token || "");
  }

  function checkToken() {
    const token = getToken();
    return !!token;
  }

  return {
    setToken,
    getToken,
    removeToken,
    checkToken,
  };
}
