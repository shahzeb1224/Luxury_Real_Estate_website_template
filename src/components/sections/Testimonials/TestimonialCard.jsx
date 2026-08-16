import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { Star, Quote, CheckCircle, Calendar } from 'lucide-react';

const TestimonialCard = React.forwardRef(
  (
    {
      client,
      location,
      propertyType,
      transactionType,
      rating,
      quote,
      year,
      verified = true,
      featured = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => setImageLoaded(true);

    const renderStars = (count) => {
      return (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn('w-4 h-4', i < count ? 'fill-gold-500 text-gold-500' : 'text-navy-200')}
            />
          ))}
        </div>
      );
    };

    return (
      <Card
        ref={ref}
        variant={featured ? 'premium' : 'default'}
        padding="lg"
        hoverable
        className={cn(
          'transition-all duration-500',
          'hover:shadow-premium-lg hover:-translate-y-1',
          featured && 'border-2 border-gold-300',
          className
        )}
        {...props}
      >
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-gold-200 mb-3" />

        {/* Rating */}
        <div className="mb-3">{renderStars(rating)}</div>

        {/* Quote */}
        <blockquote className="text-navy-600 text-sm leading-relaxed mb-4">
          &quot;{quote}&quot;
        </blockquote>

        {/* Client Info */}
        <div className="flex items-center gap-3 pt-3 border-t border-navy-100">
          <Avatar
            src={client.image}
            alt={client.name}
            size="md"
            fallback={client.name?.charAt(0)}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-navy-800 text-sm">{client.name}</p>
              {verified && (
                <Badge variant="success" size="sm" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-navy-500">
              <span>{location}</span>
              <span className="w-1 h-1 rounded-full bg-navy-300" />
              <span>{propertyType}</span>
              <span className="w-1 h-1 rounded-full bg-navy-300" />
              <span className="capitalize">{transactionType}</span>
            </div>
            {year && (
              <div className="flex items-center gap-1 text-xs text-navy-400 mt-0.5">
                <Calendar className="w-3 h-3" />
                <span>{year}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';

export default React.memo(TestimonialCard);
