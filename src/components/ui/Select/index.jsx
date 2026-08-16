import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(
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
      placeholder = 'Select an option',
      options = [],
      value,
      defaultValue,
      onChange,
      // HTML
      id,
      name,
      className = '',
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
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [focused, setFocused] = useState(false);
    const containerRef = useRef(null);

    const inputId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Find selected option label
    useEffect(() => {
      const currentValue = value || defaultValue || '';
      const option = options.find((opt) => opt.value === currentValue);
      setSelectedLabel(option?.label || placeholder);
    }, [value, defaultValue, options, placeholder]);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
      if (onChange) {
        const event = {
          target: {
            name: name,
            value: option.value,
          },
        };
        onChange(event);
      }
      setSelectedLabel(option.label);
      setIsOpen(false);
    };

    const selectClasses = cn(
      // Base
      'w-full transition-all duration-200 cursor-pointer relative',
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
        'border-danger-500 ring-danger-500': error,
        'border-success-500 ring-success-500': success,
        'border-navy-800 ring-navy-500': !error && !success && focused,
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

        <div ref={containerRef} className="relative">
          <div
            ref={ref}
            className={selectClasses}
            onClick={() => !disabled && setIsOpen(!isOpen)}
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
            aria-expanded={isOpen}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            {...props}
          >
            <span className={cn('block truncate', !selectedLabel && 'text-navy-400')}>
              {selectedLabel || placeholder}
            </span>
            <ChevronDown
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </div>

          {isOpen && !disabled && (
            <div className="absolute z-dropdown mt-1 w-full bg-white border border-navy-200 rounded-lg shadow-premium max-h-60 overflow-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'px-4 py-2 cursor-pointer hover:bg-navy-50 transition-colors',
                    option.value === (value || defaultValue) &&
                      'bg-navy-50 text-navy-800 font-medium'
                  )}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={option.value === (value || defaultValue)}
                >
                  {option.label}
                </div>
              ))}
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

Select.displayName = 'Select';

export default Select;
