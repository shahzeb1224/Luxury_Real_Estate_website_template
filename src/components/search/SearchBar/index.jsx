import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Search, X, MapPin, Home, Building2, Wallet, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const SearchBar = React.forwardRef(
  (
    {
      // Variants
      variant = 'default',
      size = 'md',
      // State
      loading = false,
      disabled = false,
      // Values
      location,
      propertyType,
      priceRange,
      onLocationChange,
      onPropertyTypeChange,
      onPriceRangeChange,
      onSearch,
      // Suggestions
      suggestions = [],
      recentSearches = [],
      // Placeholders
      locationPlaceholder = 'Search location...',
      propertyTypePlaceholder = 'Property type',
      pricePlaceholder = 'Price range',
      // Styling
      className = '',
      inputClassName = '',
      buttonClassName = '',
      // Accessibility
      ariaLabel = 'Search properties',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchValue, setSearchValue] = useState(location || '');
    const containerRef = useRef(null);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    const debouncedSearch = useCallback(
      (value) => {
        if (onLocationChange) {
          onLocationChange(value);
        }
      },
      [onLocationChange]
    );

    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSearch(value);
      setShowSuggestions(value.length > 1);
    };

    const handleSuggestionClick = (suggestion) => {
      setSearchValue(suggestion);
      setShowSuggestions(false);
      if (onLocationChange) {
        onLocationChange(suggestion);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (onSearch) {
        onSearch({ location: searchValue, propertyType, priceRange });
      }
    };

    const handleClear = () => {
      setSearchValue('');
      if (onLocationChange) {
        onLocationChange('');
      }
      setShowSuggestions(false);
    };

    const variantClasses = {
      default: 'bg-white border border-navy-200 shadow-premium',
      glass: 'bg-glass-white backdrop-blur-sm border border-white/20 shadow-premium',
      elevated: 'bg-white shadow-premium-lg border-0',
    };

    const sizeClasses = {
      sm: 'p-2 gap-2',
      md: 'p-3 gap-3',
      lg: 'p-4 gap-4',
    };

    const inputSizeClasses = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-13 text-lg',
    };

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        className={cn(
          'relative w-full rounded-2xl',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Location Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchValue.length > 1) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder={locationPlaceholder}
                disabled={disabled}
                className={cn(
                  'w-full pl-9 pr-10 rounded-lg border border-navy-200',
                  'bg-transparent focus:outline-none focus:ring-2 focus:ring-navy-500',
                  'placeholder:text-navy-400 transition-all duration-200',
                  inputSizeClasses[size],
                  inputClassName
                )}
                aria-label="Location"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-navy-100 transition-colors"
                  aria-label="Clear location"
                >
                  <X className="w-3.5 h-3.5 text-navy-400" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {(showSuggestions || isFocused) &&
              (suggestions.length > 0 || recentSearches.length > 0) && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-premium-lg border border-navy-100 overflow-hidden z-dropdown animate-fade-in">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-2">
                      <p className="px-3 py-1 text-xs font-medium text-navy-400 uppercase tracking-wider">
                        Recent Searches
                      </p>
                      {recentSearches.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="w-full px-3 py-2 text-left text-sm text-navy-600 hover:bg-navy-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Clock className="w-3.5 h-3.5 text-navy-400" />
                          {item}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="p-2 border-t border-navy-100">
                      <p className="px-3 py-1 text-xs font-medium text-navy-400 uppercase tracking-wider">
                        Suggestions
                      </p>
                      {suggestions.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="w-full px-3 py-2 text-left text-sm text-navy-600 hover:bg-navy-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <MapPin className="w-3.5 h-3.5 text-navy-400" />
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Property Type Select */}
          <div className="sm:w-44">
            <Select
              value={propertyType}
              onChange={onPropertyTypeChange}
              placeholder={propertyTypePlaceholder}
              disabled={disabled}
              size={size}
              className="w-full"
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'house', label: 'House' },
                { value: 'villa', label: 'Villa' },
                { value: 'apartment', label: 'Apartment' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'plot', label: 'Plot' },
              ]}
            />
          </div>

          {/* Price Range Select */}
          <div className="sm:w-44">
            <Select
              value={priceRange}
              onChange={onPriceRangeChange}
              placeholder={pricePlaceholder}
              disabled={disabled}
              size={size}
              className="w-full"
              options={[
                { value: 'all', label: 'All Prices' },
                { value: '0-500k', label: 'Under $500K' },
                { value: '500k-1m', label: '$500K - $1M' },
                { value: '1m-2m', label: '$1M - $2M' },
                { value: '2m-5m', label: '$2M - $5M' },
                { value: '5m+', label: '$5M+' },
              ]}
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            variant="luxury"
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
            loading={loading}
            disabled={disabled}
            className={cn('sm:w-auto min-w-[120px]', buttonClassName)}
            aria-label="Search properties"
          >
            <Search className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </form>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default React.memo(SearchBar);
