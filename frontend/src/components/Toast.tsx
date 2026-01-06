
import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
};

export const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
  const Icon = icons[toast.type];
  const color = colors[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg shadow-lg
        bg-white dark:bg-gray-800 border-l-4 ${color}
        animate-slide-in-right
        min-w-[300px] max-w-md
      `}
    >
      <Icon className={`text-${toast.type === 'success' ? 'green' : toast.type === 'error' ? 'red' : toast.type === 'warning' ? 'yellow' : 'blue'}-500 flex-shrink-0`} size={20} />
      <p className="flex-1 text-sm text-gray-900 dark:text-white">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};
