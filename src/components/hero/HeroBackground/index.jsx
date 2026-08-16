import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import heroImage from '@/assets/images/hero/heroImage.png';

const HeroBackground = React.forwardRef(
  ({ src = heroImage, type = 'image', poster, fallback, priority = false, className = '', ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      if (priority && src) {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => {
          setHasError(true);
          setIsLoaded(true);
        };
      } else {
        setIsLoaded(true);
      }
    }, [src, priority]);

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true);
    };

    // Render video background
    if (type === 'video' && src) {
      return (
        <div
          ref={ref}
          className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}
          {...props}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            className="w-full h-full object-cover"
            style={{ opacity: isLoaded ? 1 : 0 }}
            onLoadedData={() => setIsLoaded(true)}
            onError={handleError}
          >
            <source src={src} type="video/mp4" />
            {fallback && (
              <img
                src={fallback}
                alt="Hero background fallback"
                className="w-full h-full object-cover"
              />
            )}
          </video>

          {/* Loading skeleton */}
          {!isLoaded && <div className="absolute inset-0 bg-navy-900 animate-pulse" />}
        </div>
      );
    }

    // Render image background
    if (src) {
      const imageSrc = hasError && fallback ? fallback : src;

      return (
        <div
          ref={ref}
          className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}
          {...props}
        >
          <img
            src={imageSrc}
            alt="Hero background"
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: isLoaded ? 1 : 0 }}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
          />

          {/* Loading skeleton */}
          {!isLoaded && <div className="absolute inset-0 bg-navy-900 animate-pulse" />}

          {/* Ken Burns effect for images */}
          <div
            className="absolute inset-0 w-full h-full scale-110 animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isLoaded ? 1 : 0,
            }}
          />
        </div>
      );
    }

    // Fallback gradient background
    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
          className
        )}
        {...props}
      />
    );
  }
);

HeroBackground.displayName = 'HeroBackground';

export default React.memo(HeroBackground);
