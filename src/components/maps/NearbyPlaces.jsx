import React from 'react';
import { cn } from '@/utils/cn';
import { School, ShoppingBag, Hospital, Trees, UtensilsCrossed, MapPin } from 'lucide-react';

const iconMap = {
  School: School,
  Shopping: ShoppingBag,
  Hospital: Hospital,
  Park: Trees,
  Restaurant: UtensilsCrossed,
  default: MapPin,
};

const NearbyPlaces = ({ places = [], className = '' }) => {
  if (!places || places.length === 0) {
    return null;
  }

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-premium', className)}>
      <h2 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Nearby Places</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {places.map((place, index) => {
          const Icon = iconMap[place.type] || iconMap.default;

          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-navy-50 rounded-xl hover:bg-navy-100 transition-colors"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Icon className="w-4 h-4 text-gold-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-800">{place.name}</p>
                <p className="text-xs text-navy-500 flex items-center gap-1">
                  {place.type}
                  <span className="w-1 h-1 rounded-full bg-navy-300" />
                  {place.distance}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyPlaces;
