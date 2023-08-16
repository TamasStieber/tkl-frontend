import { destroyCookie, parseCookies } from "nookies";

const useAuthorization = () => {
  const url = `${process.env.BACKEND_URL}/check-token/`;

  const getToken = () => {
    const cookies = parseCookies();
    const token = cookies.token;

    return token;
  };

  const checkToken = async (token: string) => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
      });

      const data = await response.json();

      if (data.valid) {
        return true;
      } else {
        destroyCookie(null, "token", { path: "/admin" });
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const checkAuthorization = async () => {
    const token = getToken();
    if (!token) return false;
    const isTokenValid = await checkToken(token);
    return isTokenValid;
  };

  return { checkAuthorization };
};

export default useAuthorization;
