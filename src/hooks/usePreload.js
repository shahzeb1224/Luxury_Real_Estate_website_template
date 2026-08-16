import { useEffect } from 'react';

export const usePreload = (href, as = 'image') => {
  useEffect(() => {
    if (!href) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;

    if (as === 'image') {
      link.imageSrcset = href;
    }

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href, as]);
};
