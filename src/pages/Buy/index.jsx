import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatCurrency, formatArea } from '@/lib/formatters';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Card, Badge, Input, Select } from '@/components/ui';
import { SearchBar, SearchFilters } from '@/components/search';
import { PropertyCard, FeaturedProperties, PropertyCarousel } from '@/components/property';
import { NewsletterForm } from '@/components/forms';
import { FAQ } from '@/components/sections';
import Loading from '@/components/shared/Loading';
import { getPropertyImage } from '@/assets/images/properties';
import { getAgentImage } from '@/assets/images/agents';
import {
  Search,
  MapPin,
  Home,
  Building2,
  Bed,
  Bath,
  Square,
  TrendingUp,
  DollarSign,
  Shield,
  Users,
  Award,
  Clock,
  ChevronRight,
  Filter,
  Grid3x3,
  List,
  Calendar,
  Phone,
  MessageCircle,
  Star,
  CheckCircle,
  Crown,
  Calculator,
} from 'lucide-react';
import FAQAccordion from '../../components/sections/Awards/FAQ/FAQAccordion';

// Mock property data
const mockProperties = Array.from({ length: 12 }, (_, i) => ({
  id: `buy-${String(i + 1).padStart(3, '0')}`,
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
  status: 'active',
  images: [getPropertyImage(i)],
  featured: i < 4,
  badge: i < 2 ? 'Featured' : i < 4 ? 'Luxury' : null,
  yearBuilt: 2000 + Math.floor(Math.random() * 24),
}));

// Neighborhood data
const neighborhoods = [
  {
    id: 'nb-001',
    name: 'Beverly Hills',
    image: getPropertyImage(0),
    avgPrice: 2800000,
    schools: 12,
    hospitals: 4,
    parks: 8,
    transport: 6,
  },
  {
    id: 'nb-002',
    name: 'Malibu',
    image: getPropertyImage(1),
    avgPrice: 3200000,
    schools: 8,
    hospitals: 3,
    parks: 10,
    transport: 4,
  },
  {
    id: 'nb-003',
    name: 'Santa Monica',
    image: getPropertyImage(2),
    avgPrice: 1800000,
    schools: 10,
    hospitals: 5,
    parks: 12,
    transport: 8,
  },
  {
    id: 'nb-004',
    name: 'Downtown LA',
    image: getPropertyImage(9),
    avgPrice: 950000,
    schools: 6,
    hospitals: 6,
    parks: 6,
    transport: 10,
  },
];

// Investment opportunities
const investmentData = [
  { label: 'Expected ROI', value: '8.5%', icon: TrendingUp, color: 'gold' },
  { label: 'Rental Yield', value: '4.8%', icon: DollarSign, color: 'navy' },
  { label: 'Capital Appreciation', value: '12.2%', icon: Award, color: 'gold' },
  { label: 'Market Trend', value: 'Growing', icon: TrendingUp, color: 'navy' },
];

// Why buy with us
const whyBuyData = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Every property is verified and authenticated.',
  },
  {
    icon: Users,
    title: 'Legal Assistance',
    description: 'Expert legal support for smooth transactions.',
  },
  {
    icon: Award,
    title: 'Investment Experts',
    description: 'Strategic guidance from investment specialists.',
  },
  {
    icon: CheckCircle,
    title: 'Mortgage Support',
    description: 'Competitive financing options for your purchase.',
  },
  {
    icon: Clock,
    title: 'After Sales Service',
    description: 'Comprehensive support after your purchase.',
  },
  {
    icon: Crown,
    title: 'Golden Visa Assistance',
    description: 'Expert guidance for residency programs.',
  },
];

// Buying process steps
const buyingSteps = [
  { number: 1, title: 'Search', description: 'Browse our curated properties' },
  { number: 2, title: 'Consultation', description: 'Expert guidance and advice' },
  { number: 3, title: 'Visit', description: 'Private viewings of shortlisted properties' },
  { number: 4, title: 'Legal', description: 'Due diligence and documentation' },
  { number: 5, title: 'Payment', description: 'Secure and transparent transaction' },
  { number: 6, title: 'Ownership', description: 'Welcome to your new home' },
];

// Testimonials
const testimonials = [
  {
    id: 'tst-001',
    name: 'Michael & Lisa Chen',
    location: 'Beverly Hills, CA',
    image: getAgentImage(1),
    rating: 5,
    review:
      'Elite Real Estate made our dream home a reality. Their expertise and dedication were unmatched.',
    property: 'Oceanfront Villa, Malibu',
  },
  {
    id: 'tst-002',
    name: 'Jennifer Williams',
    location: 'Malibu, CA',
    image: getAgentImage(2),
    rating: 5,
    review:
      'Selling our beachfront property was effortless. The marketing strategy and negotiation skills were exceptional.',
    property: 'Beachfront Estate, Malibu',
  },
  {
    id: 'tst-003',
    name: 'David & Sarah Anderson',
    location: 'Santa Monica, CA',
    image: getAgentImage(0),
    rating: 4.5,
    review: "We couldn't be happier with our new penthouse. The team went above and beyond.",
    property: 'Modern Penthouse, Santa Monica',
  },
];

const BuyPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    areaMin: '',
    areaMax: '',
    amenities: [],
    sortBy: 'relevance',
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      propertyType: 'all',
      priceMin: '',
      priceMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      areaMin: '',
      areaMax: '',
      amenities: [],
      sortBy: 'relevance',
    });
  };

  const filteredProperties = useMemo(() => {
    let result = [...mockProperties];

    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.propertyType !== 'all') {
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
    }

    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }

    if (filters.bedrooms !== 'any') {
      result = result.filter((p) => p.bedrooms >= Number(filters.bedrooms));
    }

    if (filters.bathrooms !== 'any') {
      result = result.filter((p) => p.bathrooms >= Number(filters.bathrooms));
    }

    if (filters.areaMin) {
      result = result.filter((p) => p.area >= Number(filters.areaMin));
    }
    if (filters.areaMax) {
      result = result.filter((p) => p.area <= Number(filters.areaMax));
    }

    switch (filters.sortBy) {
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
  }, [filters]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Buy', href: '/buy' },
  ];

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white min-h-screen"
    >
      <Helmet>
        <title>Buy Luxury Properties | Elite Real Estate</title>
        <meta
          name="description"
          content="Discover premium luxury properties for sale. Browse villas, penthouses, and estates in the world's most prestigious locations."
        />
        <link rel="canonical" href="https://eliterealestate.com/buy" />
        <meta property="og:title" content="Buy Luxury Properties | Elite Real Estate" />
        <meta property="og:description" content="Discover premium luxury properties for sale." />
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
              Premium Properties
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Find Your Dream Property
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
              Luxury living begins with the perfect home. Discover our curated collection of premium
              properties.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link to="#properties">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Explore Properties
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="lg" className="min-w-[180px]">
                  Schedule Consultation
                  <Calendar className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Quick Search */}
            <div className="mt-8 max-w-4xl mx-auto">
              <SearchBar
                variant="elevated"
                size="lg"
                placeholder="Search by location, property type, or price"
                className="shadow-premium-lg"
                onSearch={(filters) => {
                  // Handle search
                }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-navy-300">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Verified Listings
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Expert Guidance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Premium Service
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter Section */}
      <Section id="filters" padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  showFilters
                    ? 'bg-navy-800 text-white'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
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

            <div className="flex items-center gap-3">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                className="px-3 py-2 bg-navy-50 border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
                aria-label="Sort properties"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <span className="text-sm text-navy-500 hidden sm:block">
                {filteredProperties.length} properties
              </span>
            </div>
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
        </Container>
      </Section>

      {/* Featured Properties */}
      <Section id="properties" padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Featured Properties"
            subtitle="Curated selection of premium homes"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {mockProperties.slice(0, 6).map((property, index) => (
              <motion.div
                key={property.id}
                variants={cardVariants.grid.item}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  variant="grid"
                  size="md"
                  isFavorite={favorites.includes(property.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  showActions={true}
                  featured={property.featured}
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="#properties">
              <Button variant="outline" size="md" className="min-w-[200px]">
                View All Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Why Buy With Us */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Why Buy With Us"
            subtitle="Excellence in every transaction"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {whyBuyData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card padding="lg" hoverable className="text-center h-full border-gold-100/30">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gold-50 rounded-full">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-navy-800">{item.title}</h4>
                    <p className="text-sm text-navy-500 mt-1">{item.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Investment Opportunities */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Investment Opportunities"
            subtitle="Data-driven insights for smart investments"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
            {investmentData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card
                    padding="lg"
                    className={cn(
                      'text-center h-full border',
                      item.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                    )}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-full w-fit mx-auto mb-2',
                        item.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-5 h-5',
                          item.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        'text-2xl font-playfair font-bold',
                        item.color === 'gold' ? 'text-gold-500' : 'text-navy-800'
                      )}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs text-navy-500 mt-1">{item.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Neighborhood Showcase */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Neighborhood Showcase"
            subtitle="Discover premium communities"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card
                  padding="none"
                  className="overflow-hidden hover:shadow-premium-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-navy-100 relative overflow-hidden">
                    <img
                      src={neighborhood.image}
                      alt={`${neighborhood.name} properties`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="font-playfair font-semibold text-lg">{neighborhood.name}</h4>
                      <p className="text-sm text-white/70">
                        {formatCurrency(neighborhood.avgPrice)} average
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-3 text-xs text-navy-500">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        {neighborhood.schools} Schools
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        {neighborhood.hospitals} Hospitals
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        {neighborhood.parks} Parks
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        {neighborhood.transport} Transport
                      </span>
                    </div>
                    <Link to={`/buy?location=${neighborhood.name}`} className="block">
                      <Button variant="outline" size="sm" fullWidth className="mt-2">
                        Explore Area
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Buying Process */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Simple Buying Process"
            subtitle="Your journey to luxury living"
            align="center"
            size="md"
          />
          <div className="relative mt-8">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold-200 -translate-x-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {buyingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={cn(
                    'relative flex items-start gap-4',
                    index % 2 === 0 ? 'lg:pr-12 lg:text-right lg:flex-row-reverse' : 'lg:pl-12'
                  )}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center font-bold text-sm z-10">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800">{step.title}</h4>
                    <p className="text-sm text-navy-500">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Real stories from real clients"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card padding="lg" hoverable className="h-full border-gold-100/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-navy-100 flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-800 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-navy-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3.5 h-3.5',
                          i < testimonial.rating ? 'fill-gold-500 text-gold-500' : 'text-navy-200'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-navy-600 leading-relaxed">&quot;{testimonial.review}&quot;</p>
                  <p className="text-xs text-navy-400 mt-2">Purchased: {testimonial.property}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mortgage Calculator CTA */}
      <Section padding="lg" background="gray">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                Calculate Your Monthly Payment
              </h3>
              <p className="text-navy-300 mt-3 max-w-2xl mx-auto">
                Get an estimate of your monthly mortgage payments based on current rates.
              </p>
              <Link to="/mortgage-calculator">
                <Button variant="luxury" size="lg" className="mt-6 min-w-[200px]">
                  Use Mortgage Calculator
                  <Calculator className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ - Reuse existing component */}
      <FAQAccordion />

      {/* Newsletter */}
      <Section padding="lg" background="white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader
              title="Stay Informed"
              subtitle="Subscribe for exclusive property updates"
              align="center"
              size="md"
            />
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="luxury" size="lg" className="mx-auto mb-4">
                <Home className="w-4 h-4 mr-2" />
                Dream Home
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Ready to Own Your Dream Property?
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Our expert team is ready to guide you through every step of your property journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/contact">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    Contact Our Experts
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="#properties">
                  <Button variant="glass" size="lg" className="min-w-[180px]">
                    Book Viewing
                    <Calendar className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Free Consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  No Obligation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Expert Guidance
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(BuyPage);
