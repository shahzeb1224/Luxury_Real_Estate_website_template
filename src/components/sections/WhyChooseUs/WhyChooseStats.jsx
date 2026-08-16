import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { formatNumber } from '@/lib/formatters';

const WhyChooseStats = React.forwardRef(
  ({ stats = [], animate = true, duration = 1200, className = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [countedValues, setCountedValues] = useState({});
    const containerRef = useRef(null);

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
          newCountedValues[stat.id || stat.label] = Math.round(current);

          if (frame >= animationFrames || current >= target) {
            newCountedValues[stat.id || stat.label] = target;
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
      const counted = countedValues[stat.id || stat.label];
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
        className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8', className)}
        {...props}
      >
        {stats.map((stat, index) => {
          const displayValue = getDisplayValue(stat);
          const formattedValue =
            typeof displayValue === 'number'
              ? stat.format === 'currency'
                ? `$${formatNumber(displayValue)}`
                : formatNumber(displayValue)
              : displayValue;

          return (
            <div
              key={stat.id || stat.label}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
              }}
            >
              <div className="text-3xl sm:text-4xl font-playfair font-bold text-navy-800">
                {stat.prefix}
                {formattedValue}
                {stat.suffix}
              </div>
              <div className="text-sm text-navy-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
    );
  }
);

WhyChooseStats.displayName = 'WhyChooseStats';

export default React.memo(WhyChooseStats);
