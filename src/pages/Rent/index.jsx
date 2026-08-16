import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';
import Loading from '@/components/shared/Loading';
import Container from '@/components/shared/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { FilterSidebar, SearchResults } from '@/components/search';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
// Rental Components
import RentHero from '@/components/rent/RentHero';
import RentToolbar from '@/components/rent/RentToolbar';
import RentListingGrid from '@/components/rent/RentListingGrid';
import RentEmptyState from '@/components/rent/RentEmptyState';
import RentCTA from '@/components/rent/RentCTA';
import { RENT_FILTER_DEFAULTS } from '@/components/rent/rent.constants';
import {
  filterRentalProperties,
  sortRentalProperties,
  paginateRentalProperties,
} from '@/components/rent/rent.utils';
import { RENTAL_PROPERTIES } from '@/components/rent/rent.data';

// Lazy load heavy components
const PropertyMapView = lazy(() => import('@/components/maps/PropertyMapView'));
const CompareDrawer = lazy(() => import('@/components/property/CompareDrawer'));

const RentPage = () => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [filters, setFilters] = useState(RENT_FILTER_DEFAULTS);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const debouncedFilters = useDebounce(filters, 300);

  // Load saved favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rentalFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rentalFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = filterRentalProperties(RENTAL_PROPERTIES, filters);
    return sortRentalProperties(filtered, sortBy);
  }, [RENTAL_PROPERTIES, filters, sortBy]);

  // Pagination
  const {
    items: paginatedProperties,
    total,
    totalPages,
  } = paginateRentalProperties(filteredProperties, currentPage, perPage);

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
    setFilters(RENT_FILTER_DEFAULTS);
    setCurrentPage(1);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) =>
      v !== 'all' && v !== 'any' && v !== '' && v !== false && !(Array.isArray(v) && v.length === 0)
  ).length;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Rentals', href: '/rent' },
  ];

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen pt-8"
    >
      <Helmet>
        <title>Luxury Rentals | Elite Real Estate</title>
        <meta
          name="description"
          content="Browse our curated collection of luxury rental properties. Find your perfect home with Elite Real Estate."
        />
        <link rel="canonical" href="https://eliterealestate.com/rent" />
        <meta property="og:title" content="Luxury Rentals | Elite Real Estate" />
        <meta
          property="og:description"
          content="Browse luxury rental properties in premium locations."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <RentHero />

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

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
              isRental={true}
            />
          </div>

          {/* Results */}
          <div className={cn('lg:col-span-3', !showFilters && 'lg:col-span-4')}>
            {/* Toolbar */}
            <RentToolbar
              totalResults={total}
              viewMode={viewMode}
              onViewModeChange={(mode) => {
                setViewMode(mode);
                if (mode === 'map') setShowMap(true);
                else setShowMap(false);
              }}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              activeFiltersCount={activeFiltersCount}
              className="mb-4"
            />

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
            {paginatedProperties.length > 0 ? (
              <>
                <RentListingGrid
                  properties={paginatedProperties}
                  loading={loading}
                  viewMode={viewMode}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  compareList={compareList}
                  onCompareToggle={handleCompareToggle}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <SearchResults
                    properties={paginatedProperties}
                    totalResults={total}
                    loading={loading}
                    view={viewMode}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    perPage={perPage}
                    onPerPageChange={handlePerPageChange}
                    className="bg-transparent mt-6"
                  />
                )}
              </>
            ) : (
              <RentEmptyState onResetFilters={handleResetFilters} />
            )}

            {/* Compare Drawer */}
            {compareList.length > 0 && (
              <Suspense fallback={null}>
                <CompareDrawer
                  properties={compareList
                    .map((id) => RENTAL_PROPERTIES.find((p) => p.id === id))
                    .filter(Boolean)}
                  onRemove={handleCompareToggle}
                  onClear={() => setCompareList([])}
                  isRental={true}
                />
              </Suspense>
            )}
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="py-12">
        <RentCTA />
      </Container>
    </motion.div>
  );
};

export default RentPage;
