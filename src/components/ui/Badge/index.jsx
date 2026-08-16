import React from 'react';
import { cn } from '@/utils/cn';

const Badge = React.forwardRef(
  (
    {
      // Variants
      variant = 'default',
      size = 'md',
      // State
      pill = false,
      // Content
      children,
      className = '',
      // Accessibility
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      // Base
      'inline-flex items-center font-medium',
      // Size
      {
        'px-1.5 py-0.5 text-xs': size === 'sm',
        'px-2.5 py-1 text-sm': size === 'md',
        'px-3 py-1.5 text-base': size === 'lg',
      },
      // Shape
      {
        'rounded-full': pill,
        rounded: !pill,
      },
      // Variants
      {
        // Default
        'bg-navy-100 text-navy-700': variant === 'default',
        // Primary
        'bg-navy-800 text-white': variant === 'primary',
        // Secondary
        'bg-gold-500 text-white': variant === 'secondary',
        // Success
        'bg-success-100 text-success-700': variant === 'success',
        // Danger
        'bg-danger-100 text-danger-700': variant === 'danger',
        // Warning
        'bg-warning-100 text-warning-700': variant === 'warning',
        // Info
        'bg-info-100 text-info-700': variant === 'info',
        // Luxury Gold
        'bg-gold-500 text-white shadow-sm': variant === 'luxury',
        // Glass
        'bg-glass-white backdrop-blur-sm border border-white/20 text-navy-800': variant === 'glass',
        // Outline
        'bg-transparent border-2 border-navy-200 text-navy-600': variant === 'outline',
      },
      className
    );

    return (
      <span ref={ref} className={baseClasses} aria-label={ariaLabel} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
