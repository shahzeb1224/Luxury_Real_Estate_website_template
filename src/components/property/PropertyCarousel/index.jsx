import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from '../PropertyCard';
import Button from '@/components/ui/Button';

const PropertyCarousel = React.forwardRef(
  (
    {
      properties = [],
      columns = 3,
      autoplay = false,
      autoplayInterval = 5000,
      showArrows = true,
      showDots = true,
      infinite = true,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const containerRef = useRef(null);
    const autoplayTimerRef = useRef(null);

    const totalSlides = Math.ceil(properties.length / columns);
    const maxIndex = Math.max(0, totalSlides - 1);

    // Reset current index if properties change
    useEffect(() => {
      if (currentIndex > maxIndex) {
        setCurrentIndex(0);
      }
    }, [properties.length, maxIndex, currentIndex]);

    // Autoplay
    useEffect(() => {
      if (autoplay && properties.length > columns) {
        autoplayTimerRef.current = setInterval(() => {
          handleNext();
        }, autoplayInterval);

        return () => {
          if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
          }
        };
      }
    }, [autoplay, autoplayInterval, properties.length, columns]);

    const handlePrev = useCallback(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        const newIndex = prev - 1;
        if (newIndex < 0) {
          return infinite ? maxIndex : 0;
        }
        return newIndex;
      });
      setTimeout(() => setIsTransitioning(false), 400);
    }, [isTransitioning, infinite, maxIndex]);

    const handleNext = useCallback(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex > maxIndex) {
          return infinite ? 0 : maxIndex;
        }
        return newIndex;
      });
      setTimeout(() => setIsTransitioning(false), 400);
    }, [isTransitioning, infinite, maxIndex]);

    const goToSlide = (index) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 400);
    };

    // Touch handlers for mobile swiping
    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const threshold = 50;
      if (distance > threshold) {
        handleNext();
      } else if (distance < -threshold) {
        handlePrev();
      }
      setTouchStart(null);
      setTouchEnd(null);
    };

    const visibleProperties = properties.slice(
      currentIndex * columns,
      currentIndex * columns + columns
    );

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div
          ref={containerRef}
          className={cn('relative overflow-hidden', containerClassName)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Track */}
          <div
            className={cn(
              'grid gap-4 sm:gap-6 transition-transform duration-400 ease-out',
              columnClasses[columns]
            )}
            style={{
              transform: `translateX(0)`,
            }}
          >
            {visibleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="grid"
                size="md"
                showAgent={false}
                showActions={true}
                featured={property.featured}
              />
            ))}
          </div>

          {/* Empty State for incomplete slide */}
          {visibleProperties.length < columns && visibleProperties.length > 0 && (
            <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
              {Array.from({ length: columns - visibleProperties.length }).map((_, index) => (
                <div key={`empty-${index}`} className="opacity-0 pointer-events-none" />
              ))}
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {showArrows && properties.length > columns && (
          <>
            <button
              onClick={handlePrev}
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 z-10',
                'p-2 rounded-full bg-white/90 backdrop-blur-sm',
                'shadow-premium hover:bg-white',
                'transition-all duration-200 hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-navy-500',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              disabled={!infinite && currentIndex === 0}
              aria-label="Previous properties"
            >
              <ChevronLeft className="w-5 h-5 text-navy-800" />
            </button>

            <button
              onClick={handleNext}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 z-10',
                'p-2 rounded-full bg-white/90 backdrop-blur-sm',
                'shadow-premium hover:bg-white',
                'transition-all duration-200 hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-navy-500',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              disabled={!infinite && currentIndex === maxIndex}
              aria-label="Next properties"
            >
              <ChevronRight className="w-5 h-5 text-navy-800" />
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && properties.length > columns && totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex ? 'w-6 bg-navy-800' : 'bg-navy-300 hover:bg-navy-400'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

PropertyCarousel.displayName = 'PropertyCarousel';

export default React.memo(PropertyCarousel);
