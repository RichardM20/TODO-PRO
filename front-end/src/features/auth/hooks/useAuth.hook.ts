"use client";

import { useCallback } from "react";

import AuthService from "@auth/services/auth.service";
import { ILoginPayload, IRegisterPayload } from "@auth/types/auth.type";
import { useAuthContext } from "@features/auth/context/authContext";
import { useAsyncState } from "@shared/hooks/useAsyncState";

const useAuth = () => {
  const loginState = useAsyncState<void>();
  const registerState = useAsyncState<void>();
  const profileState = useAsyncState<void>();

  const { setUserLogged } = useAuthContext();

  const login = async (payload: ILoginPayload) => {
    loginState.setIsLoading(true);
    loginState.setError("");
    try {
      const user = await AuthService.login(payload);
      if (user.data) {
        const userData = user.data;

        setUserLogged(userData);
      }
    } catch (err) {
      loginState.setError("Error logging in");
      throw err;
    } finally {
      loginState.setIsLoading(false);
    }
  };

  const register = async (payload: IRegisterPayload) => {
    registerState.setIsLoading(true);
    registerState.setError("");
    try {
      await AuthService.register(payload);
    } catch {
      registerState.setError("Error registering");
    } finally {
      registerState.setIsLoading(false);
    }
  };

  const getUser = useCallback(async () => {
    profileState.setIsLoading(true);
    try {
      const profile = await AuthService.refreshMe();
      if (profile) {
        setUserLogged(profile.data);
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    } finally {
      profileState.setIsLoading(false);
    }
  }, [profileState, setUserLogged]);

  return {
    login,
    register,
    isLoadingLogin: loginState.isLoading,
    isLoadingRegister: registerState.isLoading,
    errorLogin: loginState.error,
    errorRegister: registerState.error,
    isLoadingProfile: profileState.isLoading,
    getUser,
  };
};

export default useAuth;
