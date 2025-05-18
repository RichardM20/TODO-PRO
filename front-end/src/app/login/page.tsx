"use client";

import LoginForm from "@auth/components/LoginForm";
import useRedirectIfAuthenticated from "@features/auth/hooks/useRedirect.hook";
import LoadingContainer from "@shared/components/LoadingContainer";

const LoginPage = () => {
  const { isLoading } = useRedirectIfAuthenticated("/dashboard");

  if (isLoading) {
    return <LoadingContainer />;
  }

  return <LoginForm />;
};

export default LoginPage;
