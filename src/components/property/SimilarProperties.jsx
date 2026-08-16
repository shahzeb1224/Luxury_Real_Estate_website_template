import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const SimilarProperties = ({ properties = [], className = '' }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-premium', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-playfair font-semibold text-navy-800">Similar Properties</h2>
        <Link
          to="/buy"
          className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.slice(0, 3).map((property) => (
          <Link key={property.id} to={`/property/${property.id}`} className="group">
            <Card
              padding="none"
              className="overflow-hidden hover:shadow-premium-lg transition-shadow"
            >
              <div className="aspect-[4/3] bg-navy-100 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-playfair font-semibold text-navy-800 line-clamp-1">
                    {property.title}
                  </h3>
                  <Badge variant="success" size="sm" pill>
                    {property.status === 'active' ? 'Available' : property.status}
                  </Badge>
                </div>
                <p className="text-xs text-navy-500">{property.location}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-navy-500">
                  {property.beds && <span>{property.beds} beds</span>}
                  {property.baths && <span>{property.baths} baths</span>}
                  {property.sqft && <span>{property.sqft} sqft</span>}
                </div>
                <p className="text-sm font-bold text-gold-500 mt-1">
                  {formatCurrency(property.price)}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;
