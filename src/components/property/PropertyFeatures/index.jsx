import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
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
  Star,
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
  Droplet,
  Sparkle,
  Diamond,
  Map,
} from 'lucide-react';

// Map of icon names to Lucide components
const iconMap = {
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
  Star,
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
};

const PropertyFeatures = React.memo(({ features = [], className = '' }) => {
  // Determine if features is array of objects or strings
  const normalizedFeatures = useMemo(() => {
    if (!features || features.length === 0) return [];

    // Check if first item is an object with icon/title/description
    if (typeof features[0] === 'object' && features[0] !== null) {
      return features.map((feature) => ({
        icon: feature.icon || 'Star',
        title: feature.title || feature.name || 'Feature',
        description: feature.description || '',
      }));
    }

    // String array - convert to object format
    return features.map((feature) => ({
      icon: 'Star',
      title: feature,
      description: '',
    }));
  }, [features]);

  // Get icon component
  const getIconComponent = (iconName) => {
    const Icon = iconMap[iconName] || iconMap.Star;
    return Icon;
  };

  if (normalizedFeatures.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
          Property Features
        </h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mb-3">
            <Star className="w-8 h-8 text-navy-300" />
          </div>
          <p className="text-navy-500 text-sm">No features listed</p>
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
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className={cn('w-full', className)}>
      <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Property Features</h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {normalizedFeatures.map((feature, index) => {
          const Icon = getIconComponent(feature.icon);
          const hasDescription = feature.description && feature.description.length > 0;

          return (
            <motion.div key={index} variants={itemVariants}>
              <Card
                padding="md"
                hoverable
                className={cn(
                  'h-full transition-all duration-300 border border-navy-100/50',
                  'hover:border-gold-200 hover:shadow-premium hover:-translate-y-0.5'
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-lg bg-gold-50 mb-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-navy-800 leading-tight">
                    {feature.title}
                  </h4>
                  {hasDescription && (
                    <p className="text-[10px] sm:text-xs text-navy-400 mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});

PropertyFeatures.displayName = 'PropertyFeatures';

export default PropertyFeatures;
