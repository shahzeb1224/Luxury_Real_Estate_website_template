import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import {
  MapPin,
  School,
  Hospital,
  ShoppingBag,
  Bus,
  UtensilsCrossed,
  Trees,
  Building2,
  Star,
  Award,
  Clock,
  Users,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const LocationHighlights = React.forwardRef(
  ({ location, highlights = [], showMap = false, mapEmbedUrl, className = '', ...props }, ref) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Default highlights if none provided
    const defaultHighlights = [
      { category: 'education', items: ['Beverly Hills High School', 'Harvard-Westlake School'] },
      { category: 'healthcare', items: ['Cedars-Sinai Medical Center', 'Beverly Hills Hospital'] },
      { category: 'shopping', items: ['Rodeo Drive', 'Beverly Center', 'The Grove'] },
      { category: 'dining', items: ['Spago', 'The Ivy', 'Crustacean'] },
      { category: 'parks', items: ['Beverly Gardens Park', 'Coldwater Canyon Park'] },
      { category: 'transport', items: ['Metro Bus Lines', 'LAX Airport 15 min'] },
    ];

    const highlightData = highlights.length > 0 ? highlights : defaultHighlights;

    const iconMap = {
      education: School,
      healthcare: Hospital,
      shopping: ShoppingBag,
      dining: UtensilsCrossed,
      parks: Trees,
      transport: Bus,
      business: Building2,
      recreation: Star,
      culture: Award,
      commute: Clock,
      community: Users,
    };

    const categoryLabels = {
      education: 'Education',
      healthcare: 'Healthcare',
      shopping: 'Shopping',
      dining: 'Dining & Entertainment',
      parks: 'Parks & Recreation',
      transport: 'Transportation',
      business: 'Business District',
      recreation: 'Recreation',
      culture: 'Culture & Arts',
      commute: 'Commute',
      community: 'Community',
    };

    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'amenities', label: 'Amenities' },
      { id: 'transport', label: 'Transportation' },
      { id: 'education', label: 'Education' },
    ];

    const getHighlightIcon = (category) => {
      const Icon = iconMap[category] || MapPin;
      return Icon;
    };

    const renderOverview = () => (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {location?.stats && (
            <>
              {location.stats.population && (
                <div className="bg-navy-50 rounded-xl p-4">
                  <p className="text-sm text-navy-500">Population</p>
                  <p className="text-2xl font-playfair font-semibold text-navy-800">
                    {location.stats.population.toLocaleString()}
                  </p>
                </div>
              )}
              {location.stats.medianPrice && (
                <div className="bg-gold-50 rounded-xl p-4">
                  <p className="text-sm text-navy-500">Median Property Price</p>
                  <p className="text-2xl font-playfair font-semibold text-gold-600">
                    ${location.stats.medianPrice.toLocaleString()}
                  </p>
                </div>
              )}
              {location.stats.averageRent && (
                <div className="bg-navy-50 rounded-xl p-4">
                  <p className="text-sm text-navy-500">Average Rent</p>
                  <p className="text-2xl font-playfair font-semibold text-navy-800">
                    ${location.stats.averageRent.toLocaleString()}/mo
                  </p>
                </div>
              )}
              {location.stats.investmentScore && (
                <div className="bg-gold-50 rounded-xl p-4">
                  <p className="text-sm text-navy-500">Investment Score</p>
                  <p className="text-2xl font-playfair font-semibold text-gold-600">
                    {location.stats.investmentScore}/100
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {location?.description && (
          <div className="bg-white rounded-xl p-4 border border-navy-100">
            <p className="text-navy-600 text-sm leading-relaxed">{location.description}</p>
          </div>
        )}

        {location?.highlights && location.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {location.highlights.map((highlight, index) => (
              <Badge key={index} variant="default" size="sm" pill>
                {highlight}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );

    const renderAmenities = () => (
      <div className="space-y-4">
        {highlightData.map((group) => {
          const Icon = getHighlightIcon(group.category);
          const label = categoryLabels[group.category] || group.category;

          return (
            <div key={group.category} className="bg-white rounded-xl p-4 border border-navy-100">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-gold-500" />
                <h4 className="font-semibold text-navy-800">{label}</h4>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-navy-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );

    const renderTransport = () => (
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 border border-navy-100">
          <h4 className="font-semibold text-navy-800 mb-3">Nearby Transport</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
              <Bus className="w-5 h-5 text-navy-600" />
              <div>
                <p className="text-sm font-medium text-navy-800">Bus Stops</p>
                <p className="text-xs text-navy-500">5 within 5 min walk</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
              <Building2 className="w-5 h-5 text-navy-600" />
              <div>
                <p className="text-sm font-medium text-navy-800">Metro Stations</p>
                <p className="text-xs text-navy-500">2 within 15 min walk</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
              <Clock className="w-5 h-5 text-navy-600" />
              <div>
                <p className="text-sm font-medium text-navy-800">Airport Access</p>
                <p className="text-xs text-navy-500">20 min drive to LAX</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
              <MapPin className="w-5 h-5 text-navy-600" />
              <div>
                <p className="text-sm font-medium text-navy-800">Walkability</p>
                <p className="text-xs text-navy-500">Walk Score: 85/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const renderEducation = () => (
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 border border-navy-100">
          <h4 className="font-semibold text-navy-800 mb-3">Nearby Schools</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
              <div>
                <p className="font-medium text-navy-800">Beverly Hills High School</p>
                <p className="text-xs text-navy-500">Grades 9-12 • Rating: 9/10</p>
              </div>
              <Badge variant="success" size="sm">
                Excellent
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
              <div>
                <p className="font-medium text-navy-800">Harvard-Westlake School</p>
                <p className="text-xs text-navy-500">Grades 7-12 • Rating: 9.5/10</p>
              </div>
              <Badge variant="success" size="sm">
                Excellent
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-navy-50 rounded-lg">
              <div>
                <p className="font-medium text-navy-800">Beverly Vista Middle School</p>
                <p className="text-xs text-navy-500">Grades 6-8 • Rating: 8/10</p>
              </div>
              <Badge variant="warning" size="sm">
                Good
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );

    const renderMap = () => (
      <div className="rounded-xl overflow-hidden border border-navy-100">
        {mapEmbedUrl ? (
          <iframe
            src={mapEmbedUrl}
            className="w-full h-80 sm:h-96"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${location?.name || 'location'}`}
          />
        ) : (
          <div className="w-full h-80 sm:h-96 bg-navy-100 flex items-center justify-center">
            <div className="text-center text-navy-400">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Map view coming soon</p>
            </div>
          </div>
        )}
      </div>
    );

    const tabContent = {
      overview: renderOverview,
      amenities: renderAmenities,
      transport: renderTransport,
      education: renderEducation,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full bg-white rounded-2xl border border-navy-100 shadow-premium overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Location Header */}
        {location && (
          <div className="p-4 sm:p-6 border-b border-navy-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-navy-800">
                  {location.name}
                </h3>
                <p className="text-sm text-navy-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {location.region || 'Los Angeles, CA'}
                </p>
              </div>
              {location.investmentRating && (
                <Badge variant="luxury" size="md" className="flex-shrink-0">
                  ★ {location.investmentRating}/5 Investment Rating
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-3 border-b border-navy-100 overflow-x-auto">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-all duration-200',
                  'border-b-2 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-navy-800 text-navy-800'
                    : 'border-transparent text-navy-500 hover:text-navy-700'
                )}
                aria-pressed={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {tabContent[activeTab]?.() || renderOverview()}

          {/* Map Section */}
          {showMap && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-navy-800">Location Map</h4>
                {location?.coordinates && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`,
                        '_blank'
                      )
                    }
                  >
                    Open in Google Maps
                  </Button>
                )}
              </div>
              {renderMap()}
            </div>
          )}
        </div>
      </div>
    );
  }
);

LocationHighlights.displayName = 'LocationHighlights';

export default React.memo(LocationHighlights);
