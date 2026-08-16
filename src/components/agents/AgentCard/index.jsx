import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { Star, Award, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const AgentCard = React.forwardRef(
  (
    {
      agent,
      variant = 'grid',
      size = 'md',
      featured = false,
      showContact = true,
      showSocial = true,
      showRating = true,
      className = '',
      onContact,
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const {
      id,
      name,
      title,
      image,
      experience,
      specialization,
      languages,
      rating,
      verified,
      propertiesSold,
      awards,
      location,
      social,
      phone,
      email,
    } = agent;

    const handleImageLoad = () => setImageLoaded(true);
    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const variantClasses = {
      grid: 'flex flex-col',
      list: 'flex flex-col sm:flex-row sm:items-center',
      compact: 'flex flex-col p-3',
      featured: 'flex flex-col lg:flex-row bg-gradient-to-br from-navy-900 to-navy-800 text-white',
    };

    const sizeClasses = {
      sm: {
        avatar: 'w-16 h-16',
        name: 'text-base',
        title: 'text-xs',
        description: 'text-xs',
        padding: 'p-3',
        gap: 'gap-1',
      },
      md: {
        avatar: 'w-24 h-24',
        name: 'text-lg',
        title: 'text-sm',
        description: 'text-sm',
        padding: 'p-4 sm:p-5',
        gap: 'gap-2',
      },
      lg: {
        avatar: 'w-32 h-32',
        name: 'text-2xl',
        title: 'text-base',
        description: 'text-base',
        padding: 'p-6 sm:p-8',
        gap: 'gap-3',
      },
    };

    const currentSize = sizeClasses[size];

    const handleContact = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onContact) onContact(id);
    };

    const handlePhoneClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (phone) {
        window.location.href = `tel:${phone}`;
      }
    };

    const handleEmailClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (email) {
        window.location.href = `mailto:${email}`;
      }
    };

    const renderRating = () => {
      if (!rating) return null;
      return (
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
          <span className="text-sm font-medium text-navy-700">{rating.toFixed(1)}</span>
        </div>
      );
    };

    return (
      <Link
        to={`/agent/${id}`}
        className={cn(
          'block group focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 rounded-2xl',
          variant === 'featured' && 'focus:ring-gold-500'
        )}
      >
        <Card
          ref={ref}
          variant={variant === 'featured' ? 'premium' : 'default'}
          padding="none"
          hoverable
          className={cn(
            'overflow-hidden transition-all duration-500',
            'hover:shadow-premium-lg hover:-translate-y-1',
            variant === 'featured' && 'border-2 border-gold-300',
            variantClasses[variant],
            className
          )}
          {...props}
        >
          {/* Image / Avatar */}
          <div
            className={cn(
              'flex-shrink-0 overflow-hidden bg-navy-100',
              variant === 'grid' ? 'aspect-[4/3]' : '',
              variant === 'featured' ? 'aspect-[4/3] lg:aspect-auto lg:w-72' : '',
              variant === 'list' ? 'w-full sm:w-40 aspect-square' : '',
              variant === 'compact' ? 'w-full aspect-square' : ''
            )}
          >
            {image && !imageError ? (
              <>
                <img
                  src={image}
                  alt={name}
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
                <span className="text-4xl font-playfair font-bold">{name?.charAt(0) || 'A'}</span>
              </div>
            )}

            {/* Verified Badge */}
            {verified && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="success"
                  size="sm"
                  pill
                  className="flex items-center gap-1 shadow-premium"
                >
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              'flex flex-col flex-1',
              currentSize.padding,
              currentSize.gap,
              variant === 'featured' && 'text-white'
            )}
          >
            {/* Name & Title */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3
                  className={cn(
                    'font-playfair font-semibold truncate',
                    currentSize.name,
                    variant === 'featured' ? 'text-white' : 'text-navy-800'
                  )}
                >
                  {name}
                </h3>
                <p
                  className={cn(
                    'font-medium',
                    currentSize.title,
                    variant === 'featured' ? 'text-gold-400' : 'text-gold-500'
                  )}
                >
                  {title}
                </p>
              </div>
              {showRating && renderRating()}
            </div>

            {/* Details */}
            <div
              className={cn(
                'flex flex-wrap gap-x-4 gap-y-1',
                currentSize.description,
                variant === 'featured' ? 'text-navy-300' : 'text-navy-500'
              )}
            >
              {experience && <span>{experience} Years</span>}
              {specialization && <span>{specialization}</span>}
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs',
                      variant === 'featured'
                        ? 'bg-navy-700 text-navy-300'
                        : 'bg-navy-50 text-navy-500'
                    )}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            {(propertiesSold || awards) && (
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {propertiesSold && (
                  <div className="flex items-center gap-1 text-navy-600">
                    <span className="font-semibold">{propertiesSold}+</span>
                    <span>Properties Sold</span>
                  </div>
                )}
                {awards && (
                  <div className="flex items-center gap-1 text-navy-600">
                    <Award className="w-3.5 h-3.5 text-gold-500" />
                    <span>{awards} Awards</span>
                  </div>
                )}
              </div>
            )}

            {/* Contact & Social */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-navy-100">
              {showContact && (
                <>
                  <button
                    onClick={handleContact}
                    className="flex-1 px-3 py-1.5 bg-navy-800 text-white rounded-lg text-sm font-medium hover:bg-navy-700 transition-colors"
                  >
                    Contact Agent
                  </button>
                  <button
                    onClick={handlePhoneClick}
                    className="p-2 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
                    aria-label="Call agent"
                  >
                    <Phone className="w-4 h-4 text-navy-600" />
                  </button>
                  <button
                    onClick={handleEmailClick}
                    className="p-2 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
                    aria-label="Email agent"
                  >
                    <Mail className="w-4 h-4 text-navy-600" />
                  </button>
                </>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }
);

AgentCard.displayName = 'AgentCard';

export default React.memo(AgentCard);
