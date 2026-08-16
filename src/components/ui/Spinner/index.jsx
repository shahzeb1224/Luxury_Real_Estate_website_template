import React from 'react';
import { cn } from '@/utils/cn';

export const Spinner = ({ size = 'md', className = '', ...props }) => {
  const sizes = {
    sm: 'w-3 h-3 border-2',
    md: 'w-4 h-4 border-2',
    lg: 'w-5 h-5 border-3',
    xl: 'w-6 h-6 border-3',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-current border-t-transparent',
        sizes[size] || sizes.md,
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;