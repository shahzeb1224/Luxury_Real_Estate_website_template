import React from 'react';
import { cn } from '@/utils/cn';

const Toggle = React.forwardRef(
  (
    {
      // State
      checked = false,
      defaultChecked = false,
      disabled = false,
      required = false,
      // Size
      size = 'md',
      // Content
      label,
      helperText,
      // HTML
      id,
      name,
      value,
      className = '',
      // Events
      onChange,
      onFocus,
      onBlur,
      // Accessibility
      ariaLabel,
      ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputId = id || `toggle-${Math.random().toString(36).substring(2, 9)}`;
    const helperId = `${inputId}-helper`;

    const toggleClasses = cn(
      // Base
      'relative inline-flex items-center flex-shrink-0 rounded-full transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Size
      {
        'w-9 h-5': size === 'sm',
        'w-11 h-6': size === 'md',
        'w-14 h-7': size === 'lg',
      },
      // State
      checked || defaultChecked
        ? 'bg-navy-800 focus:ring-navy-500'
        : 'bg-navy-300 focus:ring-navy-300',
      className
    );

    const knobClasses = cn(
      // Base
      'absolute left-0.5 top-0.5 rounded-full bg-white transition-transform duration-200',
      // Size
      {
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
      },
      // State
      (checked || defaultChecked) && {
        'translate-x-4': size === 'sm',
        'translate-x-5': size === 'md',
        'translate-x-7': size === 'lg',
      }
    );

    return (
      <div>
        <div className="flex items-center">
          <button
            ref={ref}
            id={inputId}
            type="button"
            role="switch"
            aria-checked={checked || defaultChecked}
            aria-label={ariaLabel || label}
            aria-describedby={helperText && helperId}
            disabled={disabled}
            className={toggleClasses}
            onClick={() => {
              if (!disabled && onChange) {
                const event = {
                  target: {
                    name: name,
                    value: value,
                    checked: !(checked || defaultChecked),
                  },
                };
                onChange(event);
              }
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
          >
            <span className={knobClasses} />
          </button>

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                'ml-3 text-sm font-medium text-navy-700 cursor-pointer',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
              {required && <span className="text-danger-500 ml-1">*</span>}
            </label>
          )}
        </div>

        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-navy-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
