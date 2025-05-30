"use client";

import useAuth from "@auth/hooks/useAuth.hook";

import { IRegisterPayload } from "../types/auth.type";

import AuthForm from "./AuthForm/AuthForm";

const RegisterForm = () => {
  const { isLoadingRegister, errorRegister, register } = useAuth();

  return (
    <AuthForm
      type="register"
      title="Register"
      onSubmit={async (formData) => {
        const { email, password, name } = formData as IRegisterPayload;
        await register({ email, password, name });
      }}
      isLoading={isLoadingRegister}
      error={errorRegister}
      buttonText="Register"
      buttonTextLoading="Registering..."
    />
  );
};
export default RegisterForm;
