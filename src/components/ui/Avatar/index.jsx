import React from 'react';
import { cn } from '@/utils/cn';

const Avatar = React.forwardRef(
  (
    {
      // Image
      src,
      alt,
      // Fallback
      fallback,
      // Size
      size = 'md',
      // Status
      status,
      // Group
      group = false,
      groupTotal,
      // State
      className = '',
      // Accessibility
      ariaLabel,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-2xl',
      '2xl': 'w-20 h-20 text-3xl',
    };

    // Status classes
    const statusClasses = {
      online: 'bg-success-500',
      offline: 'bg-navy-300',
      busy: 'bg-danger-500',
      away: 'bg-warning-500',
    };

    // Status size classes
    const statusSizeClasses = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-3.5 h-3.5',
      '2xl': 'w-4 h-4',
    };

    // Get initials from name
    const getInitials = (name) => {
      if (!name) return '';
      const parts = name.split(' ');
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const initials = fallback || getInitials(alt);

    // Group avatar
    if (group) {
      return (
        <div className="flex -space-x-2">
          {React.Children.map(children, (child, index) => (
            <div key={index} className={cn('ring-2 ring-white rounded-full', sizeClasses[size])}>
              {child}
            </div>
          ))}
          {groupTotal && (
            <div
              className={cn(
                'flex items-center justify-center rounded-full',
                'bg-navy-200 text-navy-600 font-medium',
                'ring-2 ring-white',
                sizeClasses[size]
              )}
            >
              +{groupTotal}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex-shrink-0 rounded-full overflow-hidden',
          sizeClasses[size],
          className
        )}
        aria-label={ariaLabel || alt}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center',
              'bg-navy-100 text-navy-600 font-medium'
            )}
          >
            {initials}
          </div>
        )}

        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
              statusClasses[status],
              statusSizeClasses[size]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
