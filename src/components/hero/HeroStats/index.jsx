import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { formatNumber } from '@/lib/formatters';

const HeroStats = React.forwardRef(
  (
    {
      stats,
      variant = 'light',
      columns = 4,
      animate = true,
      duration = 1000,
      className = '',
      statClassName = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [countedValues, setCountedValues] = useState({});
    const containerRef = useRef(null);

    const variantClasses = {
      light: 'text-white',
      dark: 'text-navy-800',
      gold: 'text-gold-400',
    };

    const columnClasses = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-4',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    };

    // Intersection Observer for animation trigger
    useEffect(() => {
      if (!animate) {
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      const currentRef = containerRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
        observer.disconnect();
      };
    }, [animate]);

    // Animate counter values
    useEffect(() => {
      if (!isVisible || !animate) return;

      const newCountedValues = {};
      const animationFrames = 60;
      const stepDuration = duration / animationFrames;

      stats.forEach((stat) => {
        const target = typeof stat.value === 'number' ? stat.value : 0;
        let current = 0;
        const increment = target / animationFrames;
        let frame = 0;

        const interval = setInterval(() => {
          frame++;
          current = Math.min(current + increment, target);
          newCountedValues[stat.label] = Math.round(current);

          if (frame >= animationFrames || current >= target) {
            newCountedValues[stat.label] = target;
            clearInterval(interval);
          }

          setCountedValues({ ...newCountedValues });
        }, stepDuration);
      });
    }, [isVisible, animate, stats, duration]);

    const getDisplayValue = (stat) => {
      if (!animate || !isVisible) {
        return stat.value;
      }
      const counted = countedValues[stat.label];
      if (counted !== undefined) {
        return counted;
      }
      return stat.value;
    };

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        className={cn('w-full', className)}
        {...props}
      >
        <div className={cn('grid gap-6 sm:gap-8', columnClasses[columns] || 'grid-cols-4')}>
          {stats.map((stat, index) => {
            const displayValue = getDisplayValue(stat);
            const formattedValue =
              typeof displayValue === 'number' ? formatNumber(displayValue) : displayValue;

            return (
              <div
                key={stat.label}
                className={cn('flex flex-col items-center text-center space-y-1', statClassName)}
              >
                <div
                  className={cn(
                    'font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl transition-all duration-300',
                    variantClasses[variant]
                  )}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {stat.prefix && <span className="mr-0.5">{stat.prefix}</span>}
                  {formattedValue}
                  {stat.suffix && <span className="ml-0.5">{stat.suffix}</span>}
                </div>
                <div
                  className={cn(
                    'text-sm font-inter uppercase tracking-wider',
                    variant === 'light' ? 'text-white/70' : 'text-navy-500'
                  )}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

HeroStats.displayName = 'HeroStats';

export default React.memo(HeroStats);
