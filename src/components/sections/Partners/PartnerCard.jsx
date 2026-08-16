import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { CheckCircle, ExternalLink } from 'lucide-react';

const PartnerCard = React.forwardRef(
  (
    {
      id,
      name,
      logo,
      category,
      description,
      featured = false,
      verified = true,
      website,
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

    const categoryColors = {
      developer: 'bg-navy-50 text-navy-600',
      bank: 'bg-gold-50 text-gold-600',
      mortgage: 'bg-blue-50 text-blue-600',
      investment: 'bg-emerald-50 text-emerald-600',
      architecture: 'bg-purple-50 text-purple-600',
      design: 'bg-pink-50 text-pink-600',
      legal: 'bg-indigo-50 text-indigo-600',
      construction: 'bg-orange-50 text-orange-600',
      insurance: 'bg-teal-50 text-teal-600',
      default: 'bg-navy-50 text-navy-600',
    };

    const categoryLabels = {
      developer: 'Developer',
      bank: 'Bank',
      mortgage: 'Mortgage Provider',
      investment: 'Investment Firm',
      architecture: 'Architecture',
      design: 'Interior Design',
      legal: 'Legal Partner',
      construction: 'Construction',
      insurance: 'Insurance',
    };

    const colorClass = categoryColors[category] || categoryColors.default;
    const categoryLabel = categoryLabels[category] || category;

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

        {/* Logo */}
        <div className="relative flex items-center justify-center h-16 mb-4">
          {logo && !imageError ? (
            <img
              src={logo}
              alt={name}
              className={cn(
                'max-h-full max-w-full object-contain transition-all duration-500',
                'filter grayscale group-hover:grayscale-0',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-navy-50 rounded-lg text-navy-400 font-playfair font-bold text-xl">
              {name.charAt(0)}
            </div>
          )}
          {!imageLoaded && <div className="absolute inset-0 bg-navy-50 rounded-lg animate-pulse" />}
        </div>

        {/* Partner Name */}
        <h4 className="text-sm font-semibold text-navy-800 text-center truncate">{name}</h4>

        {/* Category Badge */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', colorClass)}>
            {categoryLabel}
          </span>
          {verified && (
            <Badge variant="success" size="sm" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>

        {/* Description (optional) */}
        {description && (
          <p className="text-xs text-navy-500 text-center mt-2 line-clamp-2">{description}</p>
        )}

        {/* Website Link */}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'absolute top-3 right-3 p-1.5 rounded-lg',
              'opacity-0 group-hover:opacity-100 transition-all duration-300',
              'bg-white/90 backdrop-blur-sm text-navy-400 hover:text-navy-600',
              'focus:outline-none focus:ring-2 focus:ring-navy-500'
            )}
            aria-label={`Visit ${name} website`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="luxury" size="sm" pill>
              Featured Partner
            </Badge>
          </div>
        )}
      </Card>
    );
  }
);

PartnerCard.displayName = 'PartnerCard';

export default React.memo(PartnerCard);
