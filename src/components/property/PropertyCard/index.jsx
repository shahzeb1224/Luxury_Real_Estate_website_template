import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Heart, Bed, Bath, Square, Car, MapPin, Eye } from 'lucide-react';
import { formatCurrency, formatArea } from '@/lib/formatters';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PropertyActions from '../PropertyActions';

const PropertyCard = React.forwardRef(
  (
    {
      property,
      variant = 'grid',
      size = 'md',
      featured = false,
      showAgent = false,
      showActions = true,
      isFavorite = false,
      onFavoriteToggle,
      onContact,
      className = '',
      imageClassName = '',
      contentClassName = '',
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const {
      id,
      title,
      location,
      price,
      type,
      purpose,
      area,
      bedrooms,
      bathrooms,
      parking,
      status,
      images,
      agent,
      badge,
      featured: isFeatured,
    } = property;

    const displayPrice = formatCurrency(price);
    const displayArea = formatArea(area);

    const variantClasses = {
      grid: 'flex flex-col',
      list: 'flex flex-col sm:flex-row',
      compact: 'flex flex-col p-3',
      horizontal: 'flex flex-col sm:flex-row',
      featured: 'flex flex-col lg:flex-row',
    };

    const imageVariantClasses = {
      grid: 'aspect-[4/3]',
      list: 'aspect-[4/3] sm:aspect-[3/4] sm:w-64',
      compact: 'aspect-[4/3]',
      horizontal: 'aspect-[4/3] sm:aspect-[3/4] sm:w-48',
      featured: 'aspect-[16/9] lg:aspect-[3/2] lg:w-1/2',
    };

    const sizeClasses = {
      sm: {
        title: 'text-base',
        price: 'text-xl',
        features: 'text-xs',
        padding: 'p-3',
        gap: 'gap-1',
      },
      md: {
        title: 'text-lg',
        price: 'text-2xl',
        features: 'text-sm',
        padding: 'p-4 sm:p-5',
        gap: 'gap-2',
      },
      lg: {
        title: 'text-xl',
        price: 'text-3xl',
        features: 'text-base',
        padding: 'p-5 sm:p-6',
        gap: 'gap-3',
      },
    };

    const currentSize = sizeClasses[size];

    const statusColors = {
      active: 'text-success-600 bg-success-50',
      sold: 'text-navy-500 bg-navy-100',
      pending: 'text-warning-600 bg-warning-50',
      featured: 'text-gold-600 bg-gold-50',
    };

    const statusLabels = {
      active: 'Available',
      sold: 'Sold',
      pending: 'Pending',
      featured: 'Featured',
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const isFeaturedProperty = featured || isFeatured;

    return (
      <Card
        ref={ref}
        variant={isFeaturedProperty ? 'premium' : 'default'}
        shadow={isFeaturedProperty ? 'premium-lg' : 'premium'}
        padding="none"
        hoverable
        className={cn(
          'overflow-hidden transition-all duration-300',
          isFeaturedProperty && 'border-2 border-gold-300',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-navy-100 flex-shrink-0',
            imageVariantClasses[variant]
          )}
        >
          {images && images.length > 0 && !imageError ? (
            <>
              <img
                src={images[0]}
                alt={title}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-700',
                  'group-hover:scale-105',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
              {!imageLoaded && <div className="absolute inset-0 bg-navy-100 animate-pulse" />}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-navy-100 text-navy-400">
              <span className="text-sm">No image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {(isFeaturedProperty || badge) && (
              <Badge variant="luxury" size="sm" pill>
                {badge || 'Featured'}
              </Badge>
            )}
            {status && status !== 'active' && (
              <Badge
                variant="default"
                size="sm"
                pill
                className={cn('border-0', statusColors[status] || 'bg-navy-100 text-navy-600')}
              >
                {statusLabels[status] || status}
              </Badge>
            )}
            {purpose && (
              <Badge
                variant="outline"
                size="sm"
                pill
                className="bg-white/90 backdrop-blur-sm border-0 text-navy-800"
              >
                {purpose === 'rent' ? 'For Rent' : 'For Sale'}
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavoriteToggle(id);
              }}
              className={cn(
                'absolute top-3 right-3 p-2 rounded-full',
                'bg-white/90 backdrop-blur-sm',
                'hover:bg-white transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-navy-500'
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-colors duration-200',
                  isFavorite
                    ? 'fill-danger-500 text-danger-500'
                    : 'text-navy-400 hover:text-danger-500'
                )}
              />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={cn('flex flex-col flex-1', currentSize.padding, currentSize.gap)}>
          {/* Price & Type */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  'font-playfair font-semibold text-navy-800 truncate',
                  currentSize.title
                )}
              >
                <Link to={`/property/${id}`} className="hover:text-navy-600 transition-colors">
                  {title}
                </Link>
              </h3>
              <div className="flex items-center gap-1 text-sm text-navy-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={cn('font-playfair font-bold text-gold-500', currentSize.price)}>
                {displayPrice}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-navy-600">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                <span className={currentSize.features}>{bedrooms}</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                <span className={currentSize.features}>{bathrooms}</span>
              </div>
            )}
            {area && (
              <div className="flex items-center gap-1">
                <Square className="w-3.5 h-3.5" />
                <span className={currentSize.features}>{displayArea}</span>
              </div>
            )}
            {parking && (
              <div className="flex items-center gap-1">
                <Car className="w-3.5 h-3.5" />
                <span className={currentSize.features}>{parking}</span>
              </div>
            )}
          </div>

          {/* Agent & Actions */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-navy-100">
            <div className="flex items-center gap-2 min-w-0">
              {showAgent && agent && (
                <div className="flex items-center gap-2 min-w-0">
                  {agent.image ? (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-navy-200 flex items-center justify-center text-navy-500 text-xs font-medium flex-shrink-0">
                      {agent.name?.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm text-navy-600 truncate">{agent.name}</span>
                </div>
              )}
            </div>

            {showActions && (
              <PropertyActions
                propertyId={id}
                isFavorite={isFavorite}
                onFavoriteToggle={onFavoriteToggle}
                onContact={onContact}
                variant="card"
                size="sm"
              />
            )}
          </div>

          {/* View Details Link (hidden, used for card click) */}
          <Link
            to={`/property/${id}`}
            className="absolute inset-0"
            aria-label={`View details for ${title}`}
          />
        </div>
      </Card>
    );
  }
);

PropertyCard.displayName = 'PropertyCard';

export default React.memo(PropertyCard);
