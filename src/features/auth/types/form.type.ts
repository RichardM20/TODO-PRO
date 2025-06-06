import { ILoginPayload, IRegisterPayload } from "./auth.type";

export type AuthFormType = "login" | "register";

export interface IAuthFormTypeProps {
  type: AuthFormType;
}

export interface IAuthFormProps {
  type: AuthFormType;
  title: string;
  onSubmit: (data: ILoginPayload | IRegisterPayload) => Promise<void>;
  isLoading: boolean;
  error?: string;
  buttonTextLoading: string;
  buttonText: string;
}
