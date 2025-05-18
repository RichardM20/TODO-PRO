"use client";
import { useRouter } from "next/navigation";

import { ChangeEvent, FormEvent, useState } from "react";

import { IAuthFormProps } from "@auth/types/form.type";
import SimpleButton from "@shared/components/buttons/SimpleButton";
import ErrorContainer from "@shared/components/ErrorContainer";
import InputField from "@shared/components/inputs/FieldForm";
import { emailRegex } from "@shared/utils/validEmail";

import AuthBottomLink from "./AuthBottomLink";

const AuthForm = (props: IAuthFormProps) => {
  const router = useRouter();
  const [emailInvalid, setEmailInvalid] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleField = (
    field: keyof typeof formData,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailInvalid("");
    if (!emailRegex.test(formData.email)) {
      setEmailInvalid("Email invalid, please enter a valid email");
      return;
    }

    await props.onSubmit(formData);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="p-8">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
            {props.title}
          </h2>
          <form onSubmit={handleOnSubmit}>
            {props.type === "register" && (
              <InputField
                label="Username"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleField("name", e)}
                placeholder="Username"
              />
            )}

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleField("email", e)}
              placeholder="tu@email.com"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleField("password", e)}
              placeholder="••••••••"
            />

            {(props.error || emailInvalid) && (
              <ErrorContainer error={props.error || emailInvalid} />
            )}

            <SimpleButton
              fullWidth={true}
              buttonText={props.buttonText}
              isLoading={props.isLoading}
              buttonTextLoading={props.buttonTextLoading}
              type="submit"
            />

            <div className="mt-4 text-center text-sm text-gray-600">
              <AuthBottomLink type={props.type} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
