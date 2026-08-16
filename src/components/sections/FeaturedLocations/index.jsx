import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, MapPin, Home, Building2, Star, TrendingUp } from 'lucide-react';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatters';

const FeaturedLocations = React.forwardRef(
  (
    {
      locations = [],
      loading = false,
      title = 'Featured Locations',
      subtitle = 'Discover premium communities and investment hotspots',
      viewAllLink = '/locations',
      columns = 3,
      showCarousel = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [imageStates, setImageStates] = useState({});
    const containerRef = useRef(null);

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const totalSlides = Math.ceil(locations.length / columns);
    const maxIndex = Math.max(0, totalSlides - 1);

    const handlePrev = () => {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

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

    const handleImageLoad = (locationId) => {
      setImageStates((prev) => ({ ...prev, [locationId]: { loaded: true, error: false } }));
    };

    const handleImageError = (locationId) => {
      setImageStates((prev) => ({ ...prev, [locationId]: { loaded: true, error: true } }));
    };

    const getImageState = (locationId) => {
      return imageStates[locationId] || { loaded: false, error: false };
    };

    const visibleLocations = showCarousel
      ? locations.slice(currentIndex * columns, currentIndex * columns + columns)
      : locations;

    const showArrows = showCarousel && locations.length > columns && maxIndex > 0;

    const getInvestmentRating = (rating) => {
      const stars = Math.round(rating || 0);
      return '★'.repeat(stars) + '☆'.repeat(5 - stars);
    };

    return (
      <Section
        ref={ref}
        id="featured-locations"
        padding="lg"
        background="white"
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

            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors group whitespace-nowrap"
              >
                <span>View All Locations</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Locations Grid */}
          {loading ? (
            <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
              {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                  <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                    <div className="h-5 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                    <div className="h-4 bg-navy-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : locations.length > 0 ? (
            <div
              ref={containerRef}
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
                {visibleLocations.map((location) => {
                  const { loaded, error } = getImageState(location.id);

                  return (
                    <Link
                      key={location.id}
                      to={`/buy?location=${location.slug}`}
                      className="group focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 rounded-2xl"
                    >
                      <Card
                        padding="none"
                        hoverable
                        className="overflow-hidden transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                          {location.image && !error ? (
                            <>
                              <img
                                src={location.image}
                                alt={location.name}
                                className={cn(
                                  'w-full h-full object-cover transition-transform duration-700',
                                  'group-hover:scale-105',
                                  loaded ? 'opacity-100' : 'opacity-0'
                                )}
                                onLoad={() => handleImageLoad(location.id)}
                                onError={() => handleImageError(location.id)}
                                loading="lazy"
                              />
                              {!loaded && (
                                <div className="absolute inset-0 bg-navy-100 animate-pulse" />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-navy-100 text-navy-400">
                              <MapPin className="w-8 h-8" />
                            </div>
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {location.featured && (
                              <Badge variant="luxury" size="sm" pill>
                                Featured
                              </Badge>
                            )}
                            {location.investmentRating && location.investmentRating >= 4 && (
                              <Badge variant="success" size="sm" pill>
                                High ROI
                              </Badge>
                            )}
                          </div>

                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-lg sm:text-xl font-playfair font-semibold">
                                  {location.name}
                                </h3>
                                <p className="text-white/80 text-sm mt-0.5">
                                  {location.properties} properties
                                </p>
                              </div>
                              {location.averagePrice && (
                                <div className="text-right flex-shrink-0">
                                  <p className="text-xs text-white/60">Avg. Price</p>
                                  <p className="text-sm sm:text-base font-semibold text-gold-400">
                                    {formatCurrency(location.averagePrice)}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Investment Rating */}
                            {location.investmentRating && (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-0.5">
                                  <span className="text-gold-400 text-sm">
                                    {getInvestmentRating(location.investmentRating)}
                                  </span>
                                </div>
                                <span className="text-xs text-white/60">Investment Rating</span>
                              </div>
                            )}

                            {/* Explore CTA */}
                            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                              <span>Explore {location.name}</span>
                              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Arrows */}
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
                    aria-label="Previous locations"
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
                    aria-label="Next locations"
                  >
                    <ChevronRight className="w-5 h-5 text-navy-600" />
                  </button>
                </>
              )}

              {/* Dots */}
              {showCarousel && locations.length > columns && totalSlides > 1 && (
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
              <p className="text-navy-500">No locations found</p>
            </div>
          )}
        </div>
      </Section>
    );
  }
);

FeaturedLocations.displayName = 'FeaturedLocations';

export default React.memo(FeaturedLocations);
