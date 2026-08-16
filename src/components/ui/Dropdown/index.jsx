import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({
  trigger,
  children,
  align = 'left',
  width = 'auto',
  className = '',
  menuClassName = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
        containerRef.current?.querySelector('button')?.focus();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeDropdown, handleKeyDown]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  const widthClasses = {
    auto: 'w-auto min-w-[180px]',
    full: 'w-full',
    trigger: 'w-full',
  };

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)} {...props}>
      {/* Trigger */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {typeof trigger === 'function' ? trigger({ isOpen }) : trigger}
      </div>

      {/* Menu */}
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={cn(
              'absolute z-dropdown mt-2 bg-white rounded-lg shadow-premium-lg border border-navy-100 py-1',
              alignClasses[align],
              widthClasses[width],
              'animate-fade-in',
              menuClassName
            )}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

// Dropdown Item
const DropdownItem = ({ children, onClick, className = '', ...props }) => (
  <button
    className={cn(
      'w-full px-4 py-2 text-left text-sm text-navy-700',
      'hover:bg-navy-50 transition-colors',
      'focus:outline-none focus:bg-navy-50',
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// Dropdown Divider
const DropdownDivider = ({ className = '', ...props }) => (
  <hr className={cn('my-1 border-navy-100', className)} {...props} />
);

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

Dropdown.displayName = 'Dropdown';

export default Dropdown;
