import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Grid3x3, List, ArrowUpDown, ChevronDown } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/shared/Skeleton';
import EmptyState from '@/components/shared/EmptyState';
import Pagination from '@/components/ui/Pagination';
import PropertyCard from '@/components/property/PropertyCard';
const SearchResults = React.forwardRef(
  (
    {
      // Data
      properties = [],
      totalResults = 0,
      loading = false,
      // View
      view = 'grid',
      onViewChange,
      // Sorting
      sortBy = 'relevance',
      onSortChange,
      // Pagination
      currentPage = 1,
      totalPages = 1,
      onPageChange,
      perPage = 12,
      onPerPageChange,
      // Labels
      emptyTitle = 'No properties found',
      emptyDescription = "Try adjusting your search or filters to find what you're looking for.",
      // Styling
      className = '',
      gridClassName = '',
      // Accessibility
      ariaLabel = 'Search results',
      ...props
    },
    ref
  ) => {
    const [viewMode, setViewMode] = useState(view);
    const [sortMode, setSortMode] = useState(sortBy);

    const handleViewChange = (mode) => {
      setViewMode(mode);
      if (onViewChange) onViewChange(mode);
    };

    const handleSortChange = (value) => {
      setSortMode(value);
      if (onSortChange) onSortChange(value);
    };

    const gridClasses =
      viewMode === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        : 'flex flex-col gap-4';

    const sortOptions = [
      { value: 'relevance', label: 'Relevance' },
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'newest', label: 'Newest First' },
      { value: 'oldest', label: 'Oldest First' },
      { value: 'beds', label: 'Most Beds' },
      { value: 'baths', label: 'Most Baths' },
    ];

    const perPageOptions = [12, 24, 48, 96];

    return (
      <div ref={ref} className={cn('w-full', className)} aria-label={ariaLabel} {...props}>
        {/* Results Header */}
        {!loading && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-navy-800">
                {totalResults > 0 ? (
                  <>
                    <span className="font-playfair font-bold text-2xl text-gold-500">
                      {formatNumber(totalResults)}
                    </span>{' '}
                    properties found
                  </>
                ) : (
                  'No properties found'
                )}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-navy-400 hidden sm:block" />
                <select
                  value={sortMode}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 bg-white border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                  aria-label="Sort results"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-navy-50 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange('grid')}
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
                  onClick={() => handleViewChange('list')}
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
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={gridClasses}>
            {Array.from({ length: perPage }).map((_, index) => (
              <Skeleton.PropertyCard key={index} />
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!loading && properties.length > 0 && (
          <>
            <div className={cn(gridClasses, gridClassName)}>
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={viewMode === 'list' ? 'horizontal' : 'grid'}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  className="flex-1"
                />

                {/* Per Page */}
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <span>Show</span>
                  <select
                    value={perPage}
                    onChange={(e) => onPerPageChange?.(Number(e.target.value))}
                    className="px-2 py-1 bg-white border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    aria-label="Results per page"
                  >
                    {perPageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span>per page</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <EmptyState
            icon="search"
            title={emptyTitle}
            description={emptyDescription}
            action="Adjust Filters"
            actionVariant="primary"
            actionHref="#"
            className="mt-8"
          />
        )}
      </div>
    );
  }
);

SearchResults.displayName = 'SearchResults';

export default React.memo(SearchResults);
