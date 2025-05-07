"use client";
import Link from "next/link";


import { IAuthFormTypeProps } from "@auth-types/form.type";


const AuthBottomLink = (props: IAuthFormTypeProps) => {
  const isLogin = props.type === "login";

  return (
    <p className="text-sm text-gray-600 text-center">
      {isLogin ? "Don’t have an account? " : "Already have an account? "}
      <Link
        href={isLogin ? "/register" : "/login"}
        className="font-medium text-cyan-600 hover:underline"
      >
        {isLogin ? "Sign up here" : "Log in here"}
      </Link>
    </p>
  );
};

export default AuthBottomLink;
