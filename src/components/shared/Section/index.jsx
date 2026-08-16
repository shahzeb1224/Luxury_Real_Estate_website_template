import React from 'react';
import { cn } from '@/utils/cn';
import Container from '../Container';

const Section = React.forwardRef(
  (
    {
      children,
      id,
      padding = 'lg',
      background = 'white',
      spacing = 'default',
      fullHeight = false,
      className = '',
      containerSize = 'default',
      containerPadding = true,
      as: Component = 'section',
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: 'py-0',
      sm: 'py-8 sm:py-12',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-20 lg:py-24',
      xl: 'py-20 sm:py-24 lg:py-32',
      '2xl': 'py-24 sm:py-32 lg:py-40',
    };

    const backgroundClasses = {
      white: 'bg-white',
      gray: 'bg-gray-50',
      navy: 'bg-navy-800 text-white',
      'navy-dark': 'bg-navy-900 text-white',
      gold: 'bg-gold-50',
      transparent: 'bg-transparent',
      glass: 'bg-glass-white backdrop-blur-sm',
    };

    const spacingClasses = {
      compact: 'space-y-6',
      default: 'space-y-8 sm:space-y-12',
      generous: 'space-y-12 sm:space-y-16 lg:space-y-20',
    };

    return (
      <Component
        ref={ref}
        id={id}
        className={cn(
          'w-full',
          paddingClasses[padding],
          backgroundClasses[background],
          fullHeight && 'min-h-screen',
          className
        )}
        {...props}
      >
        <Container
          size={containerSize}
          padding={containerPadding}
          className={cn(spacingClasses[spacing])}
        >
          {children}
        </Container>
      </Component>
    );
  }
);

Section.displayName = 'Section';

export default Section;
