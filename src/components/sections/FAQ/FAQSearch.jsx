import React from 'react';
import { cn } from '@/utils/cn';
import { Search, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import { debounce } from '@/utils/debounce';

const FAQSearch = React.forwardRef(
  (
    {
      value = '',
      onChange,
      onClear,
      loading = false,
      placeholder = 'Search for answers...',
      className = '',
      ...props
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <div ref={ref} className={cn('max-w-2xl mx-auto w-full', className)} {...props}>
        <div className="relative">
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={loading}
            size="lg"
            className="pl-12 pr-12"
            leftIcon={<Search className="w-5 h-5" />}
            aria-label="Search frequently asked questions"
          />
          {value && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-navy-100 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-navy-400" />
            </button>
          )}
        </div>

        {value && (
          <p className="text-sm text-navy-500 mt-2 text-center">Showing results for &quot;{value}&quot;</p>
        )}
      </div>
    );
  }
);

FAQSearch.displayName = 'FAQSearch';

export default React.memo(FAQSearch);
