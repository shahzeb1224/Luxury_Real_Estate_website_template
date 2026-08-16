import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Card, Badge, Input } from '@/components/ui';
import { FeaturedProperties, PropertyCard } from '@/components/property';
import { SearchBar } from '@/components/search';
import { Newsletter, CTA } from '@/components/sections';
import {
  MapPin,
  Search,
  ChevronRight,
  Home,
  Building2,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Clock,
  Filter,
  X,
  Grid3x3,
  List,
} from 'lucide-react';
import { SEARCH_PROPERTIES } from '@/data/searchData';
import { getPropertyImage } from '@/assets/images/properties';

// Location data
const LOCATIONS_DATA = [
  {
    id: 'loc-001',
    name: 'Beverly Hills',
    slug: 'beverly-hills',
    image: getPropertyImage(0),
    description: 'Iconic luxury living with world-class shopping, dining, and entertainment.',
    properties: 124,
    averagePrice: 2800000,
    featured: true,
    investmentRating: 4.8,
    highlights: ['Rodeo Drive', 'Beverly Gardens Park', 'The Beverly Hills Hotel'],
    coordinates: { lat: 34.0736, lng: -118.4004 },
  },
  {
    id: 'loc-002',
    name: 'Malibu',
    slug: 'malibu',
    image: getPropertyImage(1),
    description: 'Coastal paradise with stunning ocean views and beachfront estates.',
    properties: 87,
    averagePrice: 3200000,
    featured: true,
    investmentRating: 4.7,
    highlights: ['Malibu Pier', 'Getty Villa', 'Zuma Beach'],
    coordinates: { lat: 34.0259, lng: -118.7798 },
  },
  {
    id: 'loc-003',
    name: 'Santa Monica',
    slug: 'santa-monica',
    image: getPropertyImage(2),
    description: 'Vibrant beach city with a perfect blend of urban and coastal living.',
    properties: 95,
    averagePrice: 1800000,
    featured: false,
    investmentRating: 4.5,
    highlights: ['Santa Monica Pier', 'Third Street Promenade', 'Montana Avenue'],
    coordinates: { lat: 34.0195, lng: -118.4912 },
  },
  {
    id: 'loc-004',
    name: 'Downtown LA',
    slug: 'downtown-la',
    image: getPropertyImage(9),
    description: 'Urban hub of commerce, culture, and modern luxury living.',
    properties: 156,
    averagePrice: 950000,
    featured: false,
    investmentRating: 4.2,
    highlights: ['Walt Disney Concert Hall', 'The Broad Museum', 'LA Live'],
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 'loc-005',
    name: 'Orange County',
    slug: 'orange-county',
    image: getPropertyImage(4),
    description: 'Prestigious coastal communities with exceptional schools and amenities.',
    properties: 112,
    averagePrice: 1500000,
    featured: false,
    investmentRating: 4.4,
    highlights: ['Newport Beach', 'South Coast Plaza', 'Fashion Island'],
    coordinates: { lat: 33.7175, lng: -117.8311 },
  },
  {
    id: 'loc-006',
    name: 'San Francisco',
    slug: 'san-francisco',
    image: getPropertyImage(10),
    description: 'Iconic city known for innovation, culture, and stunning architecture.',
    properties: 98,
    averagePrice: 2100000,
    featured: false,
    investmentRating: 4.6,
    highlights: ['Golden Gate Bridge', "Fisherman's Wharf", 'Union Square'],
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
];

const LocationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Filter locations based on search
  const filteredLocations = useMemo(() => {
    if (!searchQuery) return LOCATIONS_DATA;
    const query = searchQuery.toLowerCase().trim();
    return LOCATIONS_DATA.filter(
      (loc) =>
        loc.name.toLowerCase().includes(query) ||
        loc.description.toLowerCase().includes(query) ||
        loc.highlights.some((h) => h.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Get featured locations
  const featuredLocations = LOCATIONS_DATA.filter((loc) => loc.featured);

  // Get properties for selected location
  const locationProperties = useMemo(() => {
    if (!selectedLocation) return [];
    return SEARCH_PROPERTIES.filter((p) =>
      p.location.toLowerCase().includes(selectedLocation.name.toLowerCase())
    ).slice(0, 6);
  }, [selectedLocation]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
  ];

  // Get investment rating stars
  const getInvestmentStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
        ))}
        {hasHalf && <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500 opacity-50" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-navy-200" />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Premium Locations | Elite Real Estate</title>
        <meta
          name="description"
          content="Explore premium locations and communities. Discover luxury properties in Beverly Hills, Malibu, Santa Monica, and more."
        />
        <link rel="canonical" href="https://eliterealestate.com/locations" />
        <meta property="og:title" content="Premium Locations | Elite Real Estate" />
        <meta property="og:description" content="Explore premium locations and communities." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Premium Locations',
            description: 'Explore premium locations and communities',
            url: 'https://eliterealestate.com/locations',
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="luxury" size="lg" className="mx-auto mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Explore Prime Locations
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Discover Premium Communities
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
              Explore the world's most prestigious locations and find your perfect property in the
              finest neighborhoods.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link to="#locations">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Explore Locations
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="lg" className="min-w-[180px]">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Search & Filter */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <SearchBar
                variant="elevated"
                size="md"
                placeholder="Search locations by name, description, or highlights..."
                className="shadow-premium"
                location={searchQuery}
                onLocationChange={setSearchQuery}
                propertyType="all"
                onPropertyTypeChange={() => {}}
                priceRange="all"
                onPriceRangeChange={() => {}}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Locations Grid */}
      <Section id="locations" padding="lg" background="gray">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-playfair font-semibold text-navy-800">
                {filteredLocations.length} Premium Locations
              </h2>
              <p className="text-sm text-navy-500">
                {searchQuery
                  ? `Showing results for "${searchQuery}"`
                  : 'Discover our featured communities'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-navy-50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-navy-400 hover:text-navy-600'
                  )}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    viewMode === 'list'
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-navy-400 hover:text-navy-600'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-2xl" />
                  <div className="mt-4 space-y-2">
                    <div className="h-6 bg-navy-100 rounded w-3/4" />
                    <div className="h-4 bg-navy-100 rounded w-1/2" />
                    <div className="h-4 bg-navy-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredLocations.length > 0 ? (
            <div
              className={cn(
                'grid gap-4 sm:gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}
            >
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  variants={cardVariants.grid.item}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLocationClick(location)}
                  className="cursor-pointer group"
                >
                  <Card
                    padding="none"
                    hoverable
                    className="overflow-hidden transition-all duration-500 hover:shadow-premium-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent z-10" />
                      <img
                        src={location.image}
                        alt={`${location.name} luxury real estate`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {location.featured && (
                        <Badge variant="luxury" size="sm" className="absolute top-3 left-3 z-20">
                          Featured
                        </Badge>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                        <h3 className="text-xl font-playfair font-semibold">{location.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-white/80">
                            {location.properties} properties
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="text-sm text-gold-400 font-semibold">
                            {formatCurrency(location.averagePrice)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getInvestmentStars(location.investmentRating)}
                          <span className="text-xs text-white/60">
                            {location.investmentRating} / 5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="text-sm text-navy-500 line-clamp-2">{location.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {location.highlights.slice(0, 3).map((highlight, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-navy-50 text-navy-600 text-xs rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-navy-100">
                        <span className="text-xs text-navy-400">
                          {location.properties} properties available
                        </span>
                        <span className="text-xs font-medium text-gold-500 group-hover:text-gold-600 transition-colors flex items-center gap-1">
                          Explore Area
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center">
                <Search className="w-10 h-10 text-navy-300" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-navy-800 mt-6">
                No Locations Found
              </h3>
              <p className="text-navy-500 max-w-sm mt-2">
                Try adjusting your search or explore our featured locations.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-3 bg-gold-500 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* Selected Location Properties */}
      {selectedLocation && (
        <Section padding="lg" background="white">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-navy-800">
                  Properties in {selectedLocation.name}
                </h2>
                <p className="text-sm text-navy-500">
                  {locationProperties.length} properties available
                </p>
              </div>
              <button
                onClick={clearSelectedLocation}
                className="flex items-center gap-1 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Selection
              </button>
            </div>

            {locationProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {locationProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    variant="grid"
                    size="md"
                    showActions={true}
                    featured={property.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-navy-500">No properties available in this location.</p>
              </div>
            )}

            {locationProperties.length > 0 && (
              <div className="text-center mt-6">
                <Link to={`/properties?location=${selectedLocation.name}`}>
                  <Button variant="outline" size="md">
                    View All Properties in {selectedLocation.name}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* Newsletter */}
      <Newsletter />

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(LocationsPage);
