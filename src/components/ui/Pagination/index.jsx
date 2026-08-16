import React from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = '',
  ...props
}) => {
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPaginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = range(1, 3 + siblingCount * 2);
      return [...leftRange, 'ellipsis', totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = range(totalPages - 3 - siblingCount * 2 + 1, totalPages);
      return [firstPage, 'ellipsis', ...rightRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPage, 'ellipsis', ...middleRange, 'ellipsis', lastPage];
    }

    return range(1, totalPages);
  };

  const paginationRange = getPaginationRange();

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      role="navigation"
      aria-label="Pagination"
      {...props}
    >
      <button
        className={cn(
          'p-2 rounded-lg text-navy-600 hover:bg-navy-50 transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-navy-500'
        )}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {showFirstLast && (
        <button
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium text-navy-600 hover:bg-navy-50 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-navy-500',
            currentPage === 1 && 'bg-navy-800 text-white hover:bg-navy-700'
          )}
          onClick={() => onPageChange(1)}
          aria-label="First page"
        >
          1
        </button>
      )}

      {paginationRange.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-sm text-navy-400">
              …
            </span>
          );
        }

        const isFirst = page === 1;
        const isLast = page === totalPages;

        if ((showFirstLast && isFirst) || (showFirstLast && isLast)) {
          return null;
        }

        return (
          <button
            key={page}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-navy-500',
              currentPage === page
                ? 'bg-navy-800 text-white hover:bg-navy-700'
                : 'text-navy-600 hover:bg-navy-50'
            )}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {showFirstLast && (
        <button
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium text-navy-600 hover:bg-navy-50 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-navy-500',
            currentPage === totalPages && 'bg-navy-800 text-white hover:bg-navy-700'
          )}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          {totalPages}
        </button>
      )}

      <button
        className={cn(
          'p-2 rounded-lg text-navy-600 hover:bg-navy-50 transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-navy-500'
        )}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
