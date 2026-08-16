import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ChevronRight, TrendingUp, Users, Home } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

const SuccessStory = React.forwardRef(
  (
    {
      client,
      challenge,
      solution,
      outcome,
      investmentGrowth,
      propertyType,
      location,
      image,
      href = '/success-stories',
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

    return (
      <Card
        ref={ref}
        variant="default"
        padding="none"
        hoverable
        className={cn(
          'overflow-hidden transition-all duration-500',
          'hover:shadow-premium-lg hover:-translate-y-1',
          className
        )}
        {...props}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-48 lg:w-56 flex-shrink-0">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden bg-navy-100">
              {image && !imageError ? (
                <img
                  src={image}
                  alt={client}
                  className={cn(
                    'w-full h-full object-cover transition-transform duration-700 hover:scale-105',
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-navy-400">
                  <Home className="w-8 h-8" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-playfair font-semibold text-navy-800">{client}</h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-500">
                  <span>{location}</span>
                  <span className="w-1 h-1 rounded-full bg-navy-300" />
                  <span>{propertyType}</span>
                </div>
              </div>
              {investmentGrowth && (
                <Badge variant="success" size="sm" className="flex-shrink-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {investmentGrowth}
                </Badge>
              )}
            </div>

            {/* Challenge */}
            <div>
              <p className="text-xs font-medium text-navy-500">Challenge</p>
              <p className="text-sm text-navy-600">{challenge}</p>
            </div>

            {/* Solution & Outcome */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-navy-500">Solution</p>
                <p className="text-sm text-navy-600 line-clamp-2">{solution}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-navy-500">Outcome</p>
                <p className="text-sm text-navy-600 line-clamp-2">{outcome}</p>
              </div>
            </div>

            {/* Read More */}
            <Link
              to={href}
              className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors group"
            >
              <span>Read Full Story</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Card>
    );
  }
);

SuccessStory.displayName = 'SuccessStory';

export default React.memo(SuccessStory);
