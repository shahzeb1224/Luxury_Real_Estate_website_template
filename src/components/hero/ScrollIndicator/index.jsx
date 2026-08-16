import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

const ScrollIndicator = React.forwardRef(
  (
    {
      label = 'Scroll to explore',
      color = 'light',
      size = 'md',
      threshold = 100,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const handleScroll = () => {
        const scrolled = window.scrollY;
        setIsVisible(scrolled < threshold);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    const colorClasses = {
      light: 'text-white/60 hover:text-white',
      dark: 'text-navy-400 hover:text-navy-600',
      gold: 'text-gold-400 hover:text-gold-500',
    };

    const sizeClasses = {
      sm: 'w-4 h-7',
      md: 'w-5 h-9',
      lg: 'w-6 h-11',
    };

    const dotSizeClasses = {
      sm: 'w-0.5 h-1.5',
      md: 'w-0.5 h-2',
      lg: 'w-0.5 h-2.5',
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-2 transition-opacity duration-500',
          colorClasses[color],
          className
        )}
        {...props}
      >
        {/* Label */}
        <span
          className="text-xs font-inter font-medium uppercase tracking-widest"
          aria-hidden="true"
        >
          {label}
        </span>

        {/* Animated Scroll Mouse */}
        <div
          className={cn(
            'relative border-2 rounded-full flex items-center justify-center',
            sizeClasses[size],
            colorClasses[color]
          )}
          aria-hidden="true"
          style={{
            borderColor: color === 'light' ? 'rgba(255,255,255,0.4)' : undefined,
          }}
        >
          {/* Animated Dot */}
          <div
            className={cn(
              'absolute rounded-full bg-current animate-[scroll-bounce_1.8s_ease-in-out_infinite]',
              dotSizeClasses[size]
            )}
            style={{
              top: '20%',
              animationDelay: '0.2s',
            }}
          />
        </div>

        {/* Screen reader text */}
        <span className="sr-only">Scroll down to explore more content</span>
      </div>
    );
  }
);

ScrollIndicator.displayName = 'ScrollIndicator';

export default React.memo(ScrollIndicator);
