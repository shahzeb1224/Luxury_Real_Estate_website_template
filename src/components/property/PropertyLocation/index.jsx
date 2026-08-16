import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import {
  MapPin,
  School,
  Hospital,
  ShoppingBag,
  Bus,
  Plane,
  Mosque,
  Church,
  Train,
  Car,
  Building2,
  Home,
  Star,
  Navigation,
  Compass,
  Map,
  AlertCircle,
} from 'lucide-react';

// Nearby place types with icons and labels
const nearbyConfig = {
  schools: { label: 'Schools', icon: School, color: 'navy' },
  hospitals: { label: 'Hospitals', icon: Hospital, color: 'danger' },
  mosques: { label: 'Mosques', icon: Mosque, color: 'gold' },
  churches: { label: 'Churches', icon: Church, color: 'navy' },
  shopping: { label: 'Shopping Centers', icon: ShoppingBag, color: 'gold' },
  metro: { label: 'Metro Station', icon: Bus, color: 'navy' },
  airport: { label: 'Airport', icon: Plane, color: 'gold' },
  train: { label: 'Train Station', icon: Train, color: 'navy' },
  parks: { label: 'Parks', icon: Home, color: 'success' },
  restaurants: { label: 'Restaurants', icon: Home, color: 'gold' },
  gyms: { label: 'Gyms', icon: Home, color: 'navy' },
  supermarkets: { label: 'Supermarkets', icon: ShoppingBag, color: 'navy' },
};

const PropertyLocation = React.memo(({ property = {}, className = '' }) => {
  const {
    address = '',
    city = '',
    area = '',
    coordinates = null,
    nearby = {},
    mapUrl = '',
  } = property;

  // Check if coordinates exist
  const hasCoordinates = useMemo(() => {
    return (
      coordinates &&
      typeof coordinates === 'object' &&
      coordinates.lat !== undefined &&
      coordinates.lng !== undefined &&
      !isNaN(coordinates.lat) &&
      !isNaN(coordinates.lng)
    );
  }, [coordinates]);

  // Generate Google Maps embed URL
  const embedUrl = useMemo(() => {
    if (hasCoordinates) {
      return `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&q=${coordinates.lat},${coordinates.lng}&zoom=15`;
    }
    if (mapUrl) {
      return mapUrl;
    }
    return '';
  }, [hasCoordinates, coordinates, mapUrl]);

  // Generate static map URL as fallback
  const staticMapUrl = useMemo(() => {
    if (hasCoordinates) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=14&size=600x400&markers=color:gold%7C${coordinates.lat},${coordinates.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}`;
    }
    return '';
  }, [hasCoordinates, coordinates]);

  // Get nearby places with distances
  const nearbyPlaces = useMemo(() => {
    if (!nearby || typeof nearby !== 'object') return [];

    const places = [];
    const entries = Object.entries(nearby);

    entries.forEach(([key, value]) => {
      const config = nearbyConfig[key];
      if (config && value) {
        places.push({
          key,
          ...config,
          distance:
            typeof value === 'string'
              ? value
              : value.distance || `${Math.floor(Math.random() * 20) + 1} min`,
          name: typeof value === 'string' ? value : value.name || config.label,
        });
      }
    });

    return places;
  }, [nearby]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const getDistanceColor = (distance) => {
    const num = parseInt(distance);
    if (isNaN(num)) return 'text-navy-500';
    if (num <= 5) return 'text-success-500';
    if (num <= 15) return 'text-gold-500';
    return 'text-navy-400';
  };

  return (
    <div className={cn('w-full', className)}>
      <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Location</h3>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-2xl overflow-hidden bg-navy-100 shadow-premium"
      >
        {hasCoordinates && embedUrl ? (
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title={`Map showing ${address || 'property'} location`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Open in Google Maps overlay */}
            <a
              href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-navy-700 rounded-lg shadow-md hover:bg-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Open in Maps
            </a>
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-navy-100 to-navy-200 flex flex-col items-center justify-center">
            {/* Fallback static map */}
            {staticMapUrl && (
              <img
                src={staticMapUrl}
                alt={`Map showing ${address || 'property'} location`}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                loading="lazy"
              />
            )}
            <div className="relative z-10 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-premium">
                <MapPin className="w-8 h-8 text-gold-500" />
              </div>
              <p className="text-navy-600 font-medium">
                {address || city || 'Location not available'}
              </p>
              <p className="text-navy-400 text-sm mt-1">
                {area && `${area}, `}
                {city || 'Address'}
              </p>
              {!hasCoordinates && (
                <p className="text-navy-400 text-xs mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Interactive map unavailable
                </p>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Address Info */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-navy-600">
          <MapPin className="w-4 h-4 text-gold-500" />
          <span>{address || city || 'Property location'}</span>
        </div>
        {area && (
          <Badge variant="default" size="sm" className="bg-navy-50 text-navy-600">
            {area}
          </Badge>
        )}
        {city && (
          <Badge variant="luxury" size="sm" className="border-gold-200">
            {city}
          </Badge>
        )}
      </div>

      {/* Nearby Places */}
      {nearbyPlaces.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          <h4 className="text-sm font-semibold text-navy-700 mb-3 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gold-500" />
            Nearby Places
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {nearbyPlaces.map((place, index) => {
              const Icon = place.icon;
              const distanceColor = getDistanceColor(place.distance);

              return (
                <motion.div key={place.key} variants={itemVariants}>
                  <Card
                    padding="sm"
                    className={cn(
                      'flex items-center gap-2.5 border border-navy-100/50',
                      'hover:border-gold-200 hover:shadow-premium-sm transition-all duration-300'
                    )}
                  >
                    <div
                      className={cn(
                        'p-1.5 rounded-lg flex-shrink-0',
                        place.color === 'gold'
                          ? 'bg-gold-50'
                          : place.color === 'danger'
                            ? 'bg-danger-50'
                            : place.color === 'success'
                              ? 'bg-success-50'
                              : 'bg-navy-50'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-3.5 h-3.5',
                          place.color === 'gold'
                            ? 'text-gold-500'
                            : place.color === 'danger'
                              ? 'text-danger-500'
                              : place.color === 'success'
                                ? 'text-success-500'
                                : 'text-navy-500'
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy-700 truncate">{place.name}</p>
                      <p className={cn('text-[10px] font-medium', distanceColor)}>
                        {place.distance}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
});

PropertyLocation.displayName = 'PropertyLocation';

export default PropertyLocation;
