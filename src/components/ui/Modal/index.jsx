import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';
import { lockScroll } from '@/utils/scroll';

const Modal = ({
  isOpen = false,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  ...props
}) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Handle escape key
  const handleEscape = useCallback(
    (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose?.();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose?.();
    }
  };

  // Lock scroll when open
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

  const modalSizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  return createPortal(
    <div
      ref={overlayRef}
      className={cn(
        'fixed inset-0 z-modal flex items-center justify-center p-4',
        'bg-overlay backdrop-blur-sm',
        'animate-fade-in',
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      {...props}
    >
      <div
        ref={contentRef}
        className={cn(
          'relative bg-white rounded-2xl shadow-premium-xl w-full',
          'animate-scale-in',
          modalSizes[size],
          contentClassName
        )}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-navy-400 hover:text-navy-600 hover:bg-navy-50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        {title && (
          <div className="px-6 pt-6 pb-4 border-b border-navy-100">
            <h2 id="modal-title" className="text-2xl font-playfair font-semibold text-navy-800">
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div className={cn('p-6', className)}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

Modal.displayName = 'Modal';

export default Modal;
