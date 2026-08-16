import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const CategoryCard = React.forwardRef(
  (
    {
      category,
      variant = 'default',
      size = 'md',
      featured = false,
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
      description,
      icon,
      image,
      count,
      slug,
      color,
      featured: isFeatured,
    } = category;

    const isFeaturedCategory = featured || isFeatured;

    const variantClasses = {
      default: 'flex flex-col',
      compact: 'flex flex-col p-3',
      horizontal: 'flex flex-row items-center',
      glass: 'flex flex-col bg-glass-white backdrop-blur-sm',
      featured: 'flex flex-col lg:flex-row',
    };

    const sizeClasses = {
      sm: {
        title: 'text-base',
        count: 'text-xs',
        description: 'text-xs',
        padding: 'p-3',
        gap: 'gap-1',
        icon: 'w-8 h-8',
        image: 'aspect-[4/3]',
      },
      md: {
        title: 'text-lg',
        count: 'text-sm',
        description: 'text-sm',
        padding: 'p-4 sm:p-5',
        gap: 'gap-2',
        icon: 'w-10 h-10',
        image: 'aspect-[4/3]',
      },
      lg: {
        title: 'text-xl',
        count: 'text-base',
        description: 'text-base',
        padding: 'p-5 sm:p-6',
        gap: 'gap-3',
        icon: 'w-12 h-12',
        image: 'aspect-[3/2]',
      },
    };

    const currentSize = sizeClasses[size];

    const colorVariants = {
      navy: 'bg-navy-50 border-navy-200 hover:border-navy-400',
      gold: 'bg-gold-50 border-gold-200 hover:border-gold-400',
      white: 'bg-white border-navy-100 hover:border-navy-300',
      glass: 'bg-glass-white backdrop-blur-sm border-white/20',
      dark: 'bg-navy-800 border-navy-700 text-white',
    };

    const iconColorVariants = {
      navy: 'text-navy-600',
      gold: 'text-gold-500',
      white: 'text-navy-500',
      glass: 'text-navy-600',
      dark: 'text-gold-400',
    };

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const cardColor = color || 'white';

    return (
      <Link
        to={`/buy?category=${slug}`}
        className="block group focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 rounded-2xl"
      >
        <Card
          ref={ref}
          variant={isFeaturedCategory ? 'premium' : 'default'}
          shadow={isFeaturedCategory ? 'premium-lg' : 'premium'}
          padding="none"
          hoverable
          className={cn(
            'overflow-hidden transition-all duration-300',
            'border',
            colorVariants[cardColor] || colorVariants.white,
            isFeaturedCategory && 'border-2 border-gold-300',
            variantClasses[variant],
            className
          )}
          {...props}
        >
          {/* Image */}
          {image && !imageError && (
            <div
              className={cn(
                'relative overflow-hidden bg-navy-100 flex-shrink-0',
                currentSize.image,
                variant === 'horizontal' ? 'w-24 sm:w-32' : 'w-full'
              )}
            >
              <img
                src={image}
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
            </div>
          )}

          {/* Content */}
          <div className={cn('flex flex-col flex-1', currentSize.padding, currentSize.gap)}>
            {/* Icon & Title Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {icon && (
                  <div
                    className={cn(
                      'flex-shrink-0 rounded-full',
                      'bg-white/90 backdrop-blur-sm',
                      'flex items-center justify-center',
                      currentSize.icon
                    )}
                  >
                    <span
                      className={cn(
                        'text-2xl',
                        iconColorVariants[cardColor] || iconColorVariants.white
                      )}
                    >
                      {icon}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <h3
                    className={cn(
                      'font-playfair font-semibold text-navy-800 truncate',
                      currentSize.title,
                      cardColor === 'dark' && 'text-white'
                    )}
                  >
                    {title}
                  </h3>
                  {count !== undefined && (
                    <span
                      className={cn(
                        'text-navy-500',
                        currentSize.count,
                        cardColor === 'dark' && 'text-navy-300'
                      )}
                    >
                      {count} properties
                    </span>
                  )}
                </div>
              </div>

              {isFeaturedCategory && (
                <Badge variant="luxury" size="sm" pill>
                  Featured
                </Badge>
              )}
            </div>

            {/* Description */}
            {description && (
              <p
                className={cn(
                  'text-navy-500 line-clamp-2',
                  currentSize.description,
                  cardColor === 'dark' && 'text-navy-300'
                )}
              >
                {description}
              </p>
            )}

            {/* CTA */}
            <div className="flex items-center gap-1 mt-1 text-sm font-medium text-navy-600 group-hover:text-navy-800 transition-colors">
              <span>Explore {title}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Card>
      </Link>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';

export default React.memo(CategoryCard);
