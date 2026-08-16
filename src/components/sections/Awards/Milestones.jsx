import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { formatNumber } from '@/lib/formatters';
import { Award, Home, Users, MapPin, Building2, Briefcase, DollarSign } from 'lucide-react';

const iconMap = {
  Award,
  Home,
  Users,
  MapPin,
  Building2,
  Briefcase,
  DollarSign,
};

const Milestones = React.forwardRef(
  ({ milestones = [], loading = false, className = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [countedValues, setCountedValues] = useState({});
    const containerRef = useRef(null);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
      if (!isVisible || loading) return;

      const duration = 1200;
      const animationFrames = 60;
      const stepDuration = duration / animationFrames;

      const newCountedValues = {};

      milestones.forEach((milestone) => {
        const target = typeof milestone.value === 'number' ? milestone.value : 0;
        let current = 0;
        const increment = target / animationFrames;
        let frame = 0;

        const interval = setInterval(() => {
          frame++;
          current = Math.min(current + increment, target);
          newCountedValues[milestone.id] = Math.round(current);

          if (frame >= animationFrames || current >= target) {
            newCountedValues[milestone.id] = target;
            clearInterval(interval);
          }

          setCountedValues({ ...newCountedValues });
        }, stepDuration);
      });
    }, [isVisible, loading, milestones]);

    const getDisplayValue = (milestone) => {
      if (!isVisible || loading) {
        return milestone.value;
      }
      const counted = countedValues[milestone.id];
      if (counted !== undefined) {
        return counted;
      }
      return milestone.value;
    };

    if (loading) {
      return (
        <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4', className)}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-20 bg-navy-100 rounded-xl" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4', className)}
        {...props}
      >
        {milestones.map((milestone) => {
          const displayValue = getDisplayValue(milestone);
          const formattedValue =
            typeof displayValue === 'number' ? formatNumber(displayValue) : displayValue;

          const Icon = iconMap[milestone.icon] || Award;

          return (
            <div
              key={milestone.id}
              className="bg-white rounded-xl p-4 text-center border border-navy-100 shadow-sm hover:shadow-premium transition-all duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${milestone.delay || 0}ms`,
              }}
            >
              <div className="flex justify-center mb-2">
                <Icon className="w-5 h-5 text-gold-500" />
              </div>
              <div className="text-2xl font-playfair font-bold text-navy-800">
                {milestone.prefix}
                {formattedValue}
                {milestone.suffix}
              </div>
              <p className="text-xs text-navy-500 mt-1">{milestone.label}</p>
            </div>
          );
        })}
      </div>
    );
  }
);

Milestones.displayName = 'Milestones';

export default React.memo(Milestones);
