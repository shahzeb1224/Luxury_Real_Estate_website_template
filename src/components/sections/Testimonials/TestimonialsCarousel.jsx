import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const TestimonialsCarousel = React.forwardRef(
  (
    {
      testimonials = [],
      autoplay = true,
      autoplayInterval = 6000,
      showArrows = true,
      showDots = true,
      columns = 3,
      className = '',
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

    const totalSlides = Math.ceil(testimonials.length / columns);
    const maxIndex = Math.max(0, totalSlides - 1);

    const visibleTestimonials = testimonials.slice(
      currentIndex * columns,
      currentIndex * columns + columns
    );

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    // Autoplay
    useEffect(() => {
      if (autoplay && testimonials.length > columns) {
        autoplayTimerRef.current = setInterval(() => {
          handleNext();
        }, autoplayInterval);

        return () => {
          if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
          }
        };
      }
    }, [autoplay, autoplayInterval, testimonials.length, columns]);

    const handlePrev = useCallback(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => Math.max(0, prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const handleNext = useCallback(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning, maxIndex]);

    const goToSlide = (index) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    };

    // Touch handlers
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

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      };

      const currentRef = containerRef.current;
      if (currentRef) {
        currentRef.addEventListener('keydown', handleKeyDown);
        return () => currentRef.removeEventListener('keydown', handleKeyDown);
      }
    }, [handlePrev, handleNext]);

    const showArrowsVisible = showArrows && testimonials.length > columns;
    const showDotsVisible = showDots && testimonials.length > columns && totalSlides > 1;

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        className={cn('relative', className)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Testimonials carousel"
        {...props}
      >
        <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrowsVisible && (
          <>
            <button
              onClick={handlePrev}
              className={cn(
                'absolute -left-3 top-1/2 -translate-y-1/2 z-10',
                'p-2 rounded-full bg-white shadow-premium',
                'hover:bg-navy-50 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-navy-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'hidden lg:flex'
              )}
              disabled={currentIndex === 0}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-navy-600" />
            </button>

            <button
              onClick={handleNext}
              className={cn(
                'absolute -right-3 top-1/2 -translate-y-1/2 z-10',
                'p-2 rounded-full bg-white shadow-premium',
                'hover:bg-navy-50 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-navy-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'hidden lg:flex'
              )}
              disabled={currentIndex === maxIndex}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-navy-600" />
            </button>
          </>
        )}

        {/* Dots */}
        {showDotsVisible && (
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

TestimonialsCarousel.displayName = 'TestimonialsCarousel';

export default React.memo(TestimonialsCarousel);
