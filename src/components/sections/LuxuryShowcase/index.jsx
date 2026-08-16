import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, Crown, Sparkles, Award, Eye } from 'lucide-react';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency, formatArea } from '@/lib/formatters';

const LuxuryShowcase = React.forwardRef(
  (
    {
      properties = [],
      loading = false,
      title = 'Luxury Collection',
      subtitle = "Discover the world's most exclusive properties",
      description = 'Curated masterpieces of architecture and design, each property represents the pinnacle of luxury living.',
      viewAllLink = '/luxury',
      featuredProperty = null,
      className = '',
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const containerRef = useRef(null);

    // If no featured property, use first property from list
    const featured = featuredProperty || (properties.length > 0 ? properties[0] : null);
    const galleryProperties = properties.filter((p) => p.id !== featured?.id).slice(0, 5);

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
        setActiveIndex((prev) => Math.min(galleryProperties.length - 1, prev + 1));
      } else if (distance < -threshold) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
      setTouchStart(null);
      setTouchEnd(null);
    };

    // Auto-rotate gallery
    useEffect(() => {
      if (galleryProperties.length <= 1) return;
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % galleryProperties.length);
      }, 8000);
      return () => clearInterval(interval);
    }, [galleryProperties.length]);

    const renderFeaturedEstate = () => {
      if (!featured) return null;

      const [imageLoaded, setImageLoaded] = useState(false);
      const [imageError, setImageError] = useState(false);

      const handleImageLoad = () => setImageLoaded(true);
      const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
      };

      return (
        <Link
          to={`/property/${featured.id}`}
          className="group block focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded-3xl overflow-hidden"
        >
          <Card padding="none" className="overflow-hidden bg-navy-900 relative">
            {/* Image */}
            <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-navy-800">
              {featured.images && featured.images.length > 0 && !imageError ? (
                <>
                  <img
                    src={featured.images[0]}
                    alt={featured.title}
                    className={cn(
                      'w-full h-full object-cover transition-transform duration-1000',
                      'group-hover:scale-105',
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="eager"
                  />
                  {!imageLoaded && <div className="absolute inset-0 bg-navy-800 animate-pulse" />}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy-800 text-navy-600">
                  <Crown className="w-16 h-16" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />

              {/* Luxury Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <Badge variant="luxury" size="lg" className="shadow-premium">
                  <Crown className="w-3.5 h-3.5 mr-1.5" />
                  Elite Collection
                </Badge>
              </div>

              {/* Featured Badge */}
              {featured.featured && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <Badge variant="luxury" size="md" className="shadow-premium">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured Estate
                  </Badge>
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gold-400">
                      <span className="uppercase tracking-wider">Exclusive Listing</span>
                      <span className="w-1 h-1 rounded-full bg-gold-400" />
                      <span>{featured.location}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold">
                      {featured.title}
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base max-w-xl line-clamp-2">
                      {featured.description ||
                        'An exceptional masterpiece of architecture and design.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/70">
                      {featured.bedrooms && <span>{featured.bedrooms} Bedrooms</span>}
                      {featured.bathrooms && <span>{featured.bathrooms} Bathrooms</span>}
                      {featured.area && <span>{formatArea(featured.area)}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 flex-shrink-0">
                    <div className="text-2xl sm:text-3xl font-playfair font-bold text-gold-400">
                      {formatCurrency(featured.price)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="luxury" size="md" className="min-w-[140px]" as="div">
                        <Eye className="w-4 h-4 mr-2" />
                        Explore Property
                      </Button>
                      <Button variant="glass" size="md" className="min-w-[100px]" as="div">
                        Inquire
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      );
    };

    const renderGalleryItem = (property, index) => {
      const [imageLoaded, setImageLoaded] = useState(false);
      const [imageError, setImageError] = useState(false);

      const handleImageLoad = () => setImageLoaded(true);
      const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
      };

      const isActive = index === activeIndex;

      return (
        <Link
          key={property.id}
          to={`/property/${property.id}`}
          className={cn(
            'block focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded-2xl overflow-hidden',
            'transition-all duration-500',
            isActive
              ? 'opacity-100 scale-100'
              : 'opacity-60 scale-95 hover:opacity-80 hover:scale-98'
          )}
        >
          <Card padding="none" className="overflow-hidden bg-navy-900 relative h-full">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
              {property.images && property.images.length > 0 && !imageError ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className={cn(
                    'w-full h-full object-cover transition-transform duration-700',
                    'hover:scale-105',
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy-800 text-navy-600">
                  <Crown className="w-8 h-8" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

              {/* Badge */}
              {property.badge && (
                <div className="absolute top-3 left-3">
                  <Badge variant="luxury" size="sm" pill>
                    {property.badge}
                  </Badge>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                <h4 className="text-sm sm:text-base font-playfair font-semibold line-clamp-1">
                  {property.title}
                </h4>
                <p className="text-xs text-white/60">{property.location}</p>
                <p className="text-sm font-semibold text-gold-400 mt-0.5">
                  {formatCurrency(property.price)}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      );
    };

    return (
      <Section
        ref={ref}
        id="luxury-collection"
        padding="xl"
        background="navy"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-10 lg:space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeader
              title={title}
              subtitle={subtitle}
              align="left"
              size="lg"
              className="text-white"
              titleClassName="text-white"
              subtitleClassName="text-gold-400"
              description={description}
              descriptionClassName="text-navy-300 max-w-2xl"
            />

            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="flex items-center gap-2 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors group whitespace-nowrap"
              >
                <span>Explore All Luxury Properties</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="space-y-6">
              <div className="aspect-[16/9] lg:aspect-[21/9] bg-navy-700 rounded-3xl animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="aspect-[4/3] bg-navy-700 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Estate */}
              {featured && renderFeaturedEstate()}

              {/* Gallery Grid */}
              {galleryProperties.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg sm:text-xl font-playfair font-semibold text-white">
                      More Luxury Estates
                    </h4>
                    <span className="text-sm text-navy-400">
                      {galleryProperties.length} properties
                    </span>
                  </div>

                  <div
                    ref={containerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {galleryProperties.slice(0, 3).map((property, index) => (
                      <div key={property.id} className="h-full">
                        {renderGalleryItem(property, index)}
                      </div>
                    ))}
                  </div>

                  {/* Mobile indicators */}
                  {galleryProperties.length > 3 && (
                    <div className="flex justify-center gap-2 mt-4 lg:hidden">
                      {galleryProperties.slice(0, 3).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={cn(
                            'w-2 h-2 rounded-full transition-all duration-300',
                            index === activeIndex
                              ? 'w-6 bg-gold-400'
                              : 'bg-navy-600 hover:bg-navy-500'
                          )}
                          aria-label={`Go to slide ${index + 1}`}
                          aria-current={index === activeIndex}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-6 border-t border-navy-700">
            <div className="flex items-center gap-2 text-navy-400">
              <Award className="w-4 h-4 text-gold-400" />
              <span className="text-sm">Curated Selection</span>
            </div>
            <div className="flex items-center gap-2 text-navy-400">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-sm">Premium Locations</span>
            </div>
            <div className="flex items-center gap-2 text-navy-400">
              <Crown className="w-4 h-4 text-gold-400" />
              <span className="text-sm">White Glove Service</span>
            </div>
          </div>
        </div>
      </Section>
    );
  }
);

LuxuryShowcase.displayName = 'LuxuryShowcase';

export default React.memo(LuxuryShowcase);
