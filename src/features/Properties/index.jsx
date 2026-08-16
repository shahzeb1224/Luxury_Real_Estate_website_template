import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Card, Badge, Input, Select } from '@/components/ui';
import { PropertyCard } from '@/components/property';
import { SearchBar, SearchFilters } from '@/components/search';
import { CategoryGrid } from '@/components/categories';
import { Newsletter } from '@/components/sections';
import { CTA } from '@/components/sections';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Home,
  Building2,
  DollarSign,
  Bed,
  Bath,
  Square,
  SlidersHorizontal,
  ArrowUpDown,
  Crown,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { SEARCH_PROPERTIES } from '@/data/searchData';

const PropertiesPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    purpose: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    status: 'all',
    areaMin: '',
    areaMax: '',
    parking: 'any',
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const itemsPerPage = 9;

  const filteredProperties = useMemo(() => {
    let result = [...SEARCH_PROPERTIES];

    if (filters.location) {
      const query = filters.location.toLowerCase().trim();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query)
      );
    }

    if (filters.propertyType !== 'all') {
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
    }

    if (filters.purpose !== 'all') {
      result = result.filter((p) => p.purpose === filters.purpose);
    }

    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }

    if (filters.bedrooms !== 'any') {
      const beds = Number(filters.bedrooms);
      result = result.filter((p) => p.bedrooms >= beds);
    }

    if (filters.bathrooms !== 'any') {
      const baths = Number(filters.bathrooms);
      result = result.filter((p) => p.bathrooms >= baths);
    }

    if (filters.areaMin) {
      result = result.filter((p) => p.area >= Number(filters.areaMin));
    }
    if (filters.areaMax) {
      result = result.filter((p) => p.area <= Number(filters.areaMax));
    }

    if (filters.parking !== 'any') {
      const parking = Number(filters.parking);
      result = result.filter((p) => p.parking >= parking);
    }

    if (filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    }

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
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  const totalResults = filteredProperties.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFavoriteToggle = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      location: '',
      propertyType: 'all',
      purpose: 'all',
      priceMin: '',
      priceMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      status: 'all',
      areaMin: '',
      areaMax: '',
      parking: 'any',
    });
    setSortBy('relevance');
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortOptions = [
    { value: 'relevance', label: 'Recommended' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'estate', label: 'Estate' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
  ];

  const purposeOptions = [
    { value: 'all', label: 'All' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
  ];

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== 'all' && v !== 'any' && v !== '' && v !== false
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
        <title>Properties | Elite Real Estate</title>
        <meta
          name="description"
          content="Browse our curated collection of luxury properties. Find your dream home, villa, or penthouse in prime locations."
        />
        <link rel="canonical" href="https://eliterealestate.com/properties" />
        <meta property="og:title" content="Properties | Elite Real Estate" />
        <meta
          property="og:description"
          content="Browse our curated collection of luxury properties."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
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
              <Home className="w-4 h-4 mr-2" />
              Premium Collection
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Discover Your Perfect Property
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
              Explore our curated collection of luxury homes, villas, and estates in the
              world&apos;s most prestigious locations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link to="#properties">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Browse Properties
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

      {/* Search & Filters */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SearchBar
              variant="elevated"
              size="lg"
              placeholder="Search by location, property, or ZIP"
              className="shadow-premium"
              onSearch={() => {}}
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                <ChevronRight
                  className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-90')}
                />
              </button>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear All
                </button>
              )}
            </div>
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-navy-100">
                    <SearchFilters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onApply={() => setShowFilters(false)}
                      onReset={handleResetFilters}
                      variant="default"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section id="properties" padding="lg" background="white">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-playfair font-semibold text-navy-800">
                {totalResults.toLocaleString()} Properties Found
              </h2>
              <p className="text-sm text-navy-500">
                {filters.location ? `in "${filters.location}"` : 'Across all locations'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-navy-50 border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

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
            <div
              className={cn(
                'grid gap-4 sm:gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                  <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                    <div className="h-4 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                    <div className="h-5 bg-navy-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedProperties.length > 0 ? (
            <>
              <motion.div
                variants={cardVariants.grid.container}
                initial="initial"
                animate="animate"
                className={cn(
                  'grid gap-4 sm:gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col'
                )}
              >
                {paginatedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    variants={cardVariants.grid.item}
                    transition={{ delay: index * 0.03 }}
                  >
                    <PropertyCard
                      property={property}
                      variant={viewMode === 'grid' ? 'grid' : 'list'}
                      size="md"
                      isFavorite={favorites.includes(property.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      showActions={true}
                      featured={property.featured}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      currentPage > 1
                        ? 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;

                    if (
                      totalPages > 7 &&
                      page > 3 &&
                      page < totalPages - 2 &&
                      page !== currentPage
                    ) {
                      if (page === 4 || page === totalPages - 3) {
                        return (
                          <span key={page} className="px-3 py-1.5 text-sm text-navy-400">
                            …
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-navy-800 text-white'
                            : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      currentPage < totalPages
                        ? 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center">
                <Search className="w-10 h-10 text-navy-300" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-navy-800 mt-6">
                No Properties Found
              </h3>
              <p className="text-navy-500 max-w-sm mt-2">
                Try adjusting your filters or explore different locations.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-3 bg-gold-500 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* Newsletter */}
      <Newsletter />

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(PropertiesPage);
