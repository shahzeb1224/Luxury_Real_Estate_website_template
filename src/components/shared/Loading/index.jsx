import React from 'react';
import { cn } from '@/utils/cn';
import Spinner  from '@/components/ui/Spinner';

const Loading = React.forwardRef(
  (
    {
      // Variants
      variant = 'spinner',
      // Size
      size = 'md',
      // States
      fullscreen = false,
      overlay = false,
      // Content
      message,
      // Skeleton children (for skeleton variant)
      children,
      // Styling
      className = '',
      spinnerClassName = '',
      ...props
    },
    ref
  ) => {
    // Fullscreen mode
    if (fullscreen) {
      return (
        <div
          ref={ref}
          className={cn(
            'fixed inset-0 z-loader flex flex-col items-center justify-center',
            'bg-white/80 backdrop-blur-sm',
            className
          )}
          role="status"
          aria-live="polite"
          {...props}
        >
          <Spinner size={size} variant="navy" className={spinnerClassName} />
          {message && <p className="mt-4 text-sm text-navy-600">{message}</p>}
        </div>
      );
    }

    // Overlay mode
    if (overlay) {
      return (
        <div
          ref={ref}
          className={cn(
            'absolute inset-0 z-10 flex flex-col items-center justify-center',
            'bg-white/70 backdrop-blur-sm rounded-lg',
            className
          )}
          role="status"
          aria-live="polite"
          {...props}
        >
          <Spinner size={size} variant="navy" className={spinnerClassName} />
          {message && <p className="mt-3 text-sm text-navy-600">{message}</p>}
        </div>
      );
    }

    // Skeleton mode - render children with skeleton styling
    if (variant === 'skeleton') {
      return (
        <div
          ref={ref}
          className={cn('animate-pulse', className)}
          role="status"
          aria-live="polite"
          {...props}
        >
          {children}
        </div>
      );
    }

    // Default spinner mode
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center p-8', className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        <Spinner size={size} variant="navy" className={spinnerClassName} />
        {message && <p className="mt-4 text-sm text-navy-600">{message}</p>}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

export default Loading;
