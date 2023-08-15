import { useState } from "react";
import { setCookie } from "nookies";
import { ILoginData } from "@/interfaces/interfaces";

const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
        });
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, attemptLogin };
};

export default useLogin;
