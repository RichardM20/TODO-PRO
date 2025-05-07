"use client";

import useAuth from "@auth-hooks/useAuth.hook";
import AuthForm from "./AuthForm/AuthForm";

 const LoginForm =() =>{
  const { isLoading, error, login } = useAuth();

  return (
    <AuthForm
      type='login'
      title="Login"
      onSubmit={login}
      isLoading={isLoading}
      error={error}
      buttonText="Login"
      buttonTextLoading="Logging in..."
    />
  );
}

export default LoginForm();