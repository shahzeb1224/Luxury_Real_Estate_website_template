import React from 'react';
import { cn } from '@/utils/cn';
import { Award, Users, Star, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Award,
  Users,
  Star,
  Shield,
  CheckCircle,
};

const CTATrust = React.forwardRef(
  ({ trustIndicators = [], loading = false, className = '', ...props }, ref) => {
    if (loading) {
      return (
        <div className={cn('flex flex-wrap items-center justify-center gap-6', className)}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-8 w-32 bg-white/10 rounded-full" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-white/10',
          className
        )}
        {...props}
      >
        {trustIndicators.map((indicator, index) => {
          const Icon = iconMap[indicator.icon] || CheckCircle;

          return (
            <div key={index} className="flex items-center gap-2 text-sm text-navy-300">
              <Icon className="w-4 h-4 text-gold-400" />
              <span className="font-medium text-white/90">{indicator.label}</span>
            </div>
          );
        })}

        {/* WhatsApp Quick Action */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-navy-400">|</span>
          <Link
            to="/chat"
            className="flex items-center gap-1.5 text-navy-300 hover:text-white transition-colors"
            aria-label="Chat with us"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="font-medium">Chat with us</span>
          </Link>
        </div>
      </div>
    );
  }
);

CTATrust.displayName = 'CTATrust';

export default React.memo(CTATrust);
