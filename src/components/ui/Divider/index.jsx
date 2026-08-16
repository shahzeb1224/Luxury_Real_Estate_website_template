import React from 'react';
import { cn } from '@/utils/cn';

const Divider = ({
  variant = 'solid',
  orientation = 'horizontal',
  color = 'default',
  thickness = 'default',
  className = '',
  label,
  labelClassName = '',
  ...props
}) => {
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const colorClasses = {
    default: 'border-navy-200',
    light: 'border-navy-100',
    dark: 'border-navy-700',
    gold: 'border-gold-300',
  };

  const thicknessClasses = {
    thin: 'border',
    default: 'border-2',
    thick: 'border-4',
  };

  if (orientation === 'horizontal') {
    if (label) {
      return (
        <div className={cn('flex items-center w-full', className)} {...props}>
          <div
            className={cn(
              'flex-1 border-t',
              variantClasses[variant],
              colorClasses[color],
              thicknessClasses[thickness]
            )}
          />
          <span
            className={cn(
              'px-4 text-sm font-medium text-navy-500 whitespace-nowrap',
              labelClassName
            )}
          >
            {label}
          </span>
          <div
            className={cn(
              'flex-1 border-t',
              variantClasses[variant],
              colorClasses[color],
              thicknessClasses[thickness]
            )}
          />
        </div>
      );
    }

    return (
      <div
        className={cn(
          'w-full border-t',
          variantClasses[variant],
          colorClasses[color],
          thicknessClasses[thickness],
          className
        )}
        {...props}
      />
    );
  }

  // Vertical divider
  return (
    <div
      className={cn(
        'h-full border-l',
        variantClasses[variant],
        colorClasses[color],
        thicknessClasses[thickness],
        className
      )}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';

export default Divider;
