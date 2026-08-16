import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronRight, Crown, Sparkles } from 'lucide-react';

const FeaturedService = React.forwardRef(
  (
    {
      title,
      description,
      image,
      icon,
      href = '/contact',
      ctaLabel = 'Get Started',
      badge = 'Premium Service',
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
        padding="none"
        className={cn(
          'overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
          'border-2 border-gold-500/30',
          'shadow-premium-xl',
          className
        )}
        {...props}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2 relative overflow-hidden bg-navy-800 min-h-[240px] lg:min-h-[320px]">
            {image && !imageError ? (
              <img
                src={image}
                alt={title}
                className={cn(
                  'w-full h-full object-cover transition-opacity duration-700',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-navy-600">
                <Crown className="w-16 h-16" />
              </div>
            )}
            {!imageLoaded && <div className="absolute inset-0 bg-navy-700 animate-pulse" />}

            {/* Badge */}
            {badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="luxury" size="md" className="shadow-premium">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  {badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-white">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-2">
              <span>Featured Service</span>
              <span className="w-1 h-1 rounded-full bg-gold-400" />
              <span>Premium</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">{title}</h3>

            <p className="text-navy-300 mt-3 leading-relaxed max-w-lg">{description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to={href}>
                <Button variant="luxury" size="md" className="min-w-[160px]">
                  <span>{ctaLabel}</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="glass" size="md" className="min-w-[140px]">
                  All Services
                </Button>
              </Link>
            </div>

            {/* Trust indicator */}
            <div className="flex items-center gap-4 mt-6 text-xs text-navy-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>White Glove Service</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span>Tailored Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

FeaturedService.displayName = 'FeaturedService';

export default React.memo(FeaturedService);
