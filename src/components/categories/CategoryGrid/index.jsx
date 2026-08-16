import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import CategoryCard from '../CategoryCard';
import Button from '@/components/ui/Button';

const CategoryGrid = React.forwardRef(
  (
    {
      categories = [],
      loading = false,
      title = 'Browse Properties',
      subtitle = 'Find your perfect property by category',
      viewAllLink = '/buy',
      columns = 4,
      showCarousel = false,
      showViewAll = true,
      className = '',
      gridClassName = '',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const containerRef = useRef(null);

    const totalSlides = Math.ceil(categories.length / columns);
    const maxIndex = Math.max(0, totalSlides - 1);

    const handlePrev = () => {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
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

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    };

    const visibleCategories = showCarousel
      ? categories.slice(currentIndex * columns, currentIndex * columns + columns)
      : categories;

    const showArrows = showCarousel && categories.length > columns && maxIndex > 0;

    return (
      <Section
        ref={ref}
        id="property-categories"
        padding="lg"
        background="gray"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeader
              title={title}
              subtitle={subtitle}
              align="left"
              size="md"
              className="flex-1"
            />

            {showViewAll && viewAllLink && (
              <Link
                to={viewAllLink}
                className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors group whitespace-nowrap"
              >
                <span>View All Categories</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
              {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                  <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                    <div className="h-4 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/3" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div
              ref={containerRef}
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns], gridClassName)}>
                {visibleCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    variant="default"
                    size="md"
                    featured={category.featured}
                  />
                ))}
              </div>

              {/* Arrows for carousel */}
              {showArrows && (
                <>
                  <button
                    onClick={handlePrev}
                    className={cn(
                      'absolute -left-3 top-1/2 -translate-y-1/2 z-10',
                      'p-2 rounded-full bg-white shadow-premium',
                      'hover:bg-navy-50 transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-navy-500',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      'hidden lg:block'
                    )}
                    disabled={currentIndex === 0}
                    aria-label="Previous categories"
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
                      'hidden lg:block'
                    )}
                    disabled={currentIndex === maxIndex}
                    aria-label="Next categories"
                  >
                    <ChevronRight className="w-5 h-5 text-navy-600" />
                  </button>
                </>
              )}

              {/* Dots for carousel */}
              {showCarousel && categories.length > columns && totalSlides > 1 && (
                <div className="flex justify-center gap-2 mt-6 lg:hidden">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-navy-500">No categories found</p>
            </div>
          )}
        </div>
      </Section>
    );
  }
);

CategoryGrid.displayName = 'CategoryGrid';

export default React.memo(CategoryGrid);
