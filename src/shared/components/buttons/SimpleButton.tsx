"use client";

import { ILoadingButtonProps } from "../../types/loadingButton.type";


const SimpleButton = ({
  isLoading = false,
  buttonText,
  buttonTextLoading,
  variant = "fill",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}: ILoadingButtonProps) => {
  const baseClasses = `
    ${fullWidth ? "w-full" : "w-auto"}
    rounded-lg px-5 py-2.5 text-center focus:outline-none focus:ring-4
    transition-all duration-200 font-medium disabled:opacity-70
    flex items-center justify-center
    cursor-pointer
  `;

  const variantClasses =
    variant === "fill"
      ? "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-300 text-white"
      : "bg-transparent border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-300";

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <div className="mr-2 h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"></div>
      )}
      {isLoading && buttonTextLoading ? buttonTextLoading : buttonText}
      {children}
    </button>
  );
};

export default SimpleButton;
