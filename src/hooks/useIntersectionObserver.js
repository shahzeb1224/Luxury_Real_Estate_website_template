import { useState, useEffect, useRef, useCallback } from 'react';

export const useIntersectionObserver = (options = { threshold: 0.3, rootMargin: '0px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const callback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [callback, options]);

  return { ref, isVisible };
};
