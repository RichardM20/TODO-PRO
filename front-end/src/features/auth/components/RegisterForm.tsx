"use client";

import useAuth from "@auth-hooks/useAuth.hook";
import AuthForm from "./AuthForm/AuthForm";

 const RegisterForm =  () =>{
  const { isLoading, error, register } = useAuth();

  return (
    <AuthForm
      type="register"
      title="Register"
      onSubmit={register}
      isLoading={isLoading}
      error={error}
      buttonText="Register"
      buttonTextLoading="Registering..."
    />
  );
}
export default RegisterForm();