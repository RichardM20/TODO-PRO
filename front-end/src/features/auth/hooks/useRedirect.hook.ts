import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

import useAuth from "./useAuth.hook";

export default function useRedirectIfAuthenticated(
  redirectTo: string,
  redirectIfAuthenticated: boolean = true
) {
  const { getUser, isLoadingProfile } = useAuth();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(true);

  const checkAuth = useCallback(async () => {
    const authenticated = await getUser();
    setIsLogged(authenticated);

    if (authenticated && redirectIfAuthenticated) {
      router.replace(redirectTo);
    }

    if (!authenticated && !redirectIfAuthenticated) {
      router.replace(redirectTo);
    }
  }, [getUser, redirectIfAuthenticated, redirectTo, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isLoading: isLoadingProfile,
    isLogged,
  };
}
