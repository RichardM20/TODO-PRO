import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import useAuth from "./useAuth.hook";

export default function useRedirectIfAuthenticated(
  redirectTo: string,
  redirectIfAuthenticated: boolean = true
) {
  const { getUser, isLoadingProfile } = useAuth();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await getUser();
      setIsLogged(authenticated);

      if (authenticated && redirectIfAuthenticated) {
        router.replace(redirectTo);
      }

      if (!authenticated && !redirectIfAuthenticated) {
        router.replace(redirectTo);
      }
    };

    checkAuth();
  }, [getUser, redirectTo, redirectIfAuthenticated, router]);

  return {
    isLoading: isLoadingProfile,
    isLogged,
  };
}
