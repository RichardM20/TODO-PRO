"use client";

import LoadingContainer from "../../../shared/components/LoadingContainer";
import useRedirectIfAuthenticated from "../hooks/useRedirect.hook";
import { ProtectedRouteProps } from "../types/route.type";


export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isLogged } = useRedirectIfAuthenticated("/login", false);

  if (isLoading) return <LoadingContainer />;
  return isLogged ? <>{children}</> : null;
}