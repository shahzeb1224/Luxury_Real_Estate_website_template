import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { formatCurrency, formatArea } from '@/lib/formatters';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

const PropertyComparison = ({ property, similarProperties = [], className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!similarProperties || similarProperties.length === 0) {
    return null;
  }

  const compareProps = [property, ...similarProperties.slice(0, 2)];

  const features = [
    { key: 'price', label: 'Price', format: (v) => formatCurrency(v) },
    { key: 'beds', label: 'Bedrooms', format: (v) => v || '—' },
    { key: 'baths', label: 'Bathrooms', format: (v) => v || '—' },
    { key: 'area', label: 'Area', format: (v) => (v ? formatArea(v) : '—') },
    { key: 'parking', label: 'Parking', format: (v) => v || '—' },
    { key: 'yearBuilt', label: 'Year Built', format: (v) => v || '—' },
    { key: 'status', label: 'Status', format: (v) => v || '—' },
  ];

  return (
    <div className={cn('bg-white rounded-2xl p-6 shadow-premium', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-xl font-playfair font-semibold text-navy-800">Compare Properties</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-navy-500">Compare {compareProps.length} properties</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-navy-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-navy-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-sm font-medium text-navy-500 bg-navy-50 rounded-l-lg">
                  Feature
                </th>
                {compareProps.map((prop, index) => (
                  <th
                    key={index}
                    className="p-3 text-left text-sm font-medium text-navy-800 bg-navy-50"
                  >
                    <Link
                      to={`/property/${prop.id}`}
                      className="hover:text-gold-500 transition-colors"
                    >
                      {index === 0 ? (
                        <span className="text-gold-500">★ Current</span>
                      ) : (
                        prop.title.split(' ').slice(0, 2).join(' ')
                      )}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.key} className="border-t border-navy-100">
                  <td className="p-3 text-sm font-medium text-navy-600">{feature.label}</td>
                  {compareProps.map((prop, index) => {
                    const value = prop[feature.key];
                    const formatted = feature.format(value);
                    const isBest = index === 0 ? false : value > property[feature.key];

                    return (
                      <td
                        key={index}
                        className={cn(
                          'p-3 text-sm',
                          index === 0 ? 'text-navy-800 font-medium' : 'text-navy-600'
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          {formatted}
                          {isBest && feature.key !== 'status' && (
                            <span className="text-green-500" title="Better than current">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PropertyComparison;
