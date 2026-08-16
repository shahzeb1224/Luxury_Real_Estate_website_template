import React from 'react';
import { cn } from '@/utils/cn';
import { Spinner } from '../Spinner';

// Button size configuration
const SIZES = {
  sm: {
    height: 'h-8',
    padding: 'px-3',
    fontSize: 'text-sm',
    iconSize: 'w-3.5 h-3.5',
    gap: 'gap-1.5',
    spinnerSize: 'sm',
  },
  md: {
    height: 'h-10',
    padding: 'px-4',
    fontSize: 'text-base',
    iconSize: 'w-4 h-4',
    gap: 'gap-2',
    spinnerSize: 'sm',
  },
  lg: {
    height: 'h-12',
    padding: 'px-6',
    fontSize: 'text-lg',
    iconSize: 'w-4.5 h-4.5',
    gap: 'gap-2.5',
    spinnerSize: 'sm',
  },
  xl: {
    height: 'h-14',
    padding: 'px-8',
    fontSize: 'text-xl',
    iconSize: 'w-5 h-5',
    gap: 'gap-3',
    spinnerSize: 'md',
  },
};

// Button variant configuration
const VARIANTS = {
  primary: 'bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900 focus:ring-navy-500',
  secondary:
    'bg-white text-navy-800 border border-navy-200 hover:bg-navy-50 active:bg-navy-100 focus:ring-navy-300',
  outline:
    'bg-transparent text-navy-800 border-2 border-navy-800 hover:bg-navy-50 active:bg-navy-100 focus:ring-navy-500',
  ghost: 'bg-transparent text-navy-600 hover:bg-navy-50 active:bg-navy-100 focus:ring-navy-300',
  link: 'bg-transparent text-navy-800 hover:text-navy-600 hover:underline p-0 h-auto focus:ring-0',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 focus:ring-danger-500',
  success:
    'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 focus:ring-success-500',
  luxury:
    'bg-gold-500 text-white hover:bg-gold-600 active:bg-gold-700 focus:ring-gold-400 shadow-premium hover:shadow-premium-lg',
  glass:
    'bg-glass-white backdrop-blur-sm text-navy-800 border border-white/20 hover:bg-glass-light focus:ring-white/50',
};

// Shape configuration
const SHAPES = {
  default: 'rounded-lg',
  pill: 'rounded-full',
  square: 'rounded-none',
};

const Button = React.forwardRef(
  (
    {
      // Variants
      variant = 'primary',
      size = 'md',
      // States
      loading = false,
      disabled = false,
      // Content
      children,
      leftIcon,
      rightIcon,
      // Layout
      fullWidth = false,
      rounded = false,
      square = false,
      // HTML
      type = 'button',
      className = '',
      // Accessibility
      ariaLabel,
      // Events
      onClick,
      ...props
    },
    ref
  ) => {
    // Get size configuration
    const sizeConfig = SIZES[size] || SIZES.md;

    // Determine shape
    const shapeClass = square ? 'rounded-none' : rounded ? 'rounded-full' : 'rounded-lg';

    // Determine if button is icon-only
    const isIconOnly = (leftIcon || rightIcon) && !children;

    // Base classes
    const baseClasses = cn(
      // Layout
      'inline-flex items-center justify-center',
      'whitespace-nowrap',
      'font-semibold',
      'transition-all duration-200',
      // Focus
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      // States
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      // Size
      sizeConfig.height,
      sizeConfig.fontSize,
      sizeConfig.gap,
      // Padding - remove padding for icon-only buttons
      isIconOnly ? 'p-0' : sizeConfig.padding,
      // Shape
      shapeClass,
      // Width
      fullWidth && 'w-full',
      // Variant
      VARIANTS[variant] || VARIANTS.primary,
      // Icon-only specific sizing
      isIconOnly && {
        'w-8 h-8': size === 'sm',
        'w-10 h-10': size === 'md',
        'w-12 h-12': size === 'lg',
        'w-14 h-14': size === 'xl',
      },
      // Custom
      className
    );

    // Get icon size
    const iconSize = sizeConfig.iconSize;

    // Loading state
    if (loading) {
      return (
        <button
          ref={ref}
          type={type}
          disabled={true}
          className={baseClasses}
          aria-label={ariaLabel || 'Loading'}
          {...props}
        >
          <Spinner size={sizeConfig.spinnerSize} className="flex-shrink-0" />
          {children && <span className="ml-2">{children}</span>}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || (isIconOnly ? 'Icon button' : undefined)}
        {...props}
      >
        {/* Left Icon */}
        {leftIcon && (
          <span className="flex-shrink-0 leading-none ">
            {React.cloneElement(leftIcon, {
              className: cn(iconSize, leftIcon.props.className, 'block'),
              'aria-hidden': 'true',
            })}
          </span>
        )}

        {/* Text */}
        {children && <span className="truncate leading-none flex">{children}</span>}

        {/* Right Icon */}
        {rightIcon && (
          <span className="flex-shrink-0 leading-none">
            {React.cloneElement(rightIcon, {
              className: cn(iconSize, rightIcon.props.className, 'block'),
              'aria-hidden': 'true',
            })}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
