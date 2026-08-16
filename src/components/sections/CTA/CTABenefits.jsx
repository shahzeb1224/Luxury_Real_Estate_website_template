import React from 'react';
import { cn } from '@/utils/cn';
import { Users, CheckCircle, Crown, TrendingUp, Heart, Sparkles } from 'lucide-react';

const iconMap = {
  Users,
  CheckCircle,
  Crown,
  TrendingUp,
  Heart,
  Sparkles,
};

const CTABenefits = React.forwardRef(
  ({ benefits = [], loading = false, className = '', ...props }, ref) => {
    if (loading) {
      return (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8', className)}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-12 bg-white/10 rounded-xl" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8',
          className
        )}
        {...props}
      >
        {benefits.map((benefit, index) => {
          const Icon = iconMap[benefit.icon] || CheckCircle;

          return (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="p-1.5 rounded-lg bg-gold-500/20">
                <Icon className="w-4 h-4 text-gold-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">{benefit.title}</p>
                <p className="text-xs text-navy-300">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

CTABenefits.displayName = 'CTABenefits';

export default React.memo(CTABenefits);
