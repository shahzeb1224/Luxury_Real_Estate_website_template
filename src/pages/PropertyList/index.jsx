import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';
import Loading from '@/components/shared/Loading';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PropertyCard from '@/components/property/PropertyCard';
import SearchFilters from '@/components/search/SearchFilters';
import FilterSidebar from '@/components/search/FilterSidebar';
import SearchResults from '@/components/search/SearchResults';
import { Button } from '@/components/ui';
import { getPropertyImage } from '@/assets/images/properties';
import { getAgentImage } from '@/assets/images/agents';
import {
  Grid3x3,
  List,
  Map as MapIcon,
  SlidersHorizontal,
  Heart,
  GitCompare,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
} from 'lucide-react';

// Lazy load heavy components
const PropertyMapView = lazy(() => import('@/components/maps/PropertyMapView'));
const CompareDrawer = lazy(() => import('@/components/property/CompareDrawer'));

// Mock property data
const mockProperties = Array.from({ length: 48 }, (_, i) => ({
  id: `prop-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Modern Villa with Ocean View',
    'Contemporary Penthouse',
    'Beachfront Estate',
    'Luxury Apartment',
    'Custom Home',
    'Waterfront Villa',
  ][i % 6],
  location: [
    'Beverly Hills, CA',
    'Malibu, CA',
    'Los Angeles, CA',
    'Santa Monica, CA',
    'Orange County, CA',
  ][i % 5],
  price: 500000 + Math.random() * 4500000,
  type: ['Villa', 'Penthouse', 'Estate', 'Apartment', 'House'][i % 5],
  purpose: ['sale', 'rent'][i % 2],
  area: 1500 + Math.random() * 5000,
  bedrooms: Math.floor(2 + Math.random() * 4),
  bathrooms: Math.floor(2 + Math.random() * 3),
  parking: Math.floor(1 + Math.random() * 3),
  status: ['active', 'pending', 'sold'][Math.floor(Math.random() * 3)],
  images: [getPropertyImage(i)],
  featured: i < 6,
  badge: i < 3 ? 'Featured' : i < 6 ? 'New' : null,
  yearBuilt: 2000 + Math.floor(Math.random() * 24),
  floor: Math.floor(Math.random() * 20) + 1,
  furnished: Math.random() > 0.5,
  petFriendly: Math.random() > 0.5,
  pool: Math.random() > 0.6,
  garage: Math.random() > 0.5,
  garden: Math.random() > 0.5,
  waterfront: Math.random() > 0.8,
  agent: {
    id: `agt-${String((i % 3) + 1).padStart(3, '0')}`,
    name: ['Sarah Johnson', 'Michael Chen', 'Jennifer Williams'][i % 3],
    image: getAgentImage(i),
  },
}));

const PropertyListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [filters, setFilters] = useState({
    transactionType: searchParams.get('type') || 'all',
    propertyType: searchParams.get('category') || 'all',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    features: [],
    furnished: false,
    petFriendly: false,
    pool: false,
    garage: false,
    garden: false,
    waterfront: false,
    yearBuiltMin: '',
    yearBuiltMax: '',
    floors: 'any',
    status: 'active',
  });

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const debouncedFilters = useDebounce(filters, 300);

  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('propertyFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by transaction type
    if (filters.transactionType !== 'all') {
      result = result.filter((p) => p.purpose === filters.transactionType);
    }

    // Filter by property type
    if (filters.propertyType !== 'all') {
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
    }

    // Filter by price range
    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }

    // Filter by area range
    if (filters.areaMin) {
      result = result.filter((p) => p.area >= Number(filters.areaMin));
    }
    if (filters.areaMax) {
      result = result.filter((p) => p.area <= Number(filters.areaMax));
    }

    // Filter by bedrooms
    if (filters.bedrooms !== 'any') {
      const beds = Number(filters.bedrooms);
      result = result.filter((p) => p.bedrooms >= beds);
    }

    // Filter by bathrooms
    if (filters.bathrooms !== 'any') {
      const baths = Number(filters.bathrooms);
      result = result.filter((p) => p.bathrooms >= baths);
    }

    // Filter by features
    if (filters.features.length > 0) {
      filters.features.forEach((feature) => {
        result = result.filter((p) => p[feature] === true);
      });
    }

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      case 'oldest':
        result.sort((a, b) => a.yearBuilt - b.yearBuilt);
        break;
      case 'beds':
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'baths':
        result.sort((a, b) => b.bathrooms - a.bathrooms);
        break;
      case 'relevance':
      default:
        // Keep original order
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  // Pagination
  const totalResults = filteredProperties.length;
  const totalPages = Math.ceil(totalResults / perPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  const handleCompareToggle = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cid) => cid !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      transactionType: 'all',
      propertyType: 'all',
      priceMin: '',
      priceMax: '',
      areaMin: '',
      areaMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      features: [],
      furnished: false,
      petFriendly: false,
      pool: false,
      garage: false,
      garden: false,
      waterfront: false,
      yearBuiltMin: '',
      yearBuiltMax: '',
      floors: 'any',
      status: 'active',
    });
    setCurrentPage(1);
  };

  const getSortLabel = (value) => {
    const labels = {
      relevance: 'Relevance',
      'price-asc': 'Price: Low to High',
      'price-desc': 'Price: High to Low',
      newest: 'Newest First',
      oldest: 'Oldest First',
      beds: 'Most Beds',
      baths: 'Most Baths',
    };
    return labels[value] || value;
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/buy' },
  ];

  const activeFiltersCount = Object.values(filters).filter(
    (v) =>
      v !== 'all' && v !== 'any' && v !== '' && v !== false && !(Array.isArray(v) && v.length === 0)
  ).length;

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Properties for Sale | Elite Real Estate</title>
        <meta
          name="description"
          content="Browse our curated collection of luxury properties. Find your dream home with Elite Real Estate."
        />
        <link rel="canonical" href="https://eliterealestate.com/buy" />
        <meta property="og:title" content="Properties for Sale | Elite Real Estate" />
        <meta
          property="og:description"
          content="Browse luxury properties for sale in premium locations."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Page Header */}
      <Section padding="sm" background="white" className="border-b border-navy-100">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
                Luxury Properties
              </h1>
              <p className="text-navy-500 text-sm">
                {totalResults.toLocaleString()} properties available
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Sort */}
              <div className="flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 bg-white border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                  aria-label="Sort properties"
                >
                  {[
                    'relevance',
                    'price-asc',
                    'price-desc',
                    'newest',
                    'oldest',
                    'beds',
                    'baths',
                  ].map((option) => (
                    <option key={option} value={option}>
                      {getSortLabel(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-navy-50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-navy-400 hover:text-navy-600'
                  )}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
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
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    showMap
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-navy-400 hover:text-navy-600'
                  )}
                  aria-label="Map view"
                  aria-pressed={showMap}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  showFilters || activeFiltersCount > 0
                    ? 'bg-navy-800 text-white'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Container className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className={cn('hidden lg:block', !showFilters && 'lg:col-span-0 lg:hidden')}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={() => {}}
              onReset={handleResetFilters}
              desktopBreakpoint="lg"
            />
          </div>

          {/* Results */}
          <div className={cn('lg:col-span-3', !showFilters && 'lg:col-span-4')}>
            {/* Results Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white p-3 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 text-sm text-navy-500">
                <span>
                  Showing {(currentPage - 1) * perPage + 1}-
                  {Math.min(currentPage * perPage, totalResults)} of {totalResults.toLocaleString()}
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-gold-600 hover:text-gold-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Active Filters Tags */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {filters.transactionType !== 'all' && (
                    <span className="px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-full">
                      {filters.transactionType}
                      <button
                        onClick={() => handleFilterChange({ ...filters, transactionType: 'all' })}
                        className="ml-1 hover:text-navy-800"
                      >
                        <X className="w-3 h-3 inline" />
                      </button>
                    </span>
                  )}
                  {filters.propertyType !== 'all' && (
                    <span className="px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-full">
                      {filters.propertyType}
                      <button
                        onClick={() => handleFilterChange({ ...filters, propertyType: 'all' })}
                        className="ml-1 hover:text-navy-800"
                      >
                        <X className="w-3 h-3 inline" />
                      </button>
                    </span>
                  )}
                  {filters.priceMin && (
                    <span className="px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-full">
                      ${Number(filters.priceMin).toLocaleString()}+
                      <button
                        onClick={() => handleFilterChange({ ...filters, priceMin: '' })}
                        className="ml-1 hover:text-navy-800"
                      >
                        <X className="w-3 h-3 inline" />
                      </button>
                    </span>
                  )}
                  {filters.priceMax && (
                    <span className="px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-full">
                      ${Number(filters.priceMax).toLocaleString()}-
                      <button
                        onClick={() => handleFilterChange({ ...filters, priceMax: '' })}
                        className="ml-1 hover:text-navy-800"
                      >
                        <X className="w-3 h-3 inline" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Map View */}
            {showMap && (
              <div className="mb-6 h-96 rounded-xl overflow-hidden border border-navy-100">
                <Suspense fallback={<Loading className="h-full" />}>
                  <PropertyMapView
                    properties={paginatedProperties}
                    center={[34.0522, -118.2437]}
                    zoom={10}
                  />
                </Suspense>
              </div>
            )}

            {/* Results Grid */}
            <SearchResults
              properties={paginatedProperties}
              totalResults={totalResults}
              loading={loading}
              view={viewMode}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
              className="bg-transparent"
              gridClassName={
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'flex flex-col'
              }
              emptyTitle="No properties found"
              emptyDescription="Try adjusting your search filters to find more properties."
            />

            {/* Compare Drawer */}
            {compareList.length > 0 && (
              <Suspense fallback={null}>
                <CompareDrawer
                  properties={compareList
                    .map((id) => properties.find((p) => p.id === id))
                    .filter(Boolean)}
                  onRemove={handleCompareToggle}
                  onClear={() => setCompareList([])}
                />
              </Suspense>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && isMobile && (
          <div className="fixed inset-0 z-modal lg:hidden">
            <div className="absolute inset-0 bg-overlay"  onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-premium-xl p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-100">
                <h2 className="text-lg font-semibold text-navy-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
                >
                  <X className="w-5 h-5 text-navy-400" />
                </button>
              </div>

              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onApply={() => setShowFilters(false)}
                onReset={handleResetFilters}
                variant="default"
              />

              <div className="flex gap-3 mt-6 pt-4 border-t border-navy-100">
                <Button
                  variant="luxury"
                  size="md"
                  onClick={() => setShowFilters(false)}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
                <Button variant="ghost" size="md" onClick={handleResetFilters} className="flex-1">
                  Reset All
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyListPage;
