"use client";

import useAuth from "@auth-hooks/useAuth.hook";
import AuthForm from "./AuthForm/AuthForm";

 const LoginForm = () => {
   const { isLoadingLogin, errorLogin, login } = useAuth();

   return (
     <AuthForm
       type="login"
       title="Login"
       onSubmit={login}
       isLoading={isLoadingLogin}
       error={errorLogin}
       buttonText="Login"
       buttonTextLoading="Logging in..."
     />
   );
 };

 export default LoginForm;