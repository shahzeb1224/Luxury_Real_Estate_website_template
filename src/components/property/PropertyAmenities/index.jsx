import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import {
  Check,
  X,
  Star,
  Utensils,
  DoorClosed,
  WashingMachine,
  Hammer,
  Lightbulb,
} from 'lucide-react';
import {
  Home,
  Wifi,
  Waves,
  Tv,
  Music,
  Dumbbell,
  Wine,
  ChefHat,
  Sparkles,
  Shield,
  Sun,
  Snowflake,
  Car,
  Trees,
  Mountain,
  Building2,
  Key,
  Lock,
  Camera,
  Smartphone,
  Fan,
  Droplets,
  Wind,
  Flame,
  Plug,
  Battery,
  Cloud,
  Gem,
  Crown,
  Award,
  Users,
  Heart,
  Zap,
  Eye,
  Bell,
  Clock,
  MapPin,
  Compass,
  Navigation,
  Coffee,
  BookOpen,
  Music2,
  Volume2,
  Palette,
  Scissors,
  Brush,
  ShieldCheck,
  Fingerprint,
  Scan,
  Radio,
  Satellite,
  WifiOff,
  Power,
  Leaf,
  Recycle,
  TreePine,
  Flower2,
  Sprout,
  SunMedium,
  Moon,
  CloudRain,
  CloudSnow,
  CloudSun,
  CloudLightning,
  Thermometer,
  Gauge,
  Ruler,
  Weight,
  Scale,
  Calendar,
  AlarmClock,
  Timer,
  Activity,
  HeartPulse,
  Stethoscope,
  Pill,
  Syringe,
  Ambulance,
  Hospital,
  School,
  Library,
  GraduationCap,
  Pencil,
  Book,
  Newspaper,
  Megaphone,
  Speaker,
  Headphones,
  Mic,
  Guitar,
  Piano,
  Drama,
  Paintbrush,
  PencilRuler,
  Diamond,
  Sparkle,
  Warehouse,
  Factory,
  Store,
  ShoppingBag,
  Briefcase,
  Banknote,
  CreditCard,
  Landmark,
  Church,
  Mosque,
  ParkingCircle,
  ParkingSquare,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Footprints,
  Dog,
  Cat,
  Bird,
  Fish,
  Flower,
  Trash,
  Droplet,
} from 'lucide-react';
import { FaWheelchair, FaWheelchairMove } from 'react-icons/fa6';

// Map of icon names to Lucide components
const iconMap = {
  // Common amenities
  Gym: Dumbbell,
  Spa: Sparkles,
  'Swimming Pool': Waves,
  Security: Shield,
  'Power Backup': Battery,
  Parking: Car,
  Elevator: Building2,
  Garden: Trees,
  'Mosque Nearby': Mosque,
  'School Nearby': School,
  'Hospital Nearby': Hospital,
  'Shopping Nearby': ShoppingBag,
  'Restaurant Nearby': Utensils,
  'Park Nearby': TreePine,
  'Transport Nearby': Bus,
  'Smart Home': Smartphone,
  'Home Theater': Tv,
  'Wine Cellar': Wine,
  'Chef Kitchen': ChefHat,
  'Ocean View': Waves,
  'Mountain View': Mountain,
  'City View': Building2,
  'Private Pool': Waves,
  'Gated Community': ShieldCheck,
  '24/7 Security': Shield,
  'CCTV Surveillance': Camera,
  Intercom: Radio,
  'Fire Alarm': Flame,
  'Fire Extinguisher': Flame,
  'Smoke Detector': Cloud,
  'Carbon Monoxide Detector': Cloud,
  'Emergency Exit': DoorClosed,
  'Handicap Access': FaWheelchair,
  'Wheelchair Accessible': FaWheelchairMove,
  'Pet Friendly': Dog,
  'Kids Play Area': Users,
  'Party Hall': Users,
  'Community Center': Users,
  'Business Center': Briefcase,
  'Conference Room': Users,
  'Meeting Room': Users,
  'Co-working Space': Users,
  'Laundry Room': WashingMachine,
  'Staff Quarters': Users,
  "Maid's Room": Users,
  "Driver's Room": Users,
  'Guest Room': Users,
  'Study Room': BookOpen,
  Library: Library,
  'Music Room': Music2,
  'Dance Studio': Music2,
  'Art Studio': Palette,
  Workshop: Hammer,
  'Storage Room': Warehouse,
  Basement: Warehouse,
  Attic: Home,
  Balcony: Home,
  Terrace: Home,
  Deck: Home,
  Patio: Home,
  Courtyard: Home,
  Gymnasium: Dumbbell,
  'Basketball Court': Activity,
  'Tennis Court': Activity,
  'Squash Court': Activity,
  'Badminton Court': Activity,
  'Table Tennis': Activity,
  'Yoga Studio': Sparkles,
  'Meditation Room': Sparkles,
  Sauna: Sparkles,
  'Steam Room': Droplets,
  Jacuzzi: Droplets,
  'Hot Tub': Droplets,
  'Cold Plunge': Droplets,
  'Infinity Pool': Waves,
  'Lap Pool': Waves,
  "Children's Pool": Waves,
  'Water Feature': Waves,
  Fountain: Droplets,
  Waterfall: Droplets,
  'BBQ Area': Flame,
  'Outdoor Kitchen': ChefHat,
  'Fire Pit': Flame,
  'Outdoor Fireplace': Flame,
  'Outdoor Shower': Droplets,
  'Outdoor Dining': Utensils,
  'Outdoor Lounge': Users,
  'Outdoor Play Area': Users,
  'Walking Trails': Footprints,
  'Jogging Track': Activity,
  'Bicycle Rack': Bike,
  'Electric Vehicle Charging': Plug,
  'Solar Panels': Sun,
  'Rainwater Harvesting': Droplets,
  'Greywater System': Droplets,
  'Waste Management': Recycle,
  'LED Lighting': Lightbulb,
  'Energy Efficient': Leaf,
  'Sustainable Materials': Recycle,
  'Green Building': Leaf,
  'LEED Certified': Award,
  'Smart Irrigation': Droplets,
  'Smart Lighting': Lightbulb,
  'Smart Security': Shield,
  'Smart Lock': Lock,
  'Video Doorbell': Camera,
  'Voice Control': Mic,
  'Automated Blinds': Sun,
  'Motorized Shades': Sun,
  'Climate Control': Thermometer,
  'Air Purification': Wind,
  'Water Softener': Droplets,
  'Whole House Filtration': Droplets,
  'Piped Gas': Flame,
  'District Cooling': Snowflake,
  'District Heating': Flame,
  'Backup Generator': Battery,
  UPS: Battery,
  'Surge Protection': Zap,
  'Lightning Rod': Zap,
  'Earthquake Safety': Shield,
  'Fire Safety': Shield,
  'Medical Alert': HeartPulse,
  Concierge: Users,
  Doorman: Users,
  'Valet Parking': Car,
  'Visitor Parking': Car,
  'Bicycle Parking': Bike,
  'Motorcycle Parking': Bike,
  Helipad: Plane,
  'Yacht Dock': Ship,
  'Beach Access': Waves,
  'Lake Access': Droplets,
  'River Access': Droplets,
  'Golf Course Access': Trees,
  'Ski Access': Snowflake,
  'Hiking Trails': Footprints,
  'Fishing Access': Fish,
  'Boating Access': Ship,
};

// Fallback icon for unmapped items
const FallbackIcon = Star;

const PropertyAmenities = React.memo(({ amenities = [], className = '' }) => {
  // Normalize amenities to consistent format
  const normalizedAmenities = useMemo(() => {
    if (!amenities || amenities.length === 0) return [];

    // Check if first item is an object with name/icon/available
    if (typeof amenities[0] === 'object' && amenities[0] !== null) {
      return amenities.map((item) => ({
        name: item.name || item.label || 'Amenity',
        icon: item.icon || 'Star',
        available: item.available !== undefined ? item.available : true,
      }));
    }

    // Array of strings - convert to object format
    return amenities.map((item) => ({
      name: item,
      icon: 'Star',
      available: true,
    }));
  }, [amenities]);

  // Get icon component
  const getIconComponent = (iconName) => {
    const Icon = iconMap[iconName] || FallbackIcon;
    return Icon;
  };

  if (normalizedAmenities.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Amenities</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-3">
            <Star className="w-8 h-8 text-navy-300" />
          </div>
          <p className="text-navy-500 text-sm">No amenities listed</p>
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
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Separate available and unavailable amenities
  const availableAmenities = normalizedAmenities.filter((item) => item.available);
  const unavailableAmenities = normalizedAmenities.filter((item) => !item.available);

  // Combine with available first
  const sortedAmenities = [...availableAmenities, ...unavailableAmenities];

  return (
    <div className={cn('w-full', className)}>
      <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Amenities</h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
      >
        {sortedAmenities.map((item, index) => {
          const Icon = getIconComponent(item.icon);
          const isAvailable = item.available;

          return (
            <motion.div key={index} variants={itemVariants}>
              <div
                className={cn(
                  'flex items-center gap-2 p-2.5 sm:p-3 rounded-xl transition-all duration-300 border',
                  isAvailable
                    ? 'bg-white border-navy-100 hover:border-gold-200 hover:shadow-premium-sm hover:-translate-y-0.5'
                    : 'bg-navy-50/50 border-navy-100/50 opacity-60'
                )}
              >
                <div
                  className={cn(
                    'p-1.5 rounded-lg flex-shrink-0',
                    isAvailable ? 'bg-gold-50' : 'bg-navy-100'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-3.5 h-3.5 sm:w-4 sm:h-4',
                      isAvailable ? 'text-gold-500' : 'text-navy-400'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-xs sm:text-sm font-medium truncate flex-1',
                    isAvailable ? 'text-navy-700' : 'text-navy-400 line-through'
                  )}
                >
                  {item.name}
                </span>
                {isAvailable ? (
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-success-500 flex-shrink-0" />
                ) : (
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-navy-400 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Legend */}
      {unavailableAmenities.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-navy-400">
          <div className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-success-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <X className="w-3 h-3 text-navy-400" />
            <span>Not Available</span>
          </div>
        </div>
      )}
    </div>
  );
});

PropertyAmenities.displayName = 'PropertyAmenities';

export default PropertyAmenities;
