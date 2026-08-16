import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive = true) => {
  const ref = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const element = ref.current;
    if (!element) return;

    // Store previous focus
    previousFocus.current = document.activeElement;

    // Get all focusable elements
    const focusable = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    element.addEventListener('keydown', handleTab);

    return () => {
      element.removeEventListener('keydown', handleTab);
      previousFocus.current?.focus();
    };
  }, [isActive]);

  return ref;
};
