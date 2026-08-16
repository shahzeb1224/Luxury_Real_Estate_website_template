import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { getPropertyImage } from '@/assets/images/properties';
import { MapPin, X, Navigation2 } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { Link } from 'react-router-dom';

const PropertyMapView = ({
  properties = [],
  center = [34.0522, -118.2437],
  zoom = 10,
  onPropertySelect,
  className = '',
}) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  // Simulate map load
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate random positions around center
  const generatePositions = (count) => {
    const positions = [];
    const centerLat = center[0];
    const centerLng = center[1];
    const radius = 0.05;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * radius;
      positions.push({
        lat: centerLat + distance * Math.cos(angle),
        lng: centerLng + distance * Math.sin(angle),
      });
    }
    return positions;
  };

  const positions = generatePositions(properties.length);

  const handleMarkerClick = (property, index) => {
    setSelectedProperty(property);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  const handleClosePopup = () => {
    setSelectedProperty(null);
  };

  const handleCenterClick = () => {
    if (mapRef.current) {
      // Smooth zoom to center
    }
  };

  if (!mapLoaded) {
    return <div className={cn('w-full h-full bg-navy-100 animate-pulse rounded-xl', className)} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full bg-navy-50 rounded-xl overflow-hidden', className)}
    >
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-100 via-navy-50 to-gold-50" />

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 gap-4 w-full h-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-navy-300" />
          ))}
        </div>
      </div>

      {/* Markers */}
      <div className="relative z-10 w-full h-full">
        {properties.map((property, index) => {
          const pos = positions[index] || { lat: center[0], lng: center[1] };
          const isSelected = selectedProperty?.id === property.id;

          return (
            <button
              key={property.id}
              onClick={() => handleMarkerClick(property, index)}
              className={cn(
                'absolute p-1.5 rounded-full transition-all duration-300',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-500',
                isSelected
                  ? 'scale-125 bg-gold-500 text-white shadow-lg'
                  : 'bg-white text-navy-800 shadow-md hover:shadow-lg'
              )}
              style={{
                top: `${30 + (pos.lat - center[0]) * 8000 + 20}%`,
                left: `${30 + (pos.lng - center[1]) * 8000 + 20}%`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={`View ${property.title}`}
            >
              <MapPin className={cn('w-4 h-4', isSelected && 'fill-white')} />
            </button>
          );
        })}
      </div>

      {/* Selected Property Popup */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm">
          <div className="bg-white rounded-xl shadow-premium-xl overflow-hidden">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-3 p-3">
              <img
                src={selectedProperty.images?.[0] || getPropertyImage(0)}
                alt={selectedProperty.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-navy-800 text-sm truncate">
                  {selectedProperty.title}
                </h4>
                <p className="text-xs text-navy-500 truncate">{selectedProperty.location}</p>
                <p className="text-sm font-bold text-gold-500">
                  {formatCurrency(selectedProperty.price)}
                </p>
                <Link
                  to={`/property/${selectedProperty.id}`}
                  className="inline-block mt-1 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={handleCenterClick}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-navy-50 transition-colors"
          aria-label="Center map"
        >
          <Navigation2 className="w-4 h-4 text-navy-600" />
        </button>
        <div className="flex flex-col gap-1">
          <button className="p-2 bg-white rounded-t-lg shadow-md hover:bg-navy-50 transition-colors text-navy-600 font-semibold text-sm">
            +
          </button>
          <button className="p-2 bg-white rounded-b-lg shadow-md hover:bg-navy-50 transition-colors text-navy-600 font-semibold text-sm">
            −
          </button>
        </div>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-2 left-2 z-10 text-xs text-navy-400 bg-white/80 px-2 py-1 rounded">
        © Elite Real Estate • {properties.length} properties
      </div>

      {/* Zoom Level */}
      <div className="absolute bottom-2 right-2 z-10 text-xs text-navy-400 bg-white/80 px-2 py-1 rounded">
        Zoom: {zoom}
      </div>
    </div>
  );
};

export default PropertyMapView;
