export interface ILoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  buttonText: string;
  buttonTextLoading?: string;
  variant?: "fill" | "outlined";
  fullWidth?: boolean;
}
