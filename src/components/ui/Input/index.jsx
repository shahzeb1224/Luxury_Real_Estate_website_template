import React, { useState } from 'react';
import { cn } from '@/utils/cn';

const Input = React.forwardRef(
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
      // Layout
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      // HTML
      type = 'text',
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

    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Handle character count
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(e);
      }
      if (showCharCount && maxLength) {
        setCharCount(newValue.length);
      }
    };

    // Base input classes
    const inputClasses = cn(
      // Base
      'w-full transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Size
      {
        'px-3 py-1.5 text-sm h-9': size === 'sm',
        'px-4 py-2 text-base h-11': size === 'md',
        'px-5 py-3 text-lg h-13': size === 'lg',
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
        'border-danger-500 focus:ring-danger-500 focus:border-danger-500': error,
        'border-success-500 focus:ring-success-500 focus:border-success-500': success,
        'border-navy-800 focus:ring-navy-500 focus:border-navy-800': !error && !success && focused,
        'border-navy-200': !error && !success && !focused,
      },
      // Icons & Prefix/Suffix
      {
        'pl-10': leftIcon,
        'pr-10': rightIcon,
        'pl-8': prefix,
        'pr-8': suffix,
      },
      className
    );

    return (
      <div className="w-full">
        {/* Label */}
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

        {/* Input wrapper */}
        <div className="relative">
          {/* Prefix */}
          {prefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-navy-400 text-sm">{prefix}</span>
            </div>
          )}

          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-navy-400">{leftIcon}</span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            className={inputClasses}
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

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-navy-400">{rightIcon}</span>
            </div>
          )}

          {/* Suffix */}
          {suffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-navy-400 text-sm">{suffix}</span>
            </div>
          )}

          {/* Character count */}
          {showCharCount && maxLength && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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

        {/* Helper Text */}
        {helperText && !error && !success && (
          <p id={helperId} className="mt-1.5 text-sm text-navy-500">
            {helperText}
          </p>
        )}

        {/* Error Text */}
        {error && errorText && (
          <p id={errorId} className="mt-1.5 text-sm text-danger-600">
            {errorText}
          </p>
        )}

        {/* Success Text */}
        {success && successText && <p className="mt-1.5 text-sm text-success-600">{successText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
