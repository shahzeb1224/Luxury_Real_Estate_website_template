import React, { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/utils/cn';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate srcSet for responsive images
  const generateSrcSet = (src) => {
    const baseUrl = src.split('?')[0];
    return `
      ${baseUrl}?w=400 400w,
      ${baseUrl}?w=800 800w,
      ${baseUrl}?w=1200 1200w,
      ${baseUrl}?w=1600 1600w
    `.trim();
  };

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
      {...props}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && isInView && <div className="absolute inset-0 bg-navy-100 animate-pulse" />}
    </div>
  );
};

export default memo(OptimizedImage);
