import React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef(
  (
    {
      // State
      checked = false,
      defaultChecked = false,
      disabled = false,
      error = false,
      required = false,
      // Content
      label,
      helperText,
      errorText,
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
    const inputId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const checkboxClasses = cn(
      // Base
      'w-5 h-5 flex-shrink-0 rounded transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // State
      checked || defaultChecked
        ? 'bg-navy-800 border-navy-800 text-white'
        : 'bg-white border-2 border-navy-300',
      error && 'border-danger-500 focus:ring-danger-500',
      !error && checked && 'focus:ring-navy-500',
      !error && !checked && 'focus:ring-navy-300',
      className
    );

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            required={required}
            className="sr-only"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-label={ariaLabel || label}
            aria-describedby={cn(helperText && helperId, error && errorId, ariaDescribedBy)}
            aria-invalid={error}
            {...props}
          />
          <div
            className={cn(checkboxClasses, 'flex items-center justify-center')}
            aria-hidden="true"
          >
            {(checked || defaultChecked) && <Check className="w-3.5 h-3.5 text-white" />}
          </div>
        </div>

        <div className="ml-3">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                'text-sm font-medium text-navy-700 cursor-pointer',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
              {required && <span className="text-danger-500 ml-1">*</span>}
            </label>
          )}

          {helperText && !error && (
            <p id={helperId} className="text-xs text-navy-500 mt-0.5">
              {helperText}
            </p>
          )}

          {error && errorText && (
            <p id={errorId} className="text-xs text-danger-600 mt-0.5">
              {errorText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
