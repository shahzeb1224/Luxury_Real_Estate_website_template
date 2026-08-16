import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { X, Phone, Mail, MapPin } from 'lucide-react';
import { lockScroll } from '@/utils/scroll';
import NAVIGATION from '@/constants/navigation';
import config from '@/constants/config';

const MobileMenu = ({ isOpen, onClose, className = '', ...props }) => {
  const menuRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      lockScroll(true);
      // Focus trap
      const focusableElements = menuRef.current?.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length) {
        firstFocusableRef.current = focusableElements[0];
        lastFocusableRef.current = focusableElements[focusableElements.length - 1];
        firstFocusableRef.current?.focus();
      }
    } else {
      lockScroll(false);
    }
    return () => lockScroll(false);
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.();

      // Focus trap
      if (e.key === 'Tab' && isOpen) {
        const focusableElements = menuRef.current?.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements?.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      {...props}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className={cn(
          'relative w-80 max-w-full h-full bg-white shadow-premium-xl',
          'animate-slide-in flex flex-col',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-navy-100">
          <span className="text-xl font-playfair font-bold text-navy-800">Elite</span>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-navy-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4" role="navigation">
          <ul className="space-y-1">
            {NAVIGATION.main.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-base font-medium text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="my-4 border-navy-100" />

          {/* Utility Links */}
          <ul className="space-y-1">
            <li>
              <Link
                to="/favorites"
                onClick={onClose}
                className="block px-4 py-3 text-base font-medium text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={onClose}
                className="block px-4 py-3 text-base font-medium text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                onClick={onClose}
                className="block px-4 py-3 text-base font-medium bg-gold-500 text-white hover:bg-gold-600 rounded-lg transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-navy-100 space-y-2 text-sm text-navy-500">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a href={`tel:${config.company.phone}`} className="hover:text-navy-800">
              {config.company.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${config.company.email}`} className="hover:text-navy-800">
              {config.company.email}
            </a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5" />
            <span className="text-xs">{config.company.address.full}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(MobileMenu);
