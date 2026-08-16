import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
  ...props
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen.length > 0 ? defaultOpen : []);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);

        return (
          <div key={index} className="border border-navy-200 rounded-lg overflow-hidden">
            {/* Header */}
            <button
              className={cn(
                'w-full px-4 py-3 text-left flex items-center justify-between',
                'font-medium text-navy-800 transition-colors duration-200',
                'hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-navy-500',
                isOpen && 'bg-navy-50'
              )}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-navy-400 transition-transform duration-200 flex-shrink-0 ml-4',
                  isOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Content */}
            <div
              id={`accordion-content-${index}`}
              role="region"
              aria-labelledby={`accordion-header-${index}`}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-screen' : 'max-h-0'
              )}
            >
              <div className="px-4 py-3 text-navy-600 border-t border-navy-200">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
