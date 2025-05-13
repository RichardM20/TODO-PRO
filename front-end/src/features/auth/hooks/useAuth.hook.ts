"use client";

import AuthService from "@auth/services/auth.service";
import { ILoginPayload, IRegisterPayload } from "@auth/types/auth.type";
import storage from "@core/storage";
import { useAuthContext } from "@features/auth/context/authContext";
import { useAsyncState } from "@shared/hooks/useAsyncState";

const useAuth = () => {
  const loginState = useAsyncState<void>();
  const registerState = useAsyncState<void>();

  const { setUserLogged } = useAuthContext();

  const login = async (payload: ILoginPayload) => {
    loginState.setIsLoading(true);
    loginState.setError("");
    try {
      const user = await AuthService.login(payload);
      if (user.data) {
        const userData = user.data;
        storage.setToken(userData.accessToken);
        setUserLogged(userData);
      }
    } catch (err: any) {
      loginState.setError(err?.message || "Error logging in");
      throw err;
    } finally {
      loginState.setIsLoading(false);
    }
  };

  const register = async (payload: IRegisterPayload) => {
    registerState.setIsLoading(true);
    registerState.setError("");
    try {
      const user = await AuthService.register(payload);
    } catch (err: any) {
      registerState.setError(err?.message || "Error registering");
      throw err;
    } finally {
      registerState.setIsLoading(false);
    }
  };

  return {
    login,
    register,
    isLoadingLogin: loginState.isLoading,
    isLoadingRegister: registerState.isLoading,
    errorLogin: loginState.error,
    errorRegister: registerState.error,
  };
};

export default useAuth;
