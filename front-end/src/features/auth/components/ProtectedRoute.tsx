"use client";

import { ProtectedRouteProps } from "@auth/types/route.type";
import useRedirectIfAuthenticated from "@features/auth/hooks/useRedirect.hook";
import LoadingContainer from "@shared/components/LoadingContainer";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isLogged } = useRedirectIfAuthenticated("/login", false);

  if (isLoading) return <LoadingContainer />;
  return isLogged ? <>{children}</> : null;
}