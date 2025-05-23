type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface IToastItemProps extends ToastProps {
  isVisible: boolean;
  onRemove?: () => void;
}
