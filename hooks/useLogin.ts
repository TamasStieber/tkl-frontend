import { useEffect, useState } from "react";
import { setCookie } from "nookies";
import { ILoginData } from "@/interfaces/interfaces";
import useAuthorization from "./useAuthorization";

const useLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { checkAuthorization } = useAuthorization();

  useEffect(() => {
    const authorize = async () => {
      const isAuthenticated = await checkAuthorization();
      setLoggedIn(isAuthenticated);
    };

    authorize();
  }, [checkAuthorization]);

  const url = `${process.env.BACKEND_URL}/login/`;

  const attemptLogin = async (loginData: ILoginData) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (data.error) return setError(new Error(data.error));

      if (data.token) {
        setCookie(null, "token", data.token, {
          maxAge: 60 * 60 * 24,
          path: "/admin",
        });
        setLoggedIn(true);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, isLoggedIn, attemptLogin };
};

export default useLogin;
