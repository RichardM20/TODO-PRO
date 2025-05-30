"use client";

import LoginForm from "@auth/components/LoginForm";
import useRedirectIfAuthenticated from "@auth/hooks/useRedirect.hook";
import LoadingContainer from "@shared/components/LoadingContainer";

const LoginPage = () => {
  const { isLoading, isLogged } = useRedirectIfAuthenticated("/dashboard");

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isLogged) {
    return null;
  }

  return <LoginForm />;
};

export default LoginPage;
