import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import {
  Shield,
  Users,
  CheckCircle,
  TrendingUp,
  Home,
  Clock,
  Scale,
  Eye,
  Award,
  Building2,
  Heart,
  Star,
} from 'lucide-react';

const iconMap = {
  Shield,
  Users,
  CheckCircle,
  TrendingUp,
  Home,
  Clock,
  Scale,
  Eye,
  Award,
  Building2,
  Heart,
  Star,
};

const WhyChooseCard = React.forwardRef(
  ({ icon, title, description, variant = 'default', index = 0, className = '', ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = typeof icon === 'string' ? iconMap[icon] || Star : icon || Star;

    const variantClasses = {
      default: 'bg-white border-navy-100',
      gold: 'bg-gold-50 border-gold-200',
      navy: 'bg-navy-800 border-navy-700 text-white',
      glass: 'bg-glass-white backdrop-blur-sm border-white/20',
    };

    const iconVariantClasses = {
      default: 'bg-navy-50 text-navy-600',
      gold: 'bg-gold-100 text-gold-600',
      navy: 'bg-navy-700 text-gold-400',
      glass: 'bg-white/20 text-navy-600',
    };

    const titleVariantClasses = {
      default: 'text-navy-800',
      gold: 'text-navy-800',
      navy: 'text-white',
      glass: 'text-navy-800',
    };

    const descriptionVariantClasses = {
      default: 'text-navy-500',
      gold: 'text-navy-600',
      navy: 'text-navy-300',
      glass: 'text-navy-500',
    };

    return (
      <Card
        ref={ref}
        variant={variant === 'navy' ? 'premium' : 'default'}
        padding="lg"
        hoverable
        className={cn(
          'group relative overflow-hidden transition-all duration-500 border',
          variantClasses[variant],
          'hover:shadow-premium-lg hover:-translate-y-1',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Decorative Gradient */}
        <div
          className={cn(
            'absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700',
            variant === 'gold' ? 'bg-gold-400' : 'bg-navy-400'
          )}
        />

        {/* Icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300',
            iconVariantClasses[variant],
            isHovered && 'scale-110 rotate-3'
          )}
        >
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'text-lg font-playfair font-semibold mb-2 transition-colors duration-300',
            titleVariantClasses[variant]
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'text-sm leading-relaxed transition-colors duration-300',
            descriptionVariantClasses[variant]
          )}
        >
          {description}
        </p>

        {/* Animated Border */}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-0.5 bg-gold-500 transition-all duration-700 ease-out',
            isHovered ? 'w-full' : 'w-0'
          )}
        />
      </Card>
    );
  }
);

WhyChooseCard.displayName = 'WhyChooseCard';

export default React.memo(WhyChooseCard);
