import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Heart, Share2, Eye, Phone, Calendar, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';

const PropertyActions = React.forwardRef(
  (
    {
      propertyId,
      isFavorite = false,
      onFavoriteToggle,
      onContact,
      onShare,
      onView,
      onBookVisit,
      variant = 'card',
      size = 'md',
      showFavorite = true,
      showShare = true,
      showContact = true,
      showView = true,
      showBookVisit = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      card: 'flex items-center gap-1',
      details: 'flex flex-wrap items-center gap-3',
      compact: 'flex items-center gap-0.5',
      floating: 'flex flex-col gap-2',
      inline: 'flex items-center gap-4',
    };

    const sizeClasses = {
      sm: {
        button: 'p-1.5',
        icon: 'w-3.5 h-3.5',
        text: 'text-xs',
      },
      md: {
        button: 'p-2',
        icon: 'w-4 h-4',
        text: 'text-sm',
      },
      lg: {
        button: 'p-2.5',
        icon: 'w-4.5 h-4.5',
        text: 'text-base',
      },
    };

    const currentSize = sizeClasses[size];

    const handleFavorite = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onFavoriteToggle) {
        onFavoriteToggle(propertyId);
      }
    };

    const handleShare = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onShare) {
        onShare(propertyId);
      }
    };

    const handleView = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onView) {
        onView(propertyId);
      }
    };

    const handleContact = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onContact) {
        onContact(propertyId);
      }
    };

    const handleBookVisit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onBookVisit) {
        onBookVisit(propertyId);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', variantClasses[variant], className)}
        {...props}
      >
        {/* View Details */}
        {showView && (
          <Tooltip content="View details" position="top">
            <Link
              to={`/property/${propertyId}`}
              className={cn('rounded-full hover:bg-navy-50 transition-colors', currentSize.button)}
              aria-label="View property details"
            >
              <Eye className={cn('text-navy-500', currentSize.icon)} />
            </Link>
          </Tooltip>
        )}

        {/* Favorite */}
        {showFavorite && onFavoriteToggle && (
          <Tooltip
            content={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            position="top"
          >
            <button
              onClick={handleFavorite}
              className={cn('rounded-full hover:bg-navy-50 transition-colors', currentSize.button)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={cn(
                  'transition-colors duration-200',
                  isFavorite
                    ? 'fill-danger-500 text-danger-500'
                    : 'text-navy-500 hover:text-danger-500',
                  currentSize.icon
                )}
              />
            </button>
          </Tooltip>
        )}

        {/* Share */}
        {showShare && onShare && (
          <Tooltip content="Share property" position="top">
            <button
              onClick={handleShare}
              className={cn('rounded-full hover:bg-navy-50 transition-colors', currentSize.button)}
              aria-label="Share property"
            >
              <Share2 className={cn('text-navy-500', currentSize.icon)} />
            </button>
          </Tooltip>
        )}

        {/* Contact Agent */}
        {showContact && onContact && (
          <Tooltip content="Contact agent" position="top">
            <button
              onClick={handleContact}
              className={cn('rounded-full hover:bg-navy-50 transition-colors', currentSize.button)}
              aria-label="Contact agent"
            >
              <Phone className={cn('text-navy-500', currentSize.icon)} />
            </button>
          </Tooltip>
        )}

        {/* Book Visit */}
        {showBookVisit && (
          <Button
            variant="luxury"
            size={size}
            onClick={handleBookVisit}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Visit</span>
          </Button>
        )}

        {/* WhatsApp Contact (optional) */}
        {variant === 'details' && onContact && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleContact}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span>WhatsApp</span>
          </Button>
        )}
      </div>
    );
  }
);

PropertyActions.displayName = 'PropertyActions';

export default React.memo(PropertyActions);
