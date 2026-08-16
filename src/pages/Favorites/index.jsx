import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/utils/cn';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatCurrency } from '@/lib/formatters';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Card, Badge, Input } from '@/components/ui';
import { PropertyCard } from '@/components/property';
import Loading from '@/components/shared/Loading';
import { getPropertyImage } from '@/assets/images/properties';
import {
  Heart,
  Search,
  Filter,
  ChevronDown,
  Grid3x3,
  List,
  Home,
  Eye,
  Share2,
  GitCompare,
  X,
  Trash2,
  ArrowRight,
} from 'lucide-react';

// Mock favorites data
const mockFavorites = Array.from({ length: 12 }, (_, i) => ({
  id: `fav-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Oceanfront Villa with Infinity Pool',
    'Modern Penthouse with City Views',
    'Luxury Apartment in Prime Location',
    'Beachfront Estate with Private Access',
    'Contemporary Villa with Garden',
    'Sky Penthouse with Panoramic Views',
    'Waterfront Mansion',
    'Luxury Condo with Amenities',
    'Private Villa with Golf Course View',
    'Modern Townhouse in Gated Community',
    'Luxury Apartment with Sea View',
    'Elegant Villa with Private Pool',
  ][i % 12],
  location: [
    'Beverly Hills, CA',
    'Malibu, CA',
    'Santa Monica, CA',
    'Los Angeles, CA',
    'Orange County, CA',
    'San Francisco, CA',
  ][i % 6],
  price: 850000 + Math.random() * 4500000,
  type: ['Villa', 'Penthouse', 'Apartment', 'Estate', 'Townhouse', 'Mansion'][i % 6],
  purpose: 'sale',
  area: 1800 + Math.random() * 5000,
  bedrooms: Math.floor(2 + Math.random() * 4),
  bathrooms: Math.floor(2 + Math.random() * 3),
  parking: Math.floor(1 + Math.random() * 3),
  status: ['active', 'pending', 'sold'][Math.floor(Math.random() * 3)],
  images: [getPropertyImage(i)],
  featured: i < 3,
  badge: i < 2 ? 'Featured' : i < 4 ? 'Luxury' : null,
  yearBuilt: 2000 + Math.floor(Math.random() * 24),
  savedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const itemsPerPage = 9;

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort favorites
  const filteredFavorites = useMemo(() => {
    let result = [...favorites];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.type.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'recently-added':
        result.sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
    }

    return result;
  }, [favorites, searchQuery, sortBy]);

  // Pagination
  const totalResults = filteredFavorites.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRemoveFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((property) => property.id !== id));
  }, []);

  const handleRemoveSelected = useCallback(() => {
    setFavorites((prev) => prev.filter((property) => !selectedProperties.includes(property.id)));
    setSelectedProperties([]);
  }, [selectedProperties]);

  const handleToggleSelect = useCallback((id) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedProperties.length === paginatedFavorites.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(paginatedFavorites.map((p) => p.id));
    }
  }, [selectedProperties, paginatedFavorites]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFavorites = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      setFavorites([]);
      setSelectedProperties([]);
    }
  }, []);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'recently-added', label: 'Recently Added' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Favorites', href: '/favorites' },
  ];

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Favorites | Elite Real Estate</title>
        <meta
          name="description"
          content="View your saved luxury properties. Manage your favorites and track properties you love."
        />
        <link rel="canonical" href="https://eliterealestate.com/favorites" />
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Header */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800 flex items-center gap-3">
                <Heart className="w-6 h-6 text-gold-500 fill-gold-500" />
                Saved Properties
              </h1>
              <p className="text-navy-500 text-sm mt-0.5">
                {totalResults.toLocaleString()} properties saved
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {selectedProperties.length > 0 && (
                <button
                  onClick={handleRemoveSelected}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-danger-50 text-danger-600 rounded-lg text-sm font-medium hover:bg-danger-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Selected ({selectedProperties.length})
                </button>
              )}

              {favorites.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className="text-sm text-navy-500 hover:text-navy-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Toolbar */}
      <Section padding="sm" background="white" className="border-b border-navy-100">
        <Container>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <Input
                type="text"
                placeholder="Search saved properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="sm"
                leftIcon={<Search className="w-4 h-4 text-navy-400" />}
                className="w-full"
                aria-label="Search favorites"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-3 py-2 pr-8 bg-navy-50 border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 cursor-pointer"
                aria-label="Sort favorites"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
            </div>

            {/* Select All */}
            {paginatedFavorites.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="text-sm text-navy-500 hover:text-navy-700 transition-colors whitespace-nowrap"
              >
                {selectedProperties.length === paginatedFavorites.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
            )}

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
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section padding="lg" background="gray">
        <Container>
          {loading ? (
            // Loading Skeleton
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
                    <div className="flex gap-2 pt-2">
                      <div className="h-8 bg-navy-100 rounded w-1/3" />
                      <div className="h-8 bg-navy-100 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-16 sm:py-20 text-center"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gold-50 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-gold-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center">
                  <Home className="w-4 h-4 text-navy-300" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-navy-800 mt-6">
                No Properties Saved
              </h3>
              <p className="text-navy-500 max-w-sm mt-2">
                Start exploring luxury properties and save your favorites to view them here.
              </p>

              <Link to="/buy" className="mt-6">
                <Button variant="luxury" size="lg" className="min-w-[200px]">
                  Browse Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Discover luxury listings
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Save properties you love
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Get notified on updates
                </span>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-navy-500">
                  Showing {paginatedFavorites.length} of {totalResults.toLocaleString()} properties
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              {/* Favorites Grid */}
              <div
                className={cn(
                  'grid gap-4 sm:gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col'
                )}
              >
                <AnimatePresence mode="wait">
                  {paginatedFavorites.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-3 left-3 z-10">
                        <input
                          type="checkbox"
                          checked={selectedProperties.includes(property.id)}
                          onChange={() => handleToggleSelect(property.id)}
                          className="w-4 h-4 rounded border-navy-300 text-gold-500 focus:ring-gold-500"
                          aria-label={`Select ${property.title}`}
                        />
                      </div>

                      <PropertyCard
                        property={property}
                        variant={viewMode === 'grid' ? 'grid' : 'list'}
                        size="md"
                        isFavorite={true}
                        onFavoriteToggle={handleRemoveFavorite}
                        showActions={true}
                        className={cn(
                          'transition-all duration-300',
                          selectedProperties.includes(property.id) && 'ring-2 ring-gold-500'
                        )}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
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
                    aria-label="Previous page"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;

                    // Show ellipsis for large page counts
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
                        aria-current={isActive ? 'page' : undefined}
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
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* Compare Drawer - Placeholder */}
      {showCompare && selectedProperties.length > 1 && (
        <div className="fixed bottom-0 left-0 right-0 z-sticky bg-white shadow-premium-xl rounded-t-2xl p-4 border-t border-navy-100">
          <div className="container-premium flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-navy-800">
                Compare {selectedProperties.length} properties
              </span>
              <button
                onClick={() => setShowCompare(false)}
                className="text-navy-400 hover:text-navy-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Button variant="luxury" size="sm">
              Compare Now
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(FavoritesPage);
