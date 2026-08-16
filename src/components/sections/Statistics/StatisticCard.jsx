import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import { formatNumber } from '@/lib/formatters';
import {
  Home,
  Building2,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Award,
  Clock,
  BarChart,
  PieChart,
} from 'lucide-react';

const iconMap = {
  Home,
  Building2,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Award,
  Clock,
  BarChart,
  PieChart,
};

const StatisticCard = React.forwardRef(
  (
    {
      icon,
      label,
      value,
      prefix = '',
      suffix = '',
      format = 'number',
      color = 'navy',
      animate = true,
      duration = 1200,
      index = 0,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [countedValue, setCountedValue] = useState(0);
    const containerRef = useRef(null);
    const IconComponent = typeof icon === 'string' ? iconMap[icon] || Home : icon || Home;

    const colorVariants = {
      navy: {
        bg: 'bg-navy-50',
        icon: 'text-navy-600',
        value: 'text-navy-800',
        label: 'text-navy-500',
        border: 'border-navy-200',
      },
      gold: {
        bg: 'bg-gold-50',
        icon: 'text-gold-600',
        value: 'text-navy-800',
        label: 'text-navy-500',
        border: 'border-gold-200',
      },
      dark: {
        bg: 'bg-navy-800',
        icon: 'text-gold-400',
        value: 'text-white',
        label: 'text-navy-300',
        border: 'border-navy-700',
      },
      glass: {
        bg: 'bg-glass-white backdrop-blur-sm',
        icon: 'text-navy-600',
        value: 'text-navy-800',
        label: 'text-navy-500',
        border: 'border-white/20',
      },
    };

    const colors = colorVariants[color] || colorVariants.navy;

    useEffect(() => {
      if (!animate) {
        setIsVisible(true);
        setCountedValue(value);
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

      const animationFrames = 60;
      const stepDuration = duration / animationFrames;
      const target = typeof value === 'number' ? value : 0;
      let current = 0;
      const increment = target / animationFrames;
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        current = Math.min(current + increment, target);
        setCountedValue(current);

        if (frame >= animationFrames || current >= target) {
          setCountedValue(target);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, [isVisible, animate, value, duration]);

    const displayValue = animate && isVisible ? countedValue : value;
    const formattedValue =
      typeof displayValue === 'number'
        ? format === 'currency'
          ? `$${formatNumber(Math.round(displayValue))}`
          : formatNumber(Math.round(displayValue))
        : displayValue;

    return (
      <Card
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        variant={color === 'dark' ? 'premium' : 'default'}
        padding="lg"
        hoverable
        className={cn(
          'group relative overflow-hidden transition-all duration-500 border',
          colors.bg,
          colors.border,
          'hover:shadow-premium-lg hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="flex items-center justify-between mb-3">
          <div className={cn('p-2 rounded-lg', colors.bg)}>
            <IconComponent className={cn('w-5 h-5', colors.icon)} />
          </div>
        </div>

        {/* Value */}
        <div
          className={cn(
            'text-2xl sm:text-3xl font-playfair font-bold transition-colors duration-300',
            colors.value
          )}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
          }}
        >
          {prefix}
          {formattedValue}
          {suffix}
        </div>

        {/* Label */}
        <p className={cn('text-sm font-medium mt-1', colors.label)}>{label}</p>

        {/* Animated Border */}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-0.5 transition-all duration-700 ease-out',
            'w-0 group-hover:w-full',
            color === 'gold' ? 'bg-gold-500' : 'bg-navy-500'
          )}
        />
      </Card>
    );
  }
);

StatisticCard.displayName = 'StatisticCard';

export default React.memo(StatisticCard);
