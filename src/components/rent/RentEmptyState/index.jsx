import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Home, Search, Filter, X } from 'lucide-react';
import Button from '@/components/ui/Button';

const RentEmptyState = ({
  title = 'No Rental Properties Found',
  description = 'Try adjusting your filters or search criteria to find available rental properties.',
  onResetFilters,
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 sm:py-16 text-center',
        className
      )}
      {...props}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center">
          <Home className="w-10 h-10 text-navy-300" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center">
          <Search className="w-4 h-4 text-gold-500" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-navy-800 mt-6">
        {title}
      </h3>

      <p className="text-navy-500 max-w-sm mt-2">{description}</p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {onResetFilters && (
          <Button variant="luxury" size="md" onClick={onResetFilters} className="min-w-[140px]">
            <Filter className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        )}

        <Link to="/rent">
          <Button variant="outline" size="md" className="min-w-[140px]">
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-navy-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          Try removing price filters
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          Expand your search area
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          Check availability dates
        </span>
      </div>
    </div>
  );
};

export default RentEmptyState;
