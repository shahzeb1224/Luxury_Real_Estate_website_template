import React from 'react';
import { cn } from '@/utils/cn';

const Container = React.forwardRef(
  (
    {
      children,
      size = 'default',
      padding = true,
      centered = true,
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      fluid: 'max-w-none',
      default: 'max-w-7xl',
      narrow: 'max-w-5xl',
      wide: 'max-w-[1440px]',
      full: 'w-full',
      prose: 'max-w-prose',
    };

    const paddingClasses = {
      true: 'px-4 sm:px-6 lg:px-8',
      false: 'px-0',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          sizeClasses[size],
          paddingClasses[padding],
          centered && 'mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
