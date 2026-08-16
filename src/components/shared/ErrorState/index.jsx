import React from 'react';
import { cn } from '@/utils/cn';
import { AlertCircle, Server, Shield, Link, FileX } from 'lucide-react';

const ErrorState = React.forwardRef(
  (
    {
      // Type
      type = 'default',
      // Content
      title,
      description,
      // Action
      retry,
      retryLabel = 'Try Again',
      // Size
      size = 'md',
      // Styling
      className = '',
      iconClassName = '',
      titleClassName = '',
      descriptionClassName = '',
      // Children
      children,
      ...props
    },
    ref
  ) => {
    const errorTypes = {
      default: {
        icon: AlertCircle,
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'danger',
      },
      404: {
        icon: FileX,
        title: 'Page Not Found',
        description: "The page you are looking for doesn't exist or has been moved.",
        variant: 'warning',
      },
      500: {
        icon: Server,
        title: 'Server Error',
        description: 'Our servers are experiencing issues. Please try again later.',
        variant: 'danger',
      },
      'no-data': {
        icon: AlertCircle,
        title: 'No Data Available',
        description: 'There is no data to display at this time.',
        variant: 'info',
      },
      'permission-denied': {
        icon: Shield,
        title: 'Access Denied',
        description: "You don't have permission to access this resource.",
        variant: 'danger',
      },
      'not-found': {
        icon: Link,
        title: 'Resource Not Found',
        description: 'The requested resource could not be found.',
        variant: 'warning',
      },
    };

    const currentError = errorTypes[type] || errorTypes.default;
    const IconComponent = currentError.icon;

    const variantClasses = {
      danger: {
        iconBg: 'bg-danger-50 text-danger-500',
        border: 'border-danger-200',
      },
      warning: {
        iconBg: 'bg-warning-50 text-warning-500',
        border: 'border-warning-200',
      },
      info: {
        iconBg: 'bg-info-50 text-info-500',
        border: 'border-info-200',
      },
    };

    const currentVariant = variantClasses[currentError.variant] || variantClasses.info;

    const sizeClasses = {
      sm: {
        icon: 'w-10 h-10',
        title: 'text-lg',
        description: 'text-sm',
        spacing: 'space-y-2',
      },
      md: {
        icon: 'w-14 h-14',
        title: 'text-2xl',
        description: 'text-base',
        spacing: 'space-y-3',
      },
      lg: {
        icon: 'w-20 h-20',
        title: 'text-3xl',
        description: 'text-lg',
        spacing: 'space-y-4',
      },
    };

    const currentSize = sizeClasses[size];

    const errorTitle = title || currentError.title;
    const errorDescription = description || currentError.description;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          'p-8 sm:p-12',
          'rounded-2xl border-2',
          currentVariant.border,
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div
          className={cn(
            'flex items-center justify-center rounded-full',
            currentVariant.iconBg,
            currentSize.icon,
            iconClassName
          )}
        >
          <IconComponent className="w-1/2 h-1/2" />
        </div>

        {/* Content */}
        <div className={cn('mt-4', currentSize.spacing)}>
          <h3
            className={cn(
              'font-playfair font-semibold text-navy-800',
              currentSize.title,
              titleClassName
            )}
          >
            {errorTitle}
          </h3>

          <p
            className={cn('text-navy-500 max-w-sm', currentSize.description, descriptionClassName)}
          >
            {errorDescription}
          </p>

          {children}
        </div>

        {/* Retry Button */}
        {retry && (
          <button
            onClick={retry}
            className={cn(
              'mt-6 inline-flex items-center px-6 py-3 rounded-lg font-semibold',
              'bg-navy-800 text-white hover:bg-navy-700 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2'
            )}
          >
            {retryLabel}
          </button>
        )}
      </div>
    );
  }
);

ErrorState.displayName = 'ErrorState';

export default ErrorState;
