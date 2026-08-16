import React, { useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';

const FAQAccordion = React.forwardRef(
  (
    {
      items = [],
      openItems = [],
      onToggle,
      loading = false,
      searchQuery = '',
      activeCategory = 'all',
      className = '',
      ...props
    },
    ref
  ) => {
    const contentRefs = useRef({});

    useEffect(() => {
      // Update height when items change or open state changes
      Object.keys(contentRefs.current).forEach((id) => {
        const el = contentRefs.current[id];
        if (el) {
          const isOpen = openItems.includes(id);
          if (isOpen) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = '0px';
          }
        }
      });
    }, [openItems, items]);

    const handleToggle = (id) => {
      if (onToggle) {
        onToggle(id);
      }
    };

    const handleKeyDown = (e, id) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle(id);
      }
      if (e.key === 'Escape') {
        const button = document.getElementById(`faq-button-${id}`);
        if (button) {
          button.blur();
        }
      }
    };

    if (loading) {
      return (
        <div className={cn('space-y-3', className)}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-16 bg-navy-100 rounded-xl" />
            </div>
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className={cn('py-8', className)}>
          <EmptyState
            icon="search"
            title="No results found"
            description={
              searchQuery
                ? `No FAQs match "${searchQuery}". Try adjusting your search.`
                : 'No FAQs available in this category.'
            }
            action={searchQuery ? 'Clear Search' : undefined}
            actionVariant="primary"
            className="border-0 shadow-none"
          />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)} role="list" {...props}>
        {items.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <div
              key={item.id}
              className={cn(
                'border rounded-xl overflow-hidden transition-all duration-300',
                isOpen
                  ? 'border-navy-200 shadow-premium-sm'
                  : 'border-navy-100 hover:border-navy-200'
              )}
              role="listitem"
            >
              {/* Question Button */}
              <button
                id={`faq-button-${item.id}`}
                onClick={() => handleToggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                className={cn(
                  'w-full px-4 sm:px-5 py-4 text-left flex items-start justify-between gap-4',
                  'transition-colors duration-200',
                  'hover:bg-navy-50 focus:outline-none focus:bg-navy-50 focus:ring-2 focus:ring-navy-500',
                  isOpen && 'bg-navy-50'
                )}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                aria-label={`Toggle answer for: ${item.question}`}
              >
                <span className="font-medium text-navy-800 text-sm sm:text-base pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-navy-400 flex-shrink-0 transition-transform duration-300',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Answer Content */}
              <div
                ref={(el) => {
                  if (el) {
                    contentRefs.current[item.id] = el;
                    if (isOpen) {
                      el.style.maxHeight = `${el.scrollHeight}px`;
                    } else {
                      el.style.maxHeight = '0px';
                    }
                  }
                }}
                id={`faq-content-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: '0px' }}
              >
                <div className="px-4 sm:px-5 pb-4 pt-1 text-sm text-navy-600 leading-relaxed">
                  {item.answer}
                  {item.category && (
                    <span className="inline-block mt-2 text-xs text-navy-400 bg-navy-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

FAQAccordion.displayName = 'FAQAccordion';

export default React.memo(FAQAccordion);
