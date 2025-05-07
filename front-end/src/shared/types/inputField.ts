import { ChangeEvent } from "react";

export interface IInputFieldProps {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}