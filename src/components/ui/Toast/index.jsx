import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const Toast = ({
  id,
  message,
  description,
  type = 'info',
  duration = 5000,
  onClose,
  className = '',
  ...props
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const typeStyles = {
    success: {
      icon: CheckCircle,
      bg: 'bg-success-50 border-success-500',
      text: 'text-success-700',
      iconColor: 'text-success-500',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-danger-50 border-danger-500',
      text: 'text-danger-700',
      iconColor: 'text-danger-500',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-warning-50 border-warning-500',
      text: 'text-warning-700',
      iconColor: 'text-warning-500',
    },
    info: {
      icon: Info,
      bg: 'bg-info-50 border-info-500',
      text: 'text-info-700',
      iconColor: 'text-info-500',
    },
  };

  const styles = typeStyles[type] || typeStyles.info;
  const Icon = styles.icon;

  return createPortal(
    <div
      className={cn(
        'relative rounded-lg shadow-premium border-l-4 p-4 mb-3 animate-slide-in',
        styles.bg,
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="flex items-start">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.iconColor)} />
        <div className="ml-3 flex-1">
          <p className={cn('text-sm font-medium', styles.text)}>{message}</p>
          {description && <p className="mt-1 text-sm text-navy-600">{description}</p>}
        </div>
        <button
          onClick={() => onClose?.(id)}
          className="ml-4 p-1 rounded-full text-navy-400 hover:text-navy-600 hover:bg-navy-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>,
    document.body
  );
};

Toast.displayName = 'Toast';

export default Toast;
