import React from 'react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { cardVariants } from '@/animations/framer';
import PropertyCard from '@/components/property/PropertyCard';
import RentEmptyState from '../RentEmptyState';

const RentListingGrid = ({
  properties = [],
  loading = false,
  viewMode = 'grid',
  favorites = [],
  onFavoriteToggle,
  compareList = [],
  onCompareToggle,
  className = '',
  ...props
}) => {
  const gridClasses =
    viewMode === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'
      : 'flex flex-col gap-4';

  if (loading) {
    return (
      <div className={cn(gridClasses, className)}>
        {Array.from({ length: 6 }).map((_, index) => (
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
    );
  }

  if (properties.length === 0) {
    return <RentEmptyState />;
  }

  return (
    <motion.div
      variants={cardVariants.grid.container}
      initial="initial"
      animate="animate"
      className={cn(gridClasses, className)}
      {...props}
    >
      <AnimatePresence mode="wait">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            variants={cardVariants.grid.item}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <PropertyCard
              property={property}
              variant={viewMode === 'grid' ? 'grid' : 'list'}
              size="md"
              isFavorite={favorites.includes(property.id)}
              onFavoriteToggle={onFavoriteToggle}
              onContact={() => {}}
              showAgent={false}
              showActions={true}
              className="h-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default RentListingGrid;
