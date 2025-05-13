"use client";

import useAuth from "@auth/hooks/useAuth.hook";
import AuthForm from "./AuthForm/AuthForm";

 const RegisterForm =  () =>{
  const { isLoadingRegister, errorRegister, register } = useAuth();

  return (
    <AuthForm
      type="register"
      title="Register"
      onSubmit={register}
      isLoading={isLoadingRegister}
      error={errorRegister}
      buttonText="Register"
      buttonTextLoading="Registering..."
    />
  );
}
export default RegisterForm();