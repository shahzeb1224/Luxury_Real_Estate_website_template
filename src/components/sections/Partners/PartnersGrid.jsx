import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import PartnerCard from './PartnerCard';

const PartnersGrid = React.forwardRef(
  ({ partners = [], columns = 6, showCategories = true, className = '', ...props }, ref) => {
    const [activeCategory, setActiveCategory] = useState('all');

    // Extract unique categories
    const categories = ['all', ...new Set(partners.map((p) => p.category).filter(Boolean))];

    const categoryLabels = {
      all: 'All Partners',
      developer: 'Developers',
      bank: 'Banks',
      mortgage: 'Mortgage',
      investment: 'Investment',
      architecture: 'Architecture',
      design: 'Design',
      legal: 'Legal',
      construction: 'Construction',
      insurance: 'Insurance',
    };

    const filteredPartners =
      activeCategory === 'all' ? partners : partners.filter((p) => p.category === activeCategory);

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
      5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
      6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    };

    const hasFeatured = partners.some((p) => p.featured);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Category Filter */}
        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category
                    ? 'bg-navy-800 text-white shadow-premium-sm'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
                aria-pressed={activeCategory === category}
              >
                {categoryLabels[category] || category}
              </button>
            ))}
          </div>
        )}

        {/* Partners Grid */}
        {filteredPartners.length > 0 ? (
          <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
            {filteredPartners.map((partner) => (
              <PartnerCard
                key={partner.id}
                {...partner}
                featured={partner.featured && hasFeatured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-navy-500">No partners found in this category.</div>
        )}
      </div>
    );
  }
);

PartnersGrid.displayName = 'PartnersGrid';

export default React.memo(PartnersGrid);
