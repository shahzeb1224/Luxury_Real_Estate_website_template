import React, { useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import Toast from './index';

const ToastContainer = ({ position = 'top-right', className = '', ...props }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = toast.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <>
      <div
        className={cn(
          'fixed z-alert flex flex-col gap-3 max-w-md w-full pointer-events-none',
          positionClasses[position],
          className
        )}
        {...props}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>

      {/* Expose methods via ref or context if needed */}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          addToast,
          removeToast,
          clearToasts,
        });
      })}
    </>
  );
};

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
