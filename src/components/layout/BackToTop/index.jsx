import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '@/utils/scroll';

const BackToTop = ({ className = '', threshold = 300, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => scrollToTop({ behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-sticky',
        'p-3 bg-navy-800 text-white rounded-full',
        'shadow-premium hover:bg-navy-700',
        'transition-all duration-300 hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2',
        'animate-fade-in',
        className
      )}
      aria-label="Back to top"
      {...props}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default React.memo(BackToTop);
