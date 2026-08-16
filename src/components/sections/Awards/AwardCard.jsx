import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Award, Star, Trophy, Medal, Sparkles } from 'lucide-react';

const iconMap = {
  Award,
  Star,
  Trophy,
  Medal,
  Sparkles,
};

const AwardCard = React.forwardRef(
  (
    {
      icon = 'Award',
      title,
      organization,
      year,
      description,
      featured = false,
      verified = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const IconComponent = iconMap[icon] || Award;

    return (
      <Card
        ref={ref}
        variant={featured ? 'premium' : 'default'}
        padding="lg"
        hoverable
        className={cn(
          'group relative overflow-hidden transition-all duration-500',
          'hover:shadow-premium-lg hover:-translate-y-1',
          featured && 'border-2 border-gold-300',
          className
        )}
        {...props}
      >
        {/* Decorative Gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-700" />

        {/* Icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-gold-50 rounded-xl">
            <IconComponent className="w-5 h-5 text-gold-500" />
          </div>
          {featured && (
            <Badge variant="luxury" size="sm" pill>
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h4 className="font-playfair font-semibold text-navy-800 text-lg">{title}</h4>

        {/* Organization & Year */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-sm text-navy-600">{organization}</span>
          <span className="w-1 h-1 rounded-full bg-navy-300" />
          <span className="text-sm text-navy-400">{year}</span>
        </div>

        {/* Description */}
        {description && <p className="text-sm text-navy-500 mt-2 leading-relaxed">{description}</p>}

        {/* Verified Badge */}
        {verified && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-navy-400">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
            <span>Verified Achievement</span>
          </div>
        )}

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-500 transition-all duration-700 group-hover:w-full" />
      </Card>
    );
  }
);

AwardCard.displayName = 'AwardCard';

export default React.memo(AwardCard);
