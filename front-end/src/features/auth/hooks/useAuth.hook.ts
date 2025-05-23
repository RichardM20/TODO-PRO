"use client";

import { useRouter } from "next/navigation";

import { useCallback } from "react";

import AuthService from "@auth/services/auth.service";
import { ILoginPayload, IRegisterPayload } from "@auth/types/auth.type";
import handleAsyncAction from "@dashboard/utils/async_action";
import { useAuthContext } from "@features/auth/context/authContext";
import { useAsyncState } from "@shared/hooks/useAsyncState";

const useAuth = () => {
  const loginState = useAsyncState<void>();
  const registerState = useAsyncState<void>();
  const profileState = useAsyncState<void>();

  const router = useRouter();
  const { setUserLogged } = useAuthContext();

  const login = (payload: ILoginPayload) =>
    handleAsyncAction(
      () => AuthService.login(payload),
      loginState.setIsLoading,
      loginState.setError,
      (user) => {
        if (user?.data) {
          setUserLogged(user.data);
        }
      }
    );

  const register = (payload: IRegisterPayload) =>
    handleAsyncAction(
      () => AuthService.register(payload),
      registerState.setIsLoading,
      registerState.setError
    );

  const logout = () =>
    handleAsyncAction(
      () => AuthService.logout(),
      registerState.setIsLoading,
      registerState.setError,
      () => router.replace("/login")
    );

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
  }, []);

  return {
    login,
    register,
    logout,
    isLoadingLogin: loginState.isLoading,
    isLoadingRegister: registerState.isLoading,
    errorLogin: loginState.error,
    errorRegister: registerState.error,
    isLoadingProfile: profileState.isLoading,
    getUser,
  };
};

export default useAuth;