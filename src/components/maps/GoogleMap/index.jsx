import React, { useState, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Loading from '@/components/shared/Loading';

const GoogleMap = forwardRef(
  (
    {
      latitude,
      longitude,
      zoom = 15,
      markerTitle = 'Location',
      height = 'h-64 sm:h-80 lg:h-96',
      className = '',
      loadingFallback = true,
      mapType = 'roadmap',
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    // Validate coordinates
    const isValidLat = typeof latitude === 'number' && latitude >= -90 && latitude <= 90;
    const isValidLng = typeof longitude === 'number' && longitude >= -180 && longitude <= 180;

    // Generate Google Maps embed URL
    const generateEmbedUrl = () => {
      if (!isValidLat || !isValidLng) {
        return '';
      }

      const base = 'https://www.google.com/maps/embed/v1/place';
      const params = new URLSearchParams({
        key: apiKey,
        q: `${latitude},${longitude}`,
        zoom: String(zoom),
        maptype: mapType,
      });

      if (markerTitle) {
        params.append('marker', `color:gold%7C${latitude},${longitude}`);
      }

      return `${base}?${params.toString()}`;
    };

    // Generate static map fallback URL
    const generateStaticMapUrl = () => {
      if (!isValidLat || !isValidLng) {
        return '';
      }

      const base = 'https://maps.googleapis.com/maps/api/staticmap';
      const params = new URLSearchParams({
        center: `${latitude},${longitude}`,
        zoom: String(zoom),
        size: '600x300',
        maptype: mapType,
        key: apiKey,
        markers: `color:gold%7C${latitude},${longitude}`,
      });

      return `${base}?${params.toString()}`;
    };

    const embedUrl = generateEmbedUrl();
    const staticMapUrl = generateStaticMapUrl();
    const hasValidCoordinates = isValidLat && isValidLng && embedUrl;

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Loading fallback
    if (loadingFallback && isLoading) {
      return (
        <div
          ref={ref}
          className={cn('relative w-full overflow-hidden rounded-xl bg-navy-50', height, className)}
          {...props}
        >
          <Loading variant="skeleton" className="w-full h-full" />
        </div>
      );
    }

    // Error state
    if (hasError || !hasValidCoordinates) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative w-full overflow-hidden rounded-xl bg-navy-50 flex items-center justify-center',
            height,
            className
          )}
          {...props}
        >
          <div className="text-center p-4">
            <p className="text-navy-500 text-sm mb-2">
              {!hasValidCoordinates ? 'Invalid location coordinates' : 'Unable to load map'}
            </p>
            {staticMapUrl && !hasError && (
              <img
                src={staticMapUrl}
                alt={`Map showing ${markerTitle}`}
                className="w-full h-auto max-h-48 object-contain rounded-lg"
                loading="lazy"
                onError={() => setHasError(true)}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden rounded-xl bg-navy-50', height, className)}
        {...props}
      >
        {/* Google Maps iframe */}
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          title={`Google Map - ${markerTitle}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleLoad}
          onError={handleError}
          aria-label={`Map showing ${markerTitle}`}
          style={{ opacity: isLoading ? 0 : 1 }}
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-50/80">
            <Loading variant="spinner" size="md" />
          </div>
        )}

        {/* Open in Google Maps link */}
        <div className="absolute bottom-3 right-3 z-10">
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-navy-700 rounded-lg shadow-md hover:bg-white transition-colors"
            aria-label={`Open ${markerTitle} in Google Maps`}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>View Map</span>
          </a>
        </div>

        {/* Attribution */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[10px] text-navy-400 bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded">
            © Google Maps
          </span>
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-3 right-3 z-10 text-xs text-navy-400 bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded">
          Zoom: {zoom}
        </div>
      </div>
    );
  }
);

GoogleMap.displayName = 'GoogleMap';

export default GoogleMap;
