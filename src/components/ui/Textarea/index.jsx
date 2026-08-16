import React, { useState } from 'react';
import { cn } from '@/utils/cn';

const Textarea = React.forwardRef(
  (
    {
      // Variants
      variant = 'default',
      size = 'md',
      // State
      error = false,
      success = false,
      disabled = false,
      required = false,
      // Content
      label,
      helperText,
      errorText,
      successText,
      placeholder,
      value,
      defaultValue,
      onChange,
      rows = 4,
      // HTML
      id,
      name,
      className = '',
      // Character count
      maxLength,
      showCharCount = false,
      // Accessibility
      ariaLabel,
      ariaDescribedBy,
      // Events
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(value?.length || defaultValue?.length || 0);
    const [focused, setFocused] = useState(false);

    const inputId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const handleChange = (e) => {
      const newValue = e.target.value;
      if (onChange) onChange(e);
      if (showCharCount && maxLength) {
        setCharCount(newValue.length);
      }
    };

    const textareaClasses = cn(
      // Base
      'w-full transition-all duration-200 resize-y',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Size
      {
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-5 py-3 text-lg': size === 'lg',
      },
      // Variant
      {
        'bg-white border border-navy-200 rounded-lg': variant === 'default',
        'bg-navy-50 border border-navy-200 rounded-lg': variant === 'filled',
        'bg-transparent border-b-2 border-navy-200 rounded-none': variant === 'underline',
        'bg-glass-white backdrop-blur-sm border border-white/20 rounded-lg': variant === 'glass',
      },
      // State
      {
        'border-danger-500 focus:ring-danger-500': error,
        'border-success-500 focus:ring-success-500': success,
        'border-navy-800 focus:ring-navy-500': !error && !success && focused,
        'border-navy-200': !error && !success && !focused,
      },
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-navy-700 mb-1.5',
              required && "after:content-['*'] after:text-danger-500 after:ml-1"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            className={textareaClasses}
            onChange={handleChange}
            onFocus={(e) => {
              setFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              if (onBlur) onBlur(e);
            }}
            aria-label={ariaLabel}
            aria-describedby={cn(helperText && helperId, error && errorId, ariaDescribedBy)}
            aria-invalid={error}
            {...props}
          />

          {showCharCount && maxLength && (
            <div className="absolute bottom-2 right-3 pointer-events-none">
              <span
                className={cn(
                  'text-xs',
                  charCount > maxLength * 0.9 ? 'text-warning-500' : 'text-navy-400'
                )}
              >
                {charCount}/{maxLength}
              </span>
            </div>
          )}
        </div>

        {helperText && !error && !success && (
          <p id={helperId} className="mt-1.5 text-sm text-navy-500">
            {helperText}
          </p>
        )}

        {error && errorText && (
          <p id={errorId} className="mt-1.5 text-sm text-danger-600">
            {errorText}
          </p>
        )}

        {success && successText && <p className="mt-1.5 text-sm text-success-600">{successText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
