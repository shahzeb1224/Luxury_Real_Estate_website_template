import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import SearchFilters from '../SearchFilters';

const AdvancedSearch = React.forwardRef(
  (
    {
      // State
      isOpen = false,
      filters,
      onFilterChange,
      onApply,
      onReset,
      // Labels
      triggerLabel = 'Advanced Search',
      applyLabel = 'Apply Filters',
      resetLabel = 'Reset All',
      // Variants
      variant = 'default',
      // Styling
      className = '',
      triggerClassName = '',
      contentClassName = '',
      // Accessibility
      ariaLabel = 'Advanced property search',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(isOpen);

    const toggleOpen = () => setOpen(!open);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Trigger Button */}
        <button
          onClick={toggleOpen}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'text-sm font-medium text-navy-600 hover:text-navy-800',
            'hover:bg-navy-50 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-navy-500',
            triggerClassName
          )}
          aria-expanded={open}
          aria-controls="advanced-search-content"
          aria-label={ariaLabel}
        >
          <Filter className="w-4 h-4" />
          <span>{triggerLabel}</span>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {/* Active filter count badge */}
          {filters && Object.values(filters).some((v) => v && v.length > 0) && (
            <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-gold-500 text-white rounded-full">
              {
                Object.values(filters).filter(
                  (v) => v && (typeof v === 'string' ? v !== 'any' : v.length > 0)
                ).length
              }
            </span>
          )}
        </button>

        {/* Content */}
        <div
          id="advanced-search-content"
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            open ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          )}
        >
          <div
            className={cn(
              'rounded-2xl p-4 sm:p-6 bg-white border border-navy-100 shadow-premium',
              contentClassName
            )}
          >
            <SearchFilters
              filters={filters}
              onFilterChange={onFilterChange}
              onApply={onApply}
              onReset={onReset}
              applyLabel={applyLabel}
              resetLabel={resetLabel}
              variant="default"
              className="shadow-none border-0 p-0"
            />
          </div>
        </div>
      </div>
    );
  }
);

AdvancedSearch.displayName = 'AdvancedSearch';

export default React.memo(AdvancedSearch);
