import React, { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const BlogCard = forwardRef(
  (
    {
      post,
      variant = 'default',
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
      slug,
      excerpt,
      image,
      category,
      date,
      author,
      readingTime,
      featured = false,
    } = post;

    const handleImageLoad = () => setImageLoaded(true);
    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const formatDate = (dateString) => {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    const variantClasses = {
      default: 'flex flex-col',
      featured: 'flex flex-col lg:flex-row bg-gradient-to-br from-navy-50 to-gold-50',
      compact: 'flex flex-col p-3',
      horizontal: 'flex flex-col sm:flex-row',
    };

    const imageVariantClasses = {
      default: 'aspect-[4/3]',
      featured: 'aspect-[4/3] lg:aspect-[3/2] lg:w-1/2',
      compact: 'aspect-[4/3]',
      horizontal: 'aspect-[4/3] sm:aspect-[3/4] sm:w-48',
    };

    const isFeatured = variant === 'featured' || featured;

    return (
      <Link
        to={`/blog/${slug}`}
        className={cn(
          'group block focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded-2xl',
          isFeatured && 'focus:ring-gold-500'
        )}
        {...props}
      >
        <Card
          ref={ref}
          variant={isFeatured ? 'premium' : 'default'}
          padding="none"
          hoverable
          className={cn(
            'overflow-hidden transition-all duration-500',
            'hover:shadow-premium-lg hover:-translate-y-1',
            isFeatured && 'border-2 border-gold-300',
            variantClasses[variant],
            className
          )}
        >
          {/* Image */}
          <div
            className={cn(
              'relative overflow-hidden bg-navy-100 flex-shrink-0',
              imageVariantClasses[variant]
            )}
          >
            {image && !imageError ? (
              <>
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
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-navy-100 text-navy-400">
                <span className="text-sm font-medium">No image</span>
              </div>
            )}

            {/* Category Badge */}
            {category && (
              <div className="absolute top-3 left-3">
                <Badge variant="luxury" size="sm" pill>
                  {category}
                </Badge>
              </div>
            )}

            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" size="sm" pill>
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className={cn(
              'flex flex-col flex-1 p-4 sm:p-5 lg:p-6',
              isFeatured ? 'bg-transparent' : 'bg-white',
              contentClassName
            )}
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-navy-500">
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(date)}
                </span>
              )}
              {readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className={cn(
                'font-playfair font-semibold text-navy-800 transition-colors mt-2',
                isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl',
                'group-hover:text-gold-600',
                isFeatured && 'group-hover:text-gold-500'
              )}
            >
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p
                className={cn(
                  'text-navy-500 mt-2 line-clamp-2',
                  isFeatured && 'text-base sm:text-lg'
                )}
              >
                {excerpt}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy-100">
              <div className="flex items-center gap-2">
                {author?.avatar ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-navy-200 flex-shrink-0">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-navy-200 flex items-center justify-center text-navy-500 text-xs font-medium flex-shrink-0">
                    {author?.name?.charAt(0) || 'A'}
                  </div>
                )}
                <span className="text-xs font-medium text-navy-700">
                  {author?.name || 'Unknown Author'}
                </span>
              </div>

              <span className="flex items-center gap-1 text-xs font-medium text-gold-500 group-hover:text-gold-600 transition-colors">
                Read More
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Card>
      </Link>
    );
  }
);

BlogCard.displayName = 'BlogCard';

export default React.memo(BlogCard);
