import React from 'react';
import { cn } from '@/utils/cn';
import { MapPin } from 'lucide-react';

const PropertyMap = ({ lat, lng, address, className = '' }) => {
  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=15`;

  // Static map image as fallback
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=800x400&markers=color:gold%7C${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

  return (
    <div
      className={cn(
        'relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-navy-100',
        className
      )}
    >
      {/* Fallback static map */}
      <img
        src={staticMapUrl}
        alt={`Map showing location: ${address}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Pin overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <MapPin className="w-8 h-8 text-gold-500 fill-gold-500 drop-shadow-lg" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-500/30 rounded-full blur-md animate-pulse" />
        </div>
      </div>

      {/* Address overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
          <p className="text-sm font-medium text-navy-800">{address}</p>
          <p className="text-xs text-navy-500 mt-0.5">Click to open in Google Maps</p>
        </div>
      </div>

      {/* Interactive overlay */}
      <a
        href={`https://www.google.com/maps?q=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-gold-500"
        aria-label={`View location on Google Maps: ${address}`}
      />
    </div>
  );
};

export default PropertyMap;
