import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';
import { lockScroll } from '@/utils/scroll';

const Drawer = ({
  isOpen = false,
  onClose,
  children,
  title,
  position = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  ...props
}) => {
  const handleEscape = useCallback(
    (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose?.();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      lockScroll(true);
      document.addEventListener('keydown', handleEscape);
      return () => {
        lockScroll(false);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const positionStyles = {
    right: {
      container: 'justify-end',
      drawer: 'right-0 h-full',
      animation: 'animate-slide-in',
    },
    left: {
      container: 'justify-start',
      drawer: 'left-0 h-full',
      animation: 'animate-slide-in',
    },
    top: {
      container: 'items-start',
      drawer: 'top-0 w-full',
      animation: 'animate-slide-in',
    },
    bottom: {
      container: 'items-end',
      drawer: 'bottom-0 w-full',
      animation: 'animate-slide-in',
    },
  };

  const sizeStyles = {
    sm: { right: 'w-80', left: 'w-80', top: 'h-64', bottom: 'h-64' },
    md: { right: 'w-96', left: 'w-96', top: 'h-80', bottom: 'h-80' },
    lg: { right: 'w-[32rem]', left: 'w-[32rem]', top: 'h-96', bottom: 'h-96' },
    xl: { right: 'w-[36rem]', left: 'w-[36rem]', top: 'h-[32rem]', bottom: 'h-[32rem]' },
    full: { right: 'w-full', left: 'w-full', top: 'h-full', bottom: 'h-full' },
  };

  const styles = positionStyles[position];
  const sizeClass = sizeStyles[size][position];

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-modal flex',
        styles.container,
        'bg-overlay backdrop-blur-sm',
        'animate-fade-in',
        overlayClassName
      )}
      onClick={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose?.();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
      {...props}
    >
      <div
        className={cn(
          'absolute bg-white shadow-premium-xl',
          styles.drawer,
          styles.animation,
          sizeClass,
          className
        )}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-navy-400 hover:text-navy-600 hover:bg-navy-50 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {title && (
          <div className="px-6 pt-6 pb-4 border-b border-navy-100">
            <h2 id="drawer-title" className="text-2xl font-playfair font-semibold text-navy-800">
              {title}
            </h2>
          </div>
        )}

        <div className="p-6 overflow-auto h-[calc(100%-4rem)]">{children}</div>
      </div>
    </div>,
    document.body
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
