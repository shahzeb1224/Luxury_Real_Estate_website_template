import React from 'react';
import { cn } from '@/utils/cn';
import {
  Home,
  Building2,
  Briefcase,
  Crown,
  TrendingUp,
  Calculator,
  FileText,
  Users,
  HelpCircle,
} from 'lucide-react';

const iconMap = {
  Home,
  Building2,
  Briefcase,
  Crown,
  TrendingUp,
  Calculator,
  FileText,
  Users,
  HelpCircle,
};

const FAQCategories = React.forwardRef(
  (
    {
      categories = [],
      activeCategory = 'all',
      onCategoryChange,
      loading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const handleCategoryClick = (categoryId) => {
      if (onCategoryChange) {
        onCategoryChange(categoryId);
      }
    };

    if (loading) {
      return (
        <div className={cn('flex flex-wrap gap-2 justify-center', className)}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-10 w-24 bg-navy-100 rounded-full" />
            </div>
          ))}
        </div>
      );
    }

    // Get icon component
    const getIcon = (iconName) => {
      const Icon = iconMap[iconName] || HelpCircle;
      return <Icon className="w-4 h-4" />;
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center justify-center gap-2', className)}
        role="tablist"
        aria-label="FAQ categories"
        {...props}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = iconMap[category.icon] || HelpCircle;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-navy-500',
                isActive
                  ? 'bg-navy-800 text-white shadow-premium-sm'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`category-panel-${category.id}`}
              id={`category-tab-${category.id}`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              {category.count !== undefined && (
                <span
                  className={cn('text-xs ml-0.5', isActive ? 'text-navy-300' : 'text-navy-400')}
                >
                  ({category.count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

FAQCategories.displayName = 'FAQCategories';

export default React.memo(FAQCategories);
