import React from 'react';
import { cn } from '@/utils/cn';
import { SlidersHorizontal, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Toggle from '@/components/ui/Toggle';

const SearchFilters = React.forwardRef(
  (
    {
      // Filters state
      filters,
      onFilterChange,
      // Variants
      variant = 'default',
      // Actions
      onApply,
      onReset,
      onClose,
      // Labels
      applyLabel = 'Apply Filters',
      resetLabel = 'Reset All',
      // Styling
      className = '',
      // Accessibility
      ariaLabel = 'Property filters',
      ...props
    },
    ref
  ) => {
    const handleChange = (key, value) => {
      if (onFilterChange) {
        onFilterChange({ ...filters, [key]: value });
      }
    };

    const handleRangeChange = (key, minKey, maxKey, minVal, maxVal) => {
      if (onFilterChange) {
        onFilterChange({
          ...filters,
          [minKey]: minVal,
          [maxKey]: maxVal,
        });
      }
    };

    const handleCheckboxChange = (key, value) => {
      const current = filters[key] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      handleChange(key, updated);
    };

    const isCheckboxChecked = (key, value) => {
      return (filters[key] || []).includes(value);
    };

    const filterSections = [
      {
        id: 'transaction',
        label: 'Transaction Type',
        type: 'select',
        key: 'transactionType',
        options: [
          { value: 'buy', label: 'Buy' },
          { value: 'rent', label: 'Rent' },
          { value: 'commercial', label: 'Commercial' },
          { value: 'investment', label: 'Investment' },
        ],
      },
      {
        id: 'property-type',
        label: 'Property Type',
        type: 'select',
        key: 'propertyType',
        options: [
          { value: 'house', label: 'House' },
          { value: 'villa', label: 'Villa' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'penthouse', label: 'Penthouse' },
          { value: 'commercial', label: 'Commercial' },
          { value: 'plot', label: 'Plot' },
          { value: 'warehouse', label: 'Warehouse' },
        ],
      },
      {
        id: 'price',
        label: 'Price Range',
        type: 'range',
        key: 'price',
        minKey: 'priceMin',
        maxKey: 'priceMax',
        minPlaceholder: 'Min',
        maxPlaceholder: 'Max',
        prefix: '$',
        minValue: filters?.priceMin,
        maxValue: filters?.priceMax,
      },
      {
        id: 'area',
        label: 'Area (sqft)',
        type: 'range',
        key: 'area',
        minKey: 'areaMin',
        maxKey: 'areaMax',
        minPlaceholder: 'Min sqft',
        maxPlaceholder: 'Max sqft',
        minValue: filters?.areaMin,
        maxValue: filters?.areaMax,
      },
      {
        id: 'bedrooms',
        label: 'Bedrooms',
        type: 'select',
        key: 'bedrooms',
        options: [
          { value: 'any', label: 'Any' },
          { value: '1', label: '1+' },
          { value: '2', label: '2+' },
          { value: '3', label: '3+' },
          { value: '4', label: '4+' },
          { value: '5', label: '5+' },
        ],
      },
      {
        id: 'bathrooms',
        label: 'Bathrooms',
        type: 'select',
        key: 'bathrooms',
        options: [
          { value: 'any', label: 'Any' },
          { value: '1', label: '1+' },
          { value: '2', label: '2+' },
          { value: '3', label: '3+' },
          { value: '4', label: '4+' },
        ],
      },
      {
        id: 'features',
        label: 'Features',
        type: 'checkbox',
        key: 'features',
        options: [
          { value: 'pool', label: 'Swimming Pool' },
          { value: 'garden', label: 'Garden' },
          { value: 'garage', label: 'Garage' },
          { value: 'waterfront', label: 'Waterfront' },
          { value: 'smart-home', label: 'Smart Home' },
          { value: 'elevator', label: 'Elevator' },
          { value: 'gym', label: 'Gym' },
          { value: 'security', label: 'Security System' },
          { value: 'furnished', label: 'Furnished' },
          { value: 'parking', label: 'Parking' },
        ],
      },
      {
        id: 'additional',
        label: 'Additional Options',
        type: 'toggle',
        key: 'additional',
        options: [
          { value: 'furnished', label: 'Furnished' },
          { value: 'new-construction', label: 'New Construction' },
          { value: 'ready-to-move', label: 'Ready to Move' },
          { value: 'investment', label: 'Investment Property' },
        ],
      },
    ];

    const variantClasses = {
      default: 'bg-white',
      glass: 'bg-glass-white backdrop-blur-sm',
      dark: 'bg-navy-800 text-white',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-2xl p-4 sm:p-6 shadow-premium', variantClasses[variant], className)}
        role="form"
        aria-label={ariaLabel}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-navy-500" />
            <h3 className="text-lg font-semibold text-navy-800">Filters</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-navy-50 transition-colors"
              aria-label="Close filters"
            >
              <X className="w-4 h-4 text-navy-500" />
            </button>
          )}
        </div>

        {/* Filter Sections */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {filterSections.map((section) => (
            <div key={section.id} className="space-y-2">
              <label className="text-sm font-medium text-navy-700">{section.label}</label>

              {/* Select Filter */}
              {section.type === 'select' && (
                <Select
                  value={filters[section.key] || 'any'}
                  onChange={(e) => handleChange(section.key, e.target.value)}
                  options={section.options}
                  size="sm"
                  className="w-full"
                />
              )}

              {/* Range Filter */}
              {section.type === 'range' && (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={section.minPlaceholder}
                    value={section.minValue}
                    onChange={(e) =>
                      handleRangeChange(
                        section.key,
                        section.minKey,
                        section.maxKey,
                        Number(e.target.value),
                        filters[section.maxKey]
                      )
                    }
                    size="sm"
                    prefix={section.prefix}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder={section.maxPlaceholder}
                    value={section.maxValue}
                    onChange={(e) =>
                      handleRangeChange(
                        section.key,
                        section.minKey,
                        section.maxKey,
                        filters[section.minKey],
                        Number(e.target.value)
                      )
                    }
                    size="sm"
                    prefix={section.prefix}
                    className="flex-1"
                  />
                </div>
              )}

              {/* Checkbox Filter */}
              {section.type === 'checkbox' && (
                <div className="grid grid-cols-2 gap-2">
                  {section.options.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={isCheckboxChecked(section.key, option.value)}
                      onChange={() => handleCheckboxChange(section.key, option.value)}
                      size="sm"
                    />
                  ))}
                </div>
              )}

              {/* Toggle Filter */}
              {section.type === 'toggle' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.options.map((option) => (
                    <Toggle
                      key={option.value}
                      label={option.label}
                      checked={filters[option.value] || false}
                      onChange={(e) => handleChange(option.value, e.target.checked)}
                      size="sm"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-navy-200 flex flex-col sm:flex-row gap-3">
          <Button variant="luxury" size="md" onClick={onApply} className="flex-1">
            {applyLabel}
          </Button>
          <Button variant="ghost" size="md" onClick={onReset} className="flex-1">
            {resetLabel}
          </Button>
        </div>
      </div>
    );
  }
);

SearchFilters.displayName = 'SearchFilters';

export default React.memo(SearchFilters);
