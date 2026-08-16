import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { getPropertyImage } from '@/assets/images/properties';
import { formatCurrency, formatArea } from '@/lib/formatters';
import { X, GitCompare, ChevronUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const CompareDrawer = ({ properties = [], onRemove, onClear, className = '' }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  if (properties.length === 0) return null;

  const compareFeatures = [
    { key: 'price', label: 'Price', format: (v) => formatCurrency(v) },
    { key: 'bedrooms', label: 'Beds', format: (v) => v || '—' },
    { key: 'bathrooms', label: 'Baths', format: (v) => v || '—' },
    { key: 'area', label: 'Area', format: (v) => (v ? formatArea(v) : '—') },
    { key: 'parking', label: 'Parking', format: (v) => v || '—' },
    { key: 'yearBuilt', label: 'Year', format: (v) => v || '—' },
    { key: 'status', label: 'Status', format: (v) => v || '—' },
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isExpanded ? '0%' : '80%' }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-sticky bg-white shadow-premium-xl rounded-t-2xl border-t border-navy-100',
        className
      )}
    >
      {/* Handle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-navy-50 transition-colors rounded-t-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <GitCompare className="w-4 h-4 text-gold-500" />
            <span className="font-semibold text-navy-800">Compare Properties</span>
            <span className="px-2 py-0.5 bg-navy-100 text-navy-600 text-xs rounded-full">
              {properties.length}
            </span>
          </div>
          <div className="flex -space-x-2">
            {properties.map((property) => (
              <div
                key={property.id}
                className="w-6 h-6 rounded-full bg-navy-200 border-2 border-white overflow-hidden"
              >
                <img
                  src={property.images?.[0] || getPropertyImage(0)}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="text-sm text-navy-400 hover:text-navy-600 transition-colors"
          >
            Clear All
          </button>
          <ChevronUp
            className={cn('w-4 h-4 text-navy-400 transition-transform', isExpanded && 'rotate-180')}
          />
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {properties.map((property) => (
                  <Card key={property.id} padding="sm" className="relative border border-navy-100">
                    <button
                      onClick={() => onRemove(property.id)}
                      className="absolute top-1 right-1 p-1 rounded-full hover:bg-navy-100 transition-colors"
                      aria-label="Remove from compare"
                    >
                      <X className="w-3 h-3 text-navy-400" />
                    </button>

                    <img
                      src={property.images?.[0] || getPropertyImage(0)}
                      alt={property.title}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <h4 className="font-semibold text-navy-800 text-sm mt-2 line-clamp-1">
                      {property.title}
                    </h4>
                    <p className="text-xs text-navy-500 line-clamp-1">{property.location}</p>
                    <p className="text-sm font-bold text-gold-500 mt-1">
                      {formatCurrency(property.price)}
                    </p>

                    <div className="grid grid-cols-3 gap-1 mt-2 text-xs text-navy-500">
                      {compareFeatures.slice(1, 4).map((feature) => (
                        <div key={feature.key}>
                          <span className="block text-navy-400">{feature.label}</span>
                          <span className="font-medium text-navy-700">
                            {feature.format(property[feature.key])}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/property/${property.id}`}
                      className="block w-full text-center mt-2 px-3 py-1.5 bg-navy-50 text-navy-700 rounded-lg text-sm font-medium hover:bg-navy-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CompareDrawer;
