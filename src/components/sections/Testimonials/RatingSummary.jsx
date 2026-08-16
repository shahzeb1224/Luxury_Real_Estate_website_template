import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import { Star, Users, Award, CheckCircle } from 'lucide-react';
import { Badge } from '../../ui';

const RatingSummary = React.forwardRef(
  (
    {
      rating = {
        average: 4.9,
        total: 320,
        verified: 280,
        breakdown: {
          5: 280,
          4: 25,
          3: 10,
          2: 3,
          1: 2,
        },
      },
      className = '',
      ...props
    },
    ref
  ) => {
    const { average, total, verified, breakdown } = rating;
    const maxRating = 5;

    const renderStars = (count) => {
      return (
        <div className="flex gap-0.5">
          {Array.from({ length: maxRating }).map((_, i) => (
            <Star
              key={i}
              className={cn('w-5 h-5', i < count ? 'fill-gold-500 text-gold-500' : 'text-navy-200')}
            />
          ))}
        </div>
      );
    };

    const renderBreakdownBar = (stars, count) => {
      const percentage = total > 0 ? (count / total) * 100 : 0;
      return (
        <div key={stars} className="flex items-center gap-3">
          <span className="text-sm text-navy-600 w-12">{stars}★</span>
          <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-500 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm text-navy-400 w-10 text-right">{count}</span>
        </div>
      );
    };

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        className={cn('bg-gradient-to-br from-navy-50 to-gold-50 border-gold-200', className)}
        {...props}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          {/* Average Rating */}
          <div className="flex flex-col items-center text-center min-w-[120px]">
            <div className="text-4xl sm:text-5xl font-playfair font-bold text-navy-800">
              {average.toFixed(1)}
            </div>
            <div className="mt-1">{renderStars(Math.round(average))}</div>
            <div className="mt-1 flex items-center gap-1 text-sm text-navy-500">
              <Users className="w-4 h-4" />
              <span>{total} reviews</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-navy-500">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span>{verified} verified</span>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 w-full">
            <div className="space-y-1.5">
              {Object.entries(breakdown)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([stars, count]) => renderBreakdownBar(Number(stars), count))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
            <div className="flex items-center gap-2 text-sm text-navy-600">
              <Award className="w-4 h-4 text-gold-500" />
              <span>Top Rated Agency</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-navy-600">
              <Users className="w-4 h-4 text-gold-500" />
              <span>Trusted by {total}+ clients</span>
            </div>
            <Badge variant="luxury" size="md">
              ★★★★★ Excellence
            </Badge>
          </div>
        </div>
      </Card>
    );
  }
);

RatingSummary.displayName = 'RatingSummary';

export default React.memo(RatingSummary);
