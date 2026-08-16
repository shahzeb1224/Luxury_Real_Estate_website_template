import React from 'react';
import { cn } from '@/utils/cn';
import { SlidersHorizontal, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Toggle from '@/components/ui/Toggle';

const SearchFilters = ({
  filters = {},
  onFilterChange,
  onApply,
  onReset,
  onClose,
  variant = 'default',
  className = '',
}) => {
  const handleChange = (key, value) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  const handleFeatureToggle = (feature) => {
    const current = filters.features || [];
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    handleChange('features', updated);
  };

  const isFeatureChecked = (feature) => {
    return (filters.features || []).includes(feature);
  };

  const filterSections = [
    {
      id: 'transaction',
      label: 'Transaction Type',
      type: 'select',
      key: 'transactionType',
      options: [
        { value: 'all', label: 'All Transactions' },
        { value: 'buy', label: 'For Sale' },
        { value: 'rent', label: 'For Rent' },
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
        { value: 'all', label: 'All Types' },
        { value: 'house', label: 'House' },
        { value: 'villa', label: 'Villa' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'penthouse', label: 'Penthouse' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'plot', label: 'Plot' },
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
        { value: 'garage', label: 'Garage' },
        { value: 'garden', label: 'Garden' },
        { value: 'waterfront', label: 'Waterfront' },
        { value: 'furnished', label: 'Furnished' },
        { value: 'petFriendly', label: 'Pet Friendly' },
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
      className={cn('rounded-2xl p-4 sm:p-6 shadow-premium', variantClasses[variant], className)}
      role="form"
      aria-label="Property filters"
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

            {section.type === 'select' && (
              <Select
                value={filters[section.key] || 'all'}
                onChange={(e) => handleChange(section.key, e.target.value)}
                options={section.options}
                size="sm"
                className="w-full"
              />
            )}

            {section.type === 'range' && (
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={section.minPlaceholder}
                  value={filters[section.minKey] || ''}
                  onChange={(e) => handleChange(section.minKey, e.target.value)}
                  size="sm"
                  prefix={section.prefix}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder={section.maxPlaceholder}
                  value={filters[section.maxKey] || ''}
                  onChange={(e) => handleChange(section.maxKey, e.target.value)}
                  size="sm"
                  prefix={section.prefix}
                  className="flex-1"
                />
              </div>
            )}

            {section.type === 'checkbox' && (
              <div className="grid grid-cols-2 gap-2">
                {section.options.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={isFeatureChecked(option.value)}
                    onChange={() => handleFeatureToggle(option.value)}
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Additional Toggles */}
        <div className="space-y-2">
          <label htmlFor="furnished" className="text-sm font-medium text-navy-700">
            Additional Options
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Toggle
              label="Furnished"
              checked={filters.furnished || false}
              onChange={(e) => handleChange('furnished', e.target.checked)}
              size="sm"
            />
            <Toggle
              label="Pet Friendly"
              checked={filters.petFriendly || false}
              onChange={(e) => handleChange('petFriendly', e.target.checked)}
              size="sm"
            />
            <Toggle
              label="Pool"
              checked={filters.pool || false}
              onChange={(e) => handleChange('pool', e.target.checked)}
              size="sm"
            />
            <Toggle
              label="Garage"
              checked={filters.garage || false}
              onChange={(e) => handleChange('garage', e.target.checked)}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-navy-200 flex flex-col sm:flex-row gap-3">
        <Button variant="luxury" size="md" onClick={onApply} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="ghost" size="md" onClick={onReset} className="flex-1">
          Reset All
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
