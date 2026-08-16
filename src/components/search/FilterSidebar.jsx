import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';

const FilterSidebar = ({
  filters = {},
  onFilterChange,
  onApply,
  onReset,
  isOpen = true,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    area: true,
    features: true,
    additional: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

  const SectionHeader = ({ title, section, children }) => {
    const isExpanded = expandedSections[section];
    return (
      <div className="border-b border-navy-100 pb-3">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between text-left py-2"
        >
          <span className="font-medium text-navy-700">{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-navy-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-navy-400" />
          )}
        </button>
        {isExpanded && <div className="mt-2 space-y-3">{children}</div>}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'bg-white rounded-2xl p-4 sm:p-6 shadow-premium',
        isOpen ? 'block' : 'hidden',
        className
      )}
      aria-label="Property filters"
    >
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-navy-500" />
          <h3 className="font-semibold text-navy-800">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-navy-500 hover:text-navy-700 transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-4">
        {/* Transaction Type */}
        <SectionHeader title="Transaction Type" section="transaction">
          <div className="flex flex-wrap gap-2">
            {['all', 'buy', 'rent', 'commercial', 'investment'].map((type) => (
              <button
                key={type}
                onClick={() => handleChange('transactionType', type)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  filters.transactionType === type
                    ? 'bg-navy-800 text-white'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </SectionHeader>

        {/* Property Type */}
        <SectionHeader title="Property Type" section="property">
          <Select
            value={filters.propertyType || 'all'}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'house', label: 'House' },
              { value: 'villa', label: 'Villa' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'penthouse', label: 'Penthouse' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'plot', label: 'Plot' },
            ]}
            size="sm"
          />
        </SectionHeader>

        {/* Price Range */}
        <SectionHeader title="Price Range" section="price">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ''}
              onChange={(e) => handleChange('priceMin', e.target.value)}
              size="sm"
              prefix="$"
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceMax || ''}
              onChange={(e) => handleChange('priceMax', e.target.value)}
              size="sm"
              prefix="$"
              className="flex-1"
            />
          </div>
        </SectionHeader>

        {/* Area Range */}
        <SectionHeader title="Area (sqft)" section="area">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.areaMin || ''}
              onChange={(e) => handleChange('areaMin', e.target.value)}
              size="sm"
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.areaMax || ''}
              onChange={(e) => handleChange('areaMax', e.target.value)}
              size="sm"
              className="flex-1"
            />
          </div>
        </SectionHeader>

        {/* Bedrooms & Bathrooms */}
        <SectionHeader title="Rooms" section="rooms">
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={filters.bedrooms || 'any'}
              onChange={(e) => handleChange('bedrooms', e.target.value)}
              options={[
                { value: 'any', label: 'Beds: Any' },
                { value: '1', label: '1+' },
                { value: '2', label: '2+' },
                { value: '3', label: '3+' },
                { value: '4', label: '4+' },
                { value: '5', label: '5+' },
              ]}
              size="sm"
            />
            <Select
              value={filters.bathrooms || 'any'}
              onChange={(e) => handleChange('bathrooms', e.target.value)}
              options={[
                { value: 'any', label: 'Baths: Any' },
                { value: '1', label: '1+' },
                { value: '2', label: '2+' },
                { value: '3', label: '3+' },
                { value: '4', label: '4+' },
              ]}
              size="sm"
            />
          </div>
        </SectionHeader>

        {/* Features */}
        <SectionHeader title="Features" section="features">
          <div className="grid grid-cols-2 gap-1">
            {['pool', 'garage', 'garden', 'waterfront', 'furnished', 'petFriendly'].map(
              (feature) => (
                <Checkbox
                  key={feature}
                  label={feature.charAt(0).toUpperCase() + feature.slice(1)}
                  checked={isFeatureChecked(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  size="sm"
                />
              )
            )}
          </div>
        </SectionHeader>

        {/* Additional Options */}
        <SectionHeader title="Additional" section="additional">
          <div className="space-y-2">
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
        </SectionHeader>

        {/* Status */}
        <SectionHeader title="Status" section="status">
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'pending', 'sold'].map((status) => (
              <button
                key={status}
                onClick={() => handleChange('status', status)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  filters.status === status
                    ? 'bg-navy-800 text-white'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </SectionHeader>

        {/* Apply Button */}
        <div className="pt-4 border-t border-navy-100">
          <Button variant="luxury" size="md" onClick={onApply} fullWidth>
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
