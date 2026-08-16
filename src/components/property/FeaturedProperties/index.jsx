import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, Grid3x3 } from 'lucide-react';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import PropertyCard from '../PropertyCard';
import PropertyCarousel from '../PropertyCarousel';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';

const FeaturedProperties = React.forwardRef(
  (
    {
      properties = [],
      loading = false,
      title = 'Featured Properties',
      subtitle = 'Discover our handpicked selection of premium properties',
      viewAllLink = '/buy',
      columns = 3,
      showCarousel = true,
      showTabs = true,
      tabs = [
        { value: 'all', label: 'All' },
        { value: 'buy', label: 'For Sale' },
        { value: 'rent', label: 'For Rent' },
        { value: 'luxury', label: 'Luxury' },
      ],
      activeTab = 'all',
      onTabChange,
      className = '',
      ...props
    },
    ref
  ) => {
    const [viewMode, setViewMode] = useState('grid');

    const handleTabChange = (index) => {
      const tab = tabs[index];
      if (onTabChange) {
        onTabChange(tab.value);
      }
    };

    const handleViewAll = () => {
      // Navigate to view all properties
    };

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const filteredProperties = properties.filter((property) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'buy') return property.purpose === 'sale';
      if (activeTab === 'rent') return property.purpose === 'rent';
      if (activeTab === 'luxury') return property.featured || property.price > 5000000;
      return true;
    });

    const displayProperties = filteredProperties.slice(0, columns * 2);

    // Generate tabs content
    const tabContent = tabs.map((tab) => ({
      label: tab.label,
      content: null, // Content will be rendered separately
    }));

    return (
      <Section
        ref={ref}
        id="featured-properties"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-8">
          {/* Header with Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeader
              title={title}
              subtitle={subtitle}
              align="left"
              size="md"
              className="flex-1"
            />

            <div className="flex items-center gap-3 flex-wrap">
              {showTabs && tabs.length > 1 && (
                <div className="flex bg-navy-50 rounded-lg p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => handleTabChange(tabs.indexOf(tab))}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                        activeTab === tab.value
                          ? 'bg-white text-navy-800 shadow-sm'
                          : 'text-navy-500 hover:text-navy-700'
                      )}
                      aria-pressed={activeTab === tab.value}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {viewAllLink && (
                <Link
                  to={viewAllLink}
                  className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors group"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Property Grid/Carousel */}
          {loading ? (
            <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
              {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                  <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                    <div className="h-4 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                    <div className="h-5 bg-navy-100 rounded w-1/3" />
                    <div className="flex gap-2">
                      <div className="h-3 bg-navy-100 rounded w-12" />
                      <div className="h-3 bg-navy-100 rounded w-12" />
                      <div className="h-3 bg-navy-100 rounded w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayProperties.length > 0 ? (
            showCarousel && displayProperties.length > columns ? (
              <PropertyCarousel
                properties={displayProperties}
                columns={columns}
                autoplay={true}
                autoplayInterval={5000}
                showArrows={true}
                showDots={true}
                className="mt-4"
              />
            ) : (
              <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
                {displayProperties.map((property) => (
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
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-navy-500">No properties found</p>
            </div>
          )}

          {/* Load More (if more properties exist) */}
          {!loading && filteredProperties.length > displayProperties.length && (
            <div className="text-center mt-6">
              <Button variant="outline" size="md" onClick={() => {}} className="min-w-[200px]">
                Load More Properties
              </Button>
            </div>
          )}
        </div>
      </Section>
    );
  }
);

FeaturedProperties.displayName = 'FeaturedProperties';

export default React.memo(FeaturedProperties);
