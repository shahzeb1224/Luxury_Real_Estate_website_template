import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 200,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowPositions = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-navy-800',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-navy-800',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-navy-800',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-navy-800',
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      if (tooltipEl) {
        const tooltipRect = tooltipEl.getBoundingClientRect();
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

        // Keep tooltip in viewport
        if (top < 10) top = rect.bottom + 8;
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
          left = window.innerWidth - tooltipRect.width - 10;
        }

        setCoords({ top, left });
      }
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        {...props}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'fixed z-dropdown px-3 py-2 max-w-xs',
              'bg-navy-800 text-white text-sm rounded-lg shadow-premium',
              'animate-fade-in',
              className
            )}
            style={{
              top: coords.top,
              left: coords.left,
            }}
            role="tooltip"
          >
            {content}
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-transparent',
                arrowPositions[position]
              )}
            />
          </div>,
          document.body
        )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
