import React from 'react';
import { cn } from '@/utils/cn';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';

const iconMap = {
  Award,
  Trophy,
  Star,
  Sparkles,
};

const AwardsTimeline = React.forwardRef(
  ({ awards = [], loading = false, className = '', ...props }, ref) => {
    const sortedAwards = [...awards].sort((a, b) => b.year - a.year);

    const getIcon = (iconName) => {
      const Icon = iconMap[iconName] || Award;
      return <Icon className="w-4 h-4" />;
    };

    if (loading) {
      return (
        <div className={cn('space-y-4', className)}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse flex gap-4">
              <div className="w-12 h-12 rounded-full bg-navy-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-navy-100 rounded w-3/4" />
                <div className="h-3 bg-navy-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (sortedAwards.length === 0) return null;

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-playfair font-semibold text-navy-800">
            Our Journey of Excellence
          </h3>
          <span className="text-sm text-navy-500">{sortedAwards.length} awards</span>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold-200 hidden sm:block" />

          <div className="space-y-6">
            {sortedAwards.map((award, index) => {
              const isFeatured = award.featured;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={cn(
                    'relative flex flex-col sm:flex-row gap-4 sm:gap-6',
                    'transition-all duration-500',
                    'opacity-0 animate-fade-up',
                    `delay-${Math.min(index * 100, 500)}`
                  )}
                >
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        isFeatured ? 'bg-gold-500 text-white' : 'bg-navy-100 text-navy-600'
                      )}
                    >
                      {getIcon(award.icon)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6 sm:pb-0">
                    <div
                      className={cn(
                        'p-4 sm:p-5 rounded-xl',
                        isFeatured
                          ? 'bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200'
                          : 'bg-white border border-navy-100'
                      )}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-playfair font-semibold text-navy-800">
                            {award.title}
                          </h4>
                          <p className="text-sm text-navy-500">{award.organization}</p>
                        </div>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap',
                            isFeatured ? 'bg-gold-500 text-white' : 'bg-navy-50 text-navy-600'
                          )}
                        >
                          {award.year}
                        </span>
                      </div>

                      {award.description && (
                        <p className="text-sm text-navy-600 mt-2 leading-relaxed">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

AwardsTimeline.displayName = 'AwardsTimeline';

export default React.memo(AwardsTimeline);
