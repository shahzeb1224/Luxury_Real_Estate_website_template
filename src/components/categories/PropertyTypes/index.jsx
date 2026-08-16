import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import {
  Home,
  Building2,
  Castle,
  Crown,
  Building,
  Ruler,
  Warehouse,
  Store,
  Briefcase,
  LandPlot,
  Factory,
  Trees,
  ShoppingBag,
} from 'lucide-react';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';

const PropertyTypes = React.forwardRef(
  (
    {
      types = [],
      loading = false,
      title = 'Property Types',
      subtitle = "Find exactly what you're looking for",
      className = '',
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const scrollRef = useRef(null);

    // Default property types if none provided
    const defaultTypes = [
      { id: 'house', label: 'House', icon: Home, count: 234 },
      { id: 'apartment', label: 'Apartment', icon: Building2, count: 456 },
      { id: 'villa', label: 'Villa', icon: Castle, count: 123 },
      { id: 'luxury-villa', label: 'Luxury Villa', icon: Crown, count: 67 },
      { id: 'penthouse', label: 'Penthouse', icon: Building, count: 89 },
      { id: 'plot', label: 'Plot', icon: LandPlot, count: 345 },
      { id: 'commercial', label: 'Commercial', icon: Briefcase, count: 178 },
      { id: 'office', label: 'Office', icon: Building, count: 234 },
      { id: 'shop', label: 'Shop', icon: Store, count: 156 },
      { id: 'warehouse', label: 'Warehouse', icon: Warehouse, count: 78 },
      { id: 'farm-house', label: 'Farm House', icon: Trees, count: 45 },
      { id: 'land', label: 'Land', icon: Ruler, count: 267 },
    ];

    const propertyTypes = types.length > 0 ? types : defaultTypes;

    const iconMap = {
      Home,
      Building2,
      Castle,
      Crown,
      Building,
      Ruler,
      Warehouse,
      Store,
      Briefcase,
      LandPlot,
      Factory,
      Trees,
      ShoppingBag,
    };

    // Touch handlers for mobile scrolling
    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const threshold = 30;
      if (distance > threshold) {
        handleNext();
      } else if (distance < -threshold) {
        handlePrev();
      }
      setTouchStart(null);
      setTouchEnd(null);
    };

    const handlePrev = () => {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
      setActiveIndex((prev) => Math.min(propertyTypes.length - 1, prev + 1));
    };

    // Auto-scroll to active item
    useEffect(() => {
      if (scrollRef.current) {
        const activeElement = scrollRef.current.children[activeIndex];
        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      }
    }, [activeIndex]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      };

      const container = scrollRef.current;
      if (container) {
        container.addEventListener('keydown', handleKeyDown);
        return () => container.removeEventListener('keydown', handleKeyDown);
      }
    }, []);

    return (
      <Section
        ref={ref}
        id="property-types"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-8">
          <SectionHeader title={title} subtitle={subtitle} align="center" size="md" />

          {/* Type Navigation */}
          <nav
            ref={scrollRef}
            className={cn(
              'flex items-center gap-2 overflow-x-auto',
              'pb-4 scroll-smooth',
              'snap-x snap-mandatory',
              'scrollbar-hide'
            )}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="tablist"
            aria-label="Property types"
          >
            {propertyTypes.map((type, index) => {
              const Icon =
                typeof type.icon === 'string' ? iconMap[type.icon] || Home : type.icon || Home;

              const isActive = index === activeIndex;

              return (
                <button
                  key={type.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'flex-shrink-0 snap-center',
                    'flex flex-col items-center gap-2',
                    'px-4 sm:px-6 py-3 min-w-[80px] sm:min-w-[100px]',
                    'rounded-xl transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-navy-500',
                    isActive
                      ? 'bg-navy-800 text-white shadow-premium scale-105'
                      : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  )}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${type.id}`}
                  id={`tab-${type.id}`}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300',
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    )}
                  />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    {type.label}
                  </span>
                  {type.count !== undefined && (
                    <span className={cn('text-xs', isActive ? 'text-navy-300' : 'text-navy-400')}>
                      {type.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Type Content Panels */}
          <div className="mt-4">
            {propertyTypes.map((type, index) => {
              const Icon =
                typeof type.icon === 'string' ? iconMap[type.icon] || Home : type.icon || Home;

              return (
                <div
                  key={type.id}
                  id={`panel-${type.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${type.id}`}
                  className={cn(
                    'transition-all duration-500',
                    index === activeIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 absolute pointer-events-none'
                  )}
                >
                  <div className="bg-navy-50 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="p-4 bg-white rounded-2xl shadow-premium">
                        <Icon className="w-12 h-12 text-navy-600" />
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-navy-800">
                          {type.label}
                        </h3>
                        <p className="text-navy-500 mt-1">
                          Browse all {type.label.toLowerCase()} properties
                          {type.count !== undefined && (
                            <span className="text-gold-500 font-medium">
                              {' '}
                              ({type.count} available)
                            </span>
                          )}
                        </p>
                      </div>

                      <Link
                        to={`/buy?category=${type.id}`}
                        className="flex-shrink-0 px-6 py-3 bg-navy-800 text-white rounded-lg font-semibold hover:bg-navy-700 transition-colors"
                      >
                        View Properties
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Indicators */}
          <div className="flex justify-center gap-2 mt-2">
            {propertyTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-6 bg-navy-800' : 'bg-navy-300 hover:bg-navy-400'
                )}
                aria-label={`Go to ${type.label}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </Section>
    );
  }
);

PropertyTypes.displayName = 'PropertyTypes';

export default React.memo(PropertyTypes);
