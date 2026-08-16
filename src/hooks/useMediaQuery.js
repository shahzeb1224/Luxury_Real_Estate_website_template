/**
 * useMediaQuery Hook
 * A React hook for detecting media query matches with SSR safety
 *
 * @param {string} query - The media query string to match (e.g., '(min-width: 768px)')
 * @param {Object} options - Optional configuration
 * @param {boolean} options.defaultMatches - Default value for SSR (default: false)
 * @param {number} options.debounceDelay - Debounce delay in ms for resize events (default: 0)
 * @returns {boolean} - True if the media query matches, false otherwise
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export const useMediaQuery = (query, options = {}) => {
  const { defaultMatches = false, debounceDelay = 0 } = options;

  // Store query string in ref to avoid unnecessary effect re-runs
  const queryRef = useRef(query);

  // State for matches
  const [matches, setMatches] = useState(() => {
    // SSR safe initial value
    if (typeof window === 'undefined') {
      return defaultMatches;
    }

    try {
      return window.matchMedia(query).matches;
    } catch (error) {
      console.warn(`useMediaQuery: Invalid query string "${query}"`, error);
      return defaultMatches;
    }
  });

  // Debounced update function
  const debounceTimeoutRef = useRef(null);

  const updateMatches = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const mediaQueryList = window.matchMedia(queryRef.current);
      setMatches(mediaQueryList.matches);
    } catch (error) {
      console.warn(`useMediaQuery: Error checking query "${queryRef.current}"`, error);
    }
  }, []);

  // Debounced version of updateMatches
  const debouncedUpdateMatches = useCallback(() => {
    if (debounceDelay > 0) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        updateMatches();
        debounceTimeoutRef.current = null;
      }, debounceDelay);
    } else {
      updateMatches();
    }
  }, [debounceDelay, updateMatches]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update query ref if query string changed
    if (queryRef.current !== query) {
      queryRef.current = query;
    }

    // Check if media query is supported
    if (!window.matchMedia) {
      console.warn('useMediaQuery: window.matchMedia is not supported');
      return;
    }

    let mediaQueryList;

    try {
      mediaQueryList = window.matchMedia(query);
    } catch (error) {
      console.warn(`useMediaQuery: Invalid query string "${query}"`, error);
      return;
    }

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Define event handler
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Add event listener
    // Use addEventListener if available (modern browsers), fallback to addListener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // @ts-ignore - fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Also listen to resize events for fallback (some browsers don't fire change events on orientation change)
    if (debounceDelay > 0) {
      window.addEventListener('resize', debouncedUpdateMatches);
    } else {
      window.addEventListener('resize', updateMatches);
    }

    // Cleanup
    return () => {
      if (mediaQueryList.addEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // @ts-ignore - fallback for older browsers
        mediaQueryList.removeListener(handleChange);
      }

      window.removeEventListener(
        'resize',
        debounceDelay > 0 ? debouncedUpdateMatches : updateMatches
      );

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, [query, debounceDelay, debouncedUpdateMatches, updateMatches]);

  return matches;
};

export default useMediaQuery;
