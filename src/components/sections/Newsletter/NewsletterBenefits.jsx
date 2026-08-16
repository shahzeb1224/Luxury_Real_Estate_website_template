import React from 'react';
import { cn } from '@/utils/cn';
import {
  Sparkles,
  Home,
  Briefcase,
  TrendingUp,
  LineChart,
  MapPin,
  DollarSign,
  Clock,
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Home,
  Briefcase,
  TrendingUp,
  LineChart,
  MapPin,
  DollarSign,
  Clock,
};

const NewsletterBenefits = React.forwardRef(
  ({ benefits = [], loading = false, className = '', ...props }, ref) => {
    if (loading) {
      return (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-20 bg-navy-100 rounded-xl" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}
        {...props}
      >
        {benefits.map((benefit, index) => {
          const Icon = iconMap[benefit.icon] || Sparkles;

          return (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-navy-50 rounded-xl hover:bg-navy-100 transition-colors duration-300"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Icon className="w-4 h-4 text-gold-500" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-navy-800">{benefit.title}</h4>
                <p className="text-xs text-navy-500 mt-0.5">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

NewsletterBenefits.displayName = 'NewsletterBenefits';

export default React.memo(NewsletterBenefits);
