import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { X, Filter, SlidersHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';
import Drawer from '@/components/ui/Drawer';
import SearchFilters from '../SearchFilters';

const FilterSidebar = React.forwardRef(
  (
    {
      // State
      isOpen = false,
      filters,
      onFilterChange,
      onApply,
      onReset,
      onClose,
      // Labels
      title = 'Filters',
      applyLabel = 'Apply Filters',
      resetLabel = 'Reset All',
      // Variants
      variant = 'default',
      // Responsive
      desktopBreakpoint = 'lg',
      // Styling
      className = '',
      // Accessibility
      ariaLabel = 'Filter sidebar',
      ...props
    },
    ref
  ) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleMobileOpen = () => setMobileOpen(true);
    const handleMobileClose = () => {
      setMobileOpen(false);
      if (onClose) onClose();
    };

    const handleApply = () => {
      if (onApply) onApply();
      handleMobileClose();
    };

    const handleReset = () => {
      if (onReset) onReset();
    };

    // Desktop sidebar
    const DesktopSidebar = () => (
      <aside
        ref={ref}
        className={cn(
          'hidden',
          `${desktopBreakpoint}:block`,
          'w-72 flex-shrink-0 h-full overflow-y-auto',
          'bg-white border-r border-navy-100 p-4',
          className
        )}
        aria-label={ariaLabel}
        {...props}
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-navy-500" />
            <h3 className="text-lg font-semibold text-navy-800">{title}</h3>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-navy-500 hover:text-navy-700 transition-colors"
          >
            Reset
          </button>
        </div>

        <SearchFilters
          filters={filters}
          onFilterChange={onFilterChange}
          onApply={handleApply}
          onReset={handleReset}
          applyLabel={applyLabel}
          resetLabel={resetLabel}
          variant="default"
          className="shadow-none border-0 p-0"
        />
      </aside>
    );

    // Mobile trigger button
    const MobileTrigger = () => (
      <button
        onClick={handleMobileOpen}
        className={cn(
          `${desktopBreakpoint}:hidden`,
          'fixed bottom-6 right-6 z-sticky',
          'flex items-center gap-2 px-4 py-3',
          'bg-navy-800 text-white rounded-full',
          'shadow-premium-lg hover:bg-navy-700',
          'transition-all duration-200 hover:scale-105',
          'focus:outline-none focus:ring-2 focus:ring-navy-500'
        )}
        aria-label="Open filters"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
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
    );

    // Mobile drawer
    const MobileDrawer = () => (
      <Drawer
        isOpen={mobileOpen}
        onClose={handleMobileClose}
        position="right"
        size="lg"
        title={title}
        className="p-4"
      >
        <div className="h-full overflow-y-auto pb-20">
          <SearchFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            applyLabel={applyLabel}
            resetLabel={resetLabel}
            variant="default"
            className="shadow-none border-0 p-0"
          />
        </div>
      </Drawer>
    );

    return (
      <>
        <DesktopSidebar />
        <MobileTrigger />
        <MobileDrawer />
      </>
    );
  }
);

FilterSidebar.displayName = 'FilterSidebar';

export default React.memo(FilterSidebar);
