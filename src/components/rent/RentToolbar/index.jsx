import React from 'react';
import { cn } from '@/utils/cn';
import { Grid3x3, List, Map as MapIcon, Filter, ChevronDown } from 'lucide-react';
import { RENT_SORT_OPTIONS } from '../rent.constants';

const RentToolbar = ({
  totalResults = 0,
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'relevance',
  onSortChange,
  showFilters = false,
  onToggleFilters,
  activeFiltersCount = 0,
  className = '',
  ...props
}) => {
  const getSortLabel = (value) => {
    const labels = {
      relevance: 'Relevance',
      'price-asc': 'Price: Low to High',
      'price-desc': 'Price: High to Low',
      newest: 'Newest Available',
      oldest: 'Oldest Available',
      beds: 'Most Beds',
      baths: 'Most Baths',
      area: 'Largest Area',
    };
    return labels[value] || value;
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl shadow-sm',
        className
      )}
      {...props}
    >
      {/* Results Count */}
      <div className="flex items-center gap-3 text-sm text-navy-500">
        <span>{totalResults.toLocaleString()} rental properties available</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none px-3 py-2 pr-8 bg-navy-50 border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 cursor-pointer"
            aria-label="Sort rental properties"
          >
            {RENT_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-navy-50 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              viewMode === 'grid'
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-navy-400 hover:text-navy-600'
            )}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              viewMode === 'list'
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-navy-400 hover:text-navy-600'
            )}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Button */}
        <button
          onClick={onToggleFilters}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            showFilters || activeFiltersCount > 0
              ? 'bg-navy-800 text-white'
              : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
          )}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RentToolbar;
