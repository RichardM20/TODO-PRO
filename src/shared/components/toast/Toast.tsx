import { AlertCircle, AlertTriangle, Check, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

import { IToastItemProps } from "../../types/toast.type";


const Toast = ({
  title,
  message,
  type = "info",
  duration = 5000,
  onClose,
  showCloseButton = true,
  isVisible,
  onRemove,
}: IToastItemProps) => {
  const [isRendered, setIsRendered] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) setIsRendered(true);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setIsExiting(true);
      const timeout = setTimeout(() => {
        setIsRendered(false);
        setIsExiting(false);
        onClose?.();
        onRemove?.();
      }, 300);
      return () => clearTimeout(timeout);
    } else if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose?.();
      onRemove?.();
    }, 300);
  };

  if (!isRendered) return null;

  const getToastStyles = () => {
    const baseStyles =
      "flex items-start p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out bg-white";

    switch (type) {
      case "success":
        return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
      case "error":
        return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
      case "warning":
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case "info":
      default:
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
    }
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5 mt-0.5 mr-3 flex-shrink-0";
    switch (type) {
      case "success":
        return <Check className={`${iconClass} text-green-600`} />;
      case "error":
        return <AlertCircle className={`${iconClass} text-red-600`} />;
      case "warning":
        return <AlertTriangle className={`${iconClass} text-yellow-600`} />;
      case "info":
      default:
        return <Info className={`${iconClass} text-blue-600`} />;
    }
  };

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] transition-all transform ${
        isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div className={getToastStyles()}>
        {getIcon()}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold text-sm mb-1 truncate">{title}</h4>
          )}
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="ml-3 flex-shrink-0 rounded-full p-1 hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
