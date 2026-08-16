import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';
import {
  Home,
  Building2,
  TrendingUp,
  Users,
  Shield,
  Briefcase,
  Calculator,
  FileText,
  Heart,
  MapPin,
  Star,
  Award,
} from 'lucide-react';

const iconMap = {
  Home,
  Building2,
  TrendingUp,
  Users,
  Shield,
  Briefcase,
  Calculator,
  FileText,
  Heart,
  MapPin,
  Star,
  Award,
};

const ServiceCard = React.forwardRef(
  (
    {
      icon,
      title,
      description,
      href = '#',
      variant = 'default',
      color = 'navy',
      index = 0,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = typeof icon === 'string' ? iconMap[icon] || Home : icon || Home;

    const colorVariants = {
      navy: {
        bg: 'bg-navy-50',
        icon: 'text-navy-600',
        border: 'border-navy-200 hover:border-navy-400',
        heading: 'text-navy-800',
        text: 'text-navy-500',
        accent: 'text-navy-600',
      },
      gold: {
        bg: 'bg-gold-50',
        icon: 'text-gold-600',
        border: 'border-gold-200 hover:border-gold-400',
        heading: 'text-navy-800',
        text: 'text-navy-600',
        accent: 'text-gold-600',
      },
      dark: {
        bg: 'bg-navy-800',
        icon: 'text-gold-400',
        border: 'border-navy-700 hover:border-gold-400',
        heading: 'text-white',
        text: 'text-navy-300',
        accent: 'text-gold-400',
      },
      glass: {
        bg: 'bg-glass-white backdrop-blur-sm',
        icon: 'text-navy-600',
        border: 'border-white/20 hover:border-gold-300',
        heading: 'text-navy-800',
        text: 'text-navy-500',
        accent: 'text-gold-500',
      },
    };

    const colors = colorVariants[color] || colorVariants.navy;

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        hoverable
        className={cn(
          'group relative overflow-hidden transition-all duration-500 border',
          colors.border,
          colors.bg,
          'hover:shadow-premium-lg hover:-translate-y-1',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Decorative Element */}
        <div
          className={cn(
            'absolute -top-16 -right-16 w-32 h-32 rounded-full transition-opacity duration-700',
            isHovered ? 'opacity-20' : 'opacity-0',
            color === 'gold' ? 'bg-gold-400' : 'bg-navy-400'
          )}
        />

        {/* Icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300',
            colors.bg,
            isHovered && 'scale-110 rotate-3'
          )}
        >
          <IconComponent className={cn('w-5 h-5', colors.icon)} />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'text-lg font-playfair font-semibold mb-2 transition-colors duration-300',
            colors.heading
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className={cn('text-sm leading-relaxed transition-colors duration-300', colors.text)}>
          {description}
        </p>

        {/* Link */}
        <Link
          to={href}
          className={cn(
            'inline-flex items-center gap-1 mt-4 text-sm font-medium transition-colors duration-300 group/link',
            colors.accent,
            'hover:underline'
          )}
        >
          <span>Learn More</span>
          <ChevronRight
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              'group-hover/link:translate-x-1'
            )}
          />
        </Link>

        {/* Animated Border */}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-0.5 transition-all duration-700 ease-out',
            isHovered ? 'w-full' : 'w-0',
            color === 'gold' ? 'bg-gold-500' : 'bg-navy-500'
          )}
        />
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

export default React.memo(ServiceCard);
