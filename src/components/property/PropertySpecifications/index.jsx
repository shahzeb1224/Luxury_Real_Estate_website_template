import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import {
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  Building2,
  Home,
  Sofa,
  FileText,
  Compass,
  Zap,
  Droplets,
  Flame,
  Ruler,
  Layers,
  Key,
  Landmark,
  MapPin,
  Sun,
  Moon,
  Cloud,
  Wind,
  Thermometer,
  Gauge,
  Weight,
  Scale,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Star,
  Diamond,
  Crown,
  Award,
} from 'lucide-react';

// Map specification keys to display labels and icons
const specConfig = {
  bedrooms: { label: 'Bedrooms', icon: Bed },
  bathrooms: { label: 'Bathrooms', icon: Bath },
  area: { label: 'Area (sqft)', icon: Square },
  garage: { label: 'Garage', icon: Car },
  parking: { label: 'Parking', icon: Car },
  yearBuilt: { label: 'Year Built', icon: Calendar },
  floors: { label: 'Floors', icon: Layers },
  propertyType: { label: 'Property Type', icon: Building2 },
  furnished: { label: 'Furnished', icon: Sofa },
  ownership: { label: 'Ownership', icon: FileText },
  facing: { label: 'Facing', icon: Compass },
  electricity: { label: 'Electricity', icon: Zap },
  water: { label: 'Water Supply', icon: Droplets },
  gas: { label: 'Gas Supply', icon: Flame },
  heating: { label: 'Heating', icon: Thermometer },
  cooling: { label: 'Cooling', icon: Wind },
  roofType: { label: 'Roof Type', icon: Home },
  exterior: { label: 'Exterior', icon: Building2 },
  view: { label: 'View', icon: MapPin },
  lotSize: { label: 'Lot Size', icon: Ruler },
  halfBathrooms: { label: 'Half Bathrooms', icon: Bath },
  totalRooms: { label: 'Total Rooms' },
  kitchen: { label: 'Kitchen', icon: Home },
  dining: { label: 'Dining', icon: Home },
  living: { label: 'Living Room', icon: Home },
  masterBedroom: { label: 'Master Bedroom', icon: Bed },
  masterBathroom: { label: 'Master Bathroom', icon: Bath },
  walkInCloset: { label: 'Walk-in Closet' },
  laundryRoom: { label: 'Laundry Room', icon: Home },
  pantry: { label: 'Pantry', icon: Home },
  fireplace: { label: 'Fireplace', icon: Flame },
  balcony: { label: 'Balcony', icon: Home },
  terrace: { label: 'Terrace', icon: Home },
  garden: { label: 'Garden', icon: Home },
  waves: { label: 'Waves', icon: Home },
  spa: { label: 'Spa', icon: Home },
  gym: { label: 'Gym', icon: Home },
  security: { label: 'Security', icon: Home },
  smartHome: { label: 'Smart Home', icon: Home },
  basement: { label: 'Basement', icon: Home },
  attic: { label: 'Attic', icon: Home },
  study: { label: 'Study', icon: Home },
  office: { label: 'Office', icon: Home },
  guestRoom: { label: 'Guest Room', icon: Home },
  staffQuarters: { label: 'Staff Quarters', icon: Home },
  maidRoom: { label: 'Maid Room', icon: Home },
  driverRoom: { label: 'Driver Room', icon: Home },
  status: { label: 'Status', icon: CheckCircle },
  listingType: { label: 'Listing Type', icon: FileText },
};

const PropertySpecifications = React.memo(({ specifications = {}, className = '' }) => {
  // Filter out empty or null values and format for display
  const normalizedSpecs = useMemo(() => {
    if (!specifications || Object.keys(specifications).length === 0) {
      return [];
    }

    const entries = Object.entries(specifications)
      .filter(([key, value]) => {
        // Filter out null, undefined, empty strings, and empty arrays
        if (value === null || value === undefined) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
      .map(([key, value]) => {
        const config = specConfig[key] || { label: key, icon: Star };
        return {
          key,
          label: config.label || key,
          Icon: config.icon || Star,
          value,
        };
      });

    return entries;
  }, [specifications]);

  // Format value for display
  const formatValue = (value, key) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'number') {
      // Format numbers with commas if they're large
      if (value >= 1000) {
        return value.toLocaleString();
      }
      return String(value);
    }
    return String(value);
  };

  if (normalizedSpecs.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
          Property Specifications
        </h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-3">
            <FileText className="w-8 h-8 text-navy-300" />
          </div>
          <p className="text-navy-500 text-sm">No specifications available</p>
          <p className="text-navy-400 text-xs mt-1">Check back later for updates</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className={cn('w-full', className)}>
      <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
        Property Specifications
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
      >
        {normalizedSpecs.map((spec, index) => {
          const Icon = spec.Icon;
          const formattedValue = formatValue(spec.value, spec.key);

          return (
            <motion.div key={spec.key} variants={itemVariants}>
              <Card
                padding="md"
                className={cn(
                  'h-full transition-all duration-300 border border-navy-100/50',
                  'hover:border-gold-200 hover:shadow-premium-sm hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gold-50 flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gold-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-navy-400 truncate">
                      {spec.label}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-navy-800 truncate">
                      {formattedValue}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});

PropertySpecifications.displayName = 'PropertySpecifications';

export default PropertySpecifications;
