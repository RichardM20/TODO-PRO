"use client";


import useAuth from "../hooks/useAuth.hook";

import AuthForm from "./AuthForm/AuthForm";

 const LoginForm = () => {
   const { isLoadingLogin, errorLogin, login } = useAuth();

   return (
     <AuthForm
       type="login"
       title="Login"
       onSubmit={async (formData) => {
         const { email, password } = formData;
         await login({ email, password });
       }}
       isLoading={isLoadingLogin}
       error={errorLogin}
       buttonText="Login"
       buttonTextLoading="Logging in..."
     />
   );
 };

 export default LoginForm;