import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronRight, TrendingUp, TrendingDown, MapPin } from 'lucide-react';

const InvestmentCard = React.forwardRef(
  (
    {
      id,
      location,
      roi,
      growth,
      description,
      properties,
      image,
      featured = false,
      trend = 'up',
      href = '/investment',
      index = 0,
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => setImageLoaded(true);
    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const trendColors = {
      up: 'text-success-600 bg-success-50',
      down: 'text-danger-600 bg-danger-50',
      stable: 'text-navy-600 bg-navy-50',
    };

    const trendIcons = {
      up: TrendingUp,
      down: TrendingDown,
      stable: MapPin,
    };

    const TrendIcon = trendIcons[trend] || TrendingUp;
    const trendColor = trendColors[trend] || trendColors.up;

    return (
      <Card
        ref={ref}
        variant={featured ? 'premium' : 'default'}
        padding="none"
        hoverable
        className={cn(
          'group overflow-hidden transition-all duration-500',
          'hover:shadow-premium-lg hover:-translate-y-1',
          featured && 'border-2 border-gold-300',
          className
        )}
        {...props}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-navy-100 h-48">
          {image && !imageError ? (
            <img
              src={image}
              alt={location}
              className={cn(
                'w-full h-full object-cover transition-transform duration-700',
                'group-hover:scale-105',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-navy-200 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-navy-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-navy-400 font-medium block">No Image Available</span>
                <span className="text-xs text-navy-300 block mt-1">{location}</span>
              </div>
            </div>
          )}
          {!imageLoaded && <div className="absolute inset-0 bg-navy-100 animate-pulse" />}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {featured && (
              <Badge variant="luxury" size="sm" pill>
                Top Pick
              </Badge>
            )}
          </div>

          {/* ROI Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="luxury" size="md" className="shadow-premium">
              ROI {roi}
            </Badge>
          </div>

          {/* Location */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h4 className="text-lg font-playfair font-semibold">{location}</h4>
            <p className="text-white/70 text-sm">{properties} properties available</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                  trendColor
                )}
              >
                <TrendIcon className="w-3 h-3" />
                <span>{growth}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-navy-500 line-clamp-2">{description}</p>

          <Link
            to={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors group/link"
          >
            <span>Explore Investment</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </Card>
    );
  }
);

InvestmentCard.displayName = 'InvestmentCard';

export default React.memo(InvestmentCard);
