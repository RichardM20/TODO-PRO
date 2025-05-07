import { useState } from "react";

import AuthService from "@auth-services/auth.service";
import { ILoginPayload, IRegisterPayload } from "@auth-types/auth.type";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const login = async (payload: ILoginPayload) => {
    setIsLoading(true);
    setError("");
    try {
      const user = await AuthService.login(payload);
      return user;
    } catch (err: any) {
      setError(err?.message || "Error logging in");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: IRegisterPayload) => {
    setIsLoading(true);
    setError("");
    try {
      const user = await AuthService.register(payload);
      return user;
    } catch (err: any) {
      setError(err?.message || "Error registering");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading, error };
};

export default useAuth;
