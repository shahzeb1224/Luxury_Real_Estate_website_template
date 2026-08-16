import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(
  (
    {
      // Variants
      variant = 'default',
      // Padding
      padding = 'md',
      // Shadow
      shadow = 'premium',
      // State
      hoverable = false,
      interactive = false,
      // Layout
      className = '',
      children,
      // Access
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      // Base
      'bg-white transition-all duration-300',
      // Padding
      {
        'p-3': padding === 'sm',
        'p-4 sm:p-5': padding === 'md',
        'p-6 sm:p-8': padding === 'lg',
        'p-8 sm:p-10': padding === 'xl',
        'p-0': padding === 'none',
      },
      // Shadow
      {
        'shadow-sm': shadow === 'sm',
        'shadow-md': shadow === 'md',
        'shadow-lg': shadow === 'lg',
        'shadow-premium': shadow === 'premium',
        'shadow-premium-lg': shadow === 'premium-lg',
        'shadow-premium-xl': shadow === 'premium-xl',
        'shadow-glass': shadow === 'glass',
        'shadow-none': shadow === 'none',
      },
      // Variant
      {
        'rounded-lg': variant === 'default' || variant === 'property' || variant === 'blog',
        'rounded-2xl': variant === 'premium',
        'rounded-3xl': variant === 'luxury',
        'rounded-none': variant === 'flat',
        'border border-navy-100': variant === 'bordered',
        // Property card specific
        'overflow-hidden': variant === 'property',
        // Glass effect
        'bg-glass-white backdrop-blur-sm border border-white/20': variant === 'glass',
        // Transparent
        'bg-transparent shadow-none': variant === 'transparent',
      },
      // Interactive states
      {
        'cursor-pointer hover:shadow-premium-lg hover:translate-y-[-4px]': hoverable || interactive,
        'hover:shadow-premium-lg': hoverable && !interactive,
        'cursor-pointer active:scale-[0.98]': interactive,
        'transition-transform': hoverable || interactive,
      },
      className
    );

    return (
      <Component ref={ref} className={baseClasses} {...props}>
        {children}
      </Component>
    );
  }
);

// Sub-components
const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, as: Component = 'h3', ...props }) => (
  <Component
    className={cn('font-playfair text-xl font-semibold text-navy-800', className)}
    {...props}
  >
    {children}
  </Component>
);

const CardDescription = ({ className, children, ...props }) => (
  <p className={cn('text-navy-500 text-sm', className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn('space-y-3', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('mt-4 pt-4 border-t border-navy-100', className)} {...props}>
    {children}
  </div>
);

const CardImage = ({ className, src, alt, ...props }) => (
  <div className={cn('overflow-hidden', className)}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      {...props}
    />
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;

Card.displayName = 'Card';

export default Card;
