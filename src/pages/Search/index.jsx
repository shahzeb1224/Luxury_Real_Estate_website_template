import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Card, Badge, Input, Select } from '@/components/ui';
import { PropertyCard } from '@/components/property';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  ChevronUp,
  X,
  Home,
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  SlidersHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { SEARCH_PROPERTIES } from '@/data/searchData';

const SearchPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Filter state
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
    yearBuiltMin: '',
    yearBuiltMax: '',
    featured: false,
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const itemsPerPage = 9;

  const debouncedFilters = useDebounce(filters, 300);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...SEARCH_PROPERTIES];

    // Location filter
    if (filters.location) {
      const query = filters.location.toLowerCase().trim();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query)
      );
    }

    // Property type filter
    if (filters.propertyType !== 'all') {
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
    }

    // Purpose filter
    if (filters.purpose !== 'all') {
      result = result.filter((p) => p.purpose === filters.purpose);
    }

    // Price range filter
    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }

    // Bedrooms filter
    if (filters.bedrooms !== 'any') {
      const beds = Number(filters.bedrooms);
      result = result.filter((p) => p.bedrooms >= beds);
    }

    // Bathrooms filter
    if (filters.bathrooms !== 'any') {
      const baths = Number(filters.bathrooms);
      result = result.filter((p) => p.bathrooms >= baths);
    }

    // Area filter
    if (filters.areaMin) {
      result = result.filter((p) => p.area >= Number(filters.areaMin));
    }
    if (filters.areaMax) {
      result = result.filter((p) => p.area <= Number(filters.areaMax));
    }

    // Parking filter
    if (filters.parking !== 'any') {
      const parking = Number(filters.parking);
      result = result.filter((p) => p.parking >= parking);
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    }

    // Featured filter
    if (filters.featured) {
      result = result.filter((p) => p.featured);
    }

    // Year built filter
    if (filters.yearBuiltMin) {
      result = result.filter((p) => p.yearBuilt >= Number(filters.yearBuiltMin));
    }
    if (filters.yearBuiltMax) {
      result = result.filter((p) => p.yearBuilt <= Number(filters.yearBuiltMax));
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
      case 'relevance':
      default:
        // Keep original order or sort by featured first
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
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
      yearBuiltMin: '',
      yearBuiltMax: '',
      featured: false,
    });
    setSortBy('relevance');
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
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

  const bedroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const parkingOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
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
        <title>Search Properties | Elite Real Estate</title>
        <meta
          name="description"
          content="Find your perfect luxury property. Search through our curated collection of premium homes, villas, and estates."
        />
        <link rel="canonical" href="https://eliterealestate.com/search" />
        <meta property="og:title" content="Search Properties | Elite Real Estate" />
        <meta property="og:description" content="Find your perfect luxury property." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="luxury" size="lg" className="mx-auto mb-4">
              <Search className="w-4 h-4 mr-2" />
              Find Your Dream Home
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white leading-[1.08]">
              Find Your Perfect Property
            </h1>
            <p className="text-navy-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Discover your dream home from our curated collection of luxury properties.
            </p>

            {/* Quick Search Bar */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input
                    type="text"
                    placeholder="Search by location or property name..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  />
                </div>
                <div className="sm:w-44">
                  <select
                    value={filters.purpose}
                    onChange={(e) => handleFilterChange('purpose', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  >
                    {purposeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:w-44">
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  >
                    {propertyTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="luxury"
                  size="md"
                  onClick={handleSearch}
                  className="sm:w-auto min-w-[120px]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-6">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-premium p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-navy-50 rounded-lg text-sm font-medium text-navy-700 hover:bg-navy-100 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gold-500 text-white rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="hidden lg:flex flex-wrap items-center gap-3">
                {/* Property Type */}
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  {propertyTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Purpose */}
                <select
                  value={filters.purpose}
                  onChange={(e) => handleFilterChange('purpose', e.target.value)}
                  className="px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  {purposeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Price Range */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    className="w-28 px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 placeholder:text-navy-400"
                  />
                  <span className="text-navy-400">-</span>
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    className="w-28 px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 placeholder:text-navy-400"
                  />
                </div>

                {/* Advanced Filters Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Advanced
                  {showAdvanced ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Right: Sort & View */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-navy-400 hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

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
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-navy-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-navy-500 mb-1">Bedrooms</label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      {bedroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-500 mb-1">
                      Bathrooms
                    </label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      className="w-full px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      {bathroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-500 mb-1">Parking</label>
                    <select
                      value={filters.parking}
                      onChange={(e) => handleFilterChange('parking', e.target.value)}
                      className="w-full px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      {parkingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-500 mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min Area (sqft)"
                      value={filters.areaMin}
                      onChange={(e) => handleFilterChange('areaMin', e.target.value)}
                      className="w-32 px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 placeholder:text-navy-400"
                    />
                    <span className="text-navy-400">-</span>
                    <input
                      type="number"
                      placeholder="Max Area (sqft)"
                      value={filters.areaMax}
                      onChange={(e) => handleFilterChange('areaMax', e.target.value)}
                      className="w-32 px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 placeholder:text-navy-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Year Built (Min)"
                      value={filters.yearBuiltMin}
                      onChange={(e) => handleFilterChange('yearBuiltMin', e.target.value)}
                      className="w-32 px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 placeholder:text-navy-400"
                    />
                    <span className="text-navy-400">-</span>
                    <input
                      type="number"
                      placeholder="Year Built (Max)"
                      value={filters.yearBuiltMax}
                      onChange={(e) => handleFilterChange('yearBuiltMax', e.target.value)}
                      className="w-32 px-3 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 placeholder:text-navy-400"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-sm"
                  >
                    Reset All
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-navy-500">
            {totalResults.toLocaleString()} properties found
            {filters.location && ` in "${filters.location}"`}
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear All Filters
            </button>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div
            className={cn(
              'grid gap-4 sm:gap-6',
              viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
            )}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                  <div className="h-4 bg-navy-100 rounded w-3/4" />
                  <div className="h-3 bg-navy-100 rounded w-1/2" />
                  <div className="h-5 bg-navy-100 rounded w-1/3" />
                  <div className="flex gap-2">
                    <div className="h-3 bg-navy-100 rounded w-12" />
                    <div className="h-3 bg-navy-100 rounded w-12" />
                    <div className="h-3 bg-navy-100 rounded w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedProperties.length > 0 ? (
          <>
            <div
              className={cn(
                'grid gap-4 sm:gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}
            >
              {paginatedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
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
            </div>

            {/* Pagination */}
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

                  if (totalPages > 7 && page > 3 && page < totalPages - 2 && page !== currentPage) {
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
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center bg-white rounded-2xl shadow-premium">
            <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center">
              <Search className="w-10 h-10 text-navy-300" />
            </div>
            <h3 className="text-2xl font-playfair font-semibold text-navy-800 mt-6">
              No Properties Found
            </h3>
            <p className="text-navy-500 max-w-sm mt-2">
              Try adjusting your search filters or explore different locations.
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

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-modal lg:hidden">
            <div
              className="absolute inset-0 bg-overlay"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-premium-xl p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-100">
                <h2 className="text-lg font-semibold text-navy-800">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
                >
                  <X className="w-5 h-5 text-navy-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  >
                    {propertyTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Purpose</label>
                  <select
                    value={filters.purpose}
                    onChange={(e) => handleFilterChange('purpose', e.target.value)}
                    className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  >
                    {purposeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                      className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                      className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">Bedrooms</label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                    >
                      {bedroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      Bathrooms
                    </label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                    >
                      {bathroomOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-navy-100 flex gap-3">
                  <Button
                    variant="luxury"
                    size="md"
                    onClick={() => {
                      handleSearch();
                      setShowMobileFilters(false);
                    }}
                    fullWidth
                  >
                    Apply Filters
                  </Button>
                  <Button variant="ghost" size="md" onClick={handleResetFilters} className="flex-1">
                    Reset
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default React.memo(SearchPage);
