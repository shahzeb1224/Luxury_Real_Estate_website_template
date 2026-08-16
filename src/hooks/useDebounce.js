/**
 * useDebounce Hook
 * A React hook for debouncing values with React 19 compatibility
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {any} Debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   // API call or filter logic here
 *   search(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */

import { useState, useEffect, useRef } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout on unmount or value/delay change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
