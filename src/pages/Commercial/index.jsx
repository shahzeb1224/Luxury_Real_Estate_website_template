import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';
import Loading from '@/components/shared/Loading';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SearchBar, SearchFilters, FilterSidebar } from '@/components/search';
import { FeaturedProperties, PropertyCard, PropertyCarousel } from '@/components/property';
import { Button, Badge, Card } from '@/components/ui';
import { getPropertyImage } from '@/assets/images/properties';
import { getAgentImage } from '@/assets/images/agents';
import {
  Building2,
  Store,
  Warehouse,
  ShoppingBag,
  Factory,
  Briefcase,
  TrendingUp,
  DollarSign,
  MapPin,
  Users,
  Award,
  Clock,
  ChevronRight,
  Building,
  LandPlot,
  BarChart,
} from 'lucide-react';

// Lazy load heavy components
const PropertyMapView = lazy(() => import('@/components/maps/PropertyMapView'));

// Mock commercial property data
const commercialProperties = Array.from({ length: 18 }, (_, i) => ({
  id: `comm-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Premium Office Tower',
    'Retail Space on Rodeo Drive',
    'Warehouse & Distribution Center',
    'Shopping Mall Complex',
    'Commercial Plaza',
    'Industrial Park',
    'Investment Office Building',
    'Retail Storefront',
    'Mixed-Use Commercial Building',
  ][i % 9],
  location: [
    'Downtown LA, CA',
    'Beverly Hills, CA',
    'Industrial District, CA',
    'Santa Monica, CA',
    'Orange County, CA',
    'San Francisco, CA',
    'New York, NY',
    'Miami, FL',
    'Chicago, IL',
  ][i % 9],
  price: 500000 + Math.random() * 15000000,
  type: ['Office', 'Retail', 'Warehouse', 'Market', 'Plaza', 'Industrial', 'Commercial Plot'][
    i % 7
  ],
  purpose: ['sale', 'lease'][i % 2],
  area: 1000 + Math.random() * 50000,
  bedrooms: 0,
  bathrooms: 0,
  parking: Math.floor(5 + Math.random() * 50),
  status: ['active', 'pending', 'sold'][Math.floor(Math.random() * 3)],
  images: [getPropertyImage(i + 9)],
  featured: i < 4,
  badge: i < 3 ? 'Featured' : i < 6 ? 'Investment' : null,
  yearBuilt: 1990 + Math.floor(Math.random() * 34),
  floors: Math.floor(1 + Math.random() * 20),
  zoning: ['Commercial', 'Mixed-Use', 'Industrial', 'Retail'][Math.floor(Math.random() * 4)],
  leaseTerm: ['Monthly', 'Yearly', 'Long-Term'][Math.floor(Math.random() * 3)],
  capRate: (4 + Math.random() * 6).toFixed(1),
  roi: (6 + Math.random() * 10).toFixed(1),
  agent: {
    id: `agt-${String((i % 3) + 1).padStart(3, '0')}`,
    name: ['Sarah Johnson', 'Michael Chen', 'Jennifer Williams'][i % 3],
    image: getAgentImage(i),
  },
}));

// Commercial categories
const commercialCategories = [
  {
    id: 'office',
    icon: Building2,
    label: 'Office Spaces',
    description: 'Premium office spaces in prime locations',
    count: 45,
    color: 'navy',
  },
  {
    id: 'retail',
    icon: Store,
    label: 'Retail Stores',
    description: 'High-footfall retail spaces',
    count: 32,
    color: 'gold',
  },
  {
    id: 'warehouse',
    icon: Warehouse,
    label: 'Warehouses',
    description: 'Large-scale storage and distribution',
    count: 28,
    color: 'navy',
  },
  {
    id: 'market',
    icon: ShoppingBag,
    label: 'Markets & Plazas',
    description: 'Community and commercial markets',
    count: 19,
    color: 'gold',
  },
  {
    id: 'industrial',
    icon: Factory,
    label: 'Industrial Units',
    description: 'Manufacturing and industrial spaces',
    count: 24,
    color: 'navy',
  },
  {
    id: 'commercial-plot',
    icon: LandPlot,
    label: 'Commercial Plots',
    description: 'Prime land for commercial development',
    count: 15,
    color: 'gold',
  },
];

// Investment advantages
const investmentAdvantages = [
  {
    icon: TrendingUp,
    title: 'High ROI Potential',
    description: 'Commercial properties offer superior returns with long-term appreciation.',
  },
  {
    icon: DollarSign,
    title: 'Stable Rental Income',
    description: 'Reliable monthly income from commercial tenants with long-term leases.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Properties in strategic business districts and high-traffic areas.',
  },
  {
    icon: Building,
    title: 'Long-term Value',
    description: 'Commercial real estate consistently appreciates in value over time.',
  },
];

// Commercial services
const commercialServices = [
  {
    icon: Building2,
    title: 'Commercial Buying',
    description: 'Expert guidance for purchasing commercial properties.',
    href: '/services/commercial-buying',
  },
  {
    icon: TrendingUp,
    title: 'Commercial Selling',
    description: 'Maximize value when selling your commercial assets.',
    href: '/services/commercial-selling',
  },
  {
    icon: Briefcase,
    title: 'Leasing & Rentals',
    description: 'Find the perfect commercial space for your business.',
    href: '/services/commercial-leasing',
  },
  {
    icon: Users,
    title: 'Property Management',
    description: 'Full-service management for commercial properties.',
    href: '/services/property-management',
  },
  {
    icon: Award,
    title: 'Investment Consulting',
    description: 'Strategic advice for commercial real estate investments.',
    href: '/services/investment-consulting',
  },
  {
    icon: Building2,
    title: 'Development Advisory',
    description: 'Expert guidance for commercial development projects.',
    href: '/services/development-advisory',
  },
];

// Commercial statistics
const commercialStats = [
  { label: 'Commercial Listings', value: '350+', icon: Building2 },
  { label: 'Investment Growth', value: '12.5%', icon: TrendingUp },
  { label: 'Average ROI', value: '8.2%', icon: BarChart },
  { label: 'Client Satisfaction', value: '97%', icon: Users },
];

const CommercialPage = () => {
  const [filters, setFilters] = useState({
    transactionType: 'all',
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    parking: 'any',
    floors: 'any',
    zoning: 'all',
    status: 'active',
    capRateMin: '',
    capRateMax: '',
    leaseTerm: 'any',
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const filteredProperties = useMemo(() => {
    let result = [...commercialProperties];

    // Type filter
    if (filters.propertyType !== 'all') {
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
    }

    // Price filter
    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
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

    // Zoning filter
    if (filters.zoning !== 'all') {
      result = result.filter((p) => p.zoning === filters.zoning);
    }

    // Lease term filter
    if (filters.leaseTerm !== 'any') {
      result = result.filter((p) => p.leaseTerm === filters.leaseTerm);
    }

    // Status filter
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
      case 'area':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'roi':
        result.sort((a, b) => Number(b.roi) - Number(a.roi));
        break;
      case 'newest':
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalResults = filteredProperties.length;
  const totalPages = Math.ceil(totalResults / perPage);

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
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
      parking: 'any',
      floors: 'any',
      zoning: 'all',
      status: 'active',
      capRateMin: '',
      capRateMax: '',
      leaseTerm: 'any',
    });
    setCurrentPage(1);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Commercial', href: '/commercial' },
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
        <title>Commercial Properties for Sale & Lease | Elite Real Estate</title>
        <meta
          name="description"
          content="Discover premium commercial properties including offices, retail spaces, warehouses, and investment buildings. Expert commercial real estate services."
        />
        <link rel="canonical" href="https://eliterealestate.com/commercial" />
        <meta property="og:title" content="Commercial Properties | Elite Real Estate" />
        <meta
          property="og:description"
          content="Premium commercial real estate for sale and lease."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'Elite Real Estate Commercial Division',
            description: 'Commercial real estate services including buying, selling, and leasing.',
            areaServed: ['Los Angeles', 'Beverly Hills', 'San Francisco', 'New York'],
            serviceType: 'Commercial Real Estate',
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="luxury" size="md" className="mb-4">
              Commercial Real Estate
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Premium Commercial Properties
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Discover prime commercial real estate opportunities. From office towers to retail
              spaces, warehouses to investment buildings — find your next commercial property.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="#search">
                <Button variant="luxury" size="lg">
                  Search Properties
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/CommercialServices">
                <Button variant="glass" size="lg">
                  Commercial Services
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                350+ Properties Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Prime Locations
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Investment Opportunities
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Search Section */}
      <Section id="search" padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SearchBar
              variant="elevated"
              size="lg"
              placeholder="Search commercial properties by location, type, or price"
              className="shadow-premium"
              onSearch={() => {}}
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
              >
                <span>{showFilters ? 'Hide' : 'Show'} Advanced Filters</span>
                <ChevronRight
                  className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-90')}
                />
              </button>
            </div>
            {showFilters && (
              <div className="mt-4">
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onApply={() => {}}
                  onReset={handleResetFilters}
                  variant="default"
                  isRental={false}
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Commercial Categories */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Commercial Property Types"
            subtitle="Find the perfect commercial space"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {commercialCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/commercial?type=${category.id}`}
                  className="group block"
                >
                  <Card
                    padding="lg"
                    hoverable
                    className="h-full transition-all duration-300 hover:shadow-premium-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'p-3 rounded-xl flex-shrink-0',
                          category.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-6 h-6',
                            category.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-800 group-hover:text-navy-600 transition-colors">
                          {category.label}
                        </h3>
                        <p className="text-sm text-navy-500">{category.description}</p>
                        <p className="text-xs text-navy-400 mt-1">{category.count} properties</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Featured Commercial Properties */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Featured Commercial Properties"
            subtitle="Prime investment opportunities"
            align="left"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {commercialProperties
              .filter((p) => p.featured)
              .slice(0, 6)
              .map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant="grid"
                  size="md"
                  isFavorite={favorites.includes(property.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  showAgent={false}
                  showActions={true}
                />
              ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/commercial?view=all">
              <Button variant="outline" size="md">
                View All Commercial Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Investment Advantages */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Investment Advantages"
            subtitle="Why invest in commercial real estate"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {investmentAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} padding="lg" hoverable className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gold-50 rounded-full">
                      <Icon className="w-6 h-6 text-gold-500" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-navy-800">{advantage.title}</h3>
                  <p className="text-sm text-navy-500 mt-2">{advantage.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Commercial Services */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Commercial Services"
            subtitle="Expert guidance for your commercial real estate needs"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {commercialServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} to={service.href} className="group block">
                  <Card padding="lg" hoverable className="h-full transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-navy-50 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-navy-500">{service.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Commercial Statistics */}
      <Section padding="lg" background="navy-dark" className="text-white">
        <Container>
          <SectionHeader
            title="Commercial Market Overview"
            subtitle="Trusted by businesses and investors"
            align="center"
            size="md"
            titleClassName="text-white"
            subtitleClassName="text-gold-400"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {commercialStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-navy-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ Section - Reuse existing FAQ component if available */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Commercial Real Estate FAQs"
            subtitle="Common questions about commercial properties"
            align="center"
            size="md"
          />
          <div className="max-w-3xl mx-auto mt-8">
            <div className="space-y-3">
              {[
                {
                  q: 'What types of commercial properties are available?',
                  a: 'We offer a diverse portfolio including office spaces, retail stores, warehouses, industrial units, commercial plazas, and investment buildings.',
                },
                {
                  q: 'How do I finance a commercial property purchase?',
                  a: 'We work with leading financial institutions to help you secure commercial mortgages, SBA loans, and other financing options tailored to your investment goals.',
                },
                {
                  q: 'What is the typical ROI on commercial properties?',
                  a: 'Commercial properties typically offer 6-12% ROI depending on location, property type, and market conditions. Our experts can provide detailed projections.',
                },
                {
                  q: 'How does the commercial leasing process work?',
                  a: 'Our team handles the entire leasing process from property viewing and negotiation to lease agreement and ongoing management support.',
                },
                {
                  q: 'What are the benefits of investing in commercial real estate?',
                  a: 'Benefits include stable rental income, long-term appreciation, tax advantages, portfolio diversification, and professional tenants with longer leases.',
                },
              ].map((faq, index) => (
                <Card key={index} padding="md" className="border border-navy-100">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-navy-800 hover:text-navy-600 transition-colors">
                      <span>{faq.q}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 text-navy-400" />
                    </summary>
                    <p className="text-sm text-navy-600 mt-3 pt-3 border-t border-navy-100">
                      {faq.a}
                    </p>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Premium CTA - Reuse existing CTA component if available */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="luxury" size="lg" className="mb-4">
                Commercial Division
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Ready to Find Your Commercial Property?
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Work with our commercial real estate experts to discover the perfect property for
                your business or investment portfolio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/contact">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/commercial">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    Browse Properties
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Expert Commercial Agents
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Investment Analysis
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  End-to-End Support
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(CommercialPage);
