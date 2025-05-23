import { LucideIcon } from "lucide-react";
import React from "react";

export type ButtonVariant = "default" | "danger" | "success";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  icon: Icon,
  variant = "default",
  disabled = false,
  className = "",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "danger":
        return "border-red-300 text-red-600 hover:bg-red-50";
      case "success":
        return "bg-red-600 text-white hover:bg-red-700";
      case "default":
      default:
        return "border-gray-300 text-gray-700 hover:bg-gray-50";
    }
  };

  const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer";
  const variantClasses = getVariantClasses();
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "";
  const borderClasses = variant === "success" ? "" : "border";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${borderClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="text-sm">{children}</span>
    </button>
  );
};

export default ActionButton;