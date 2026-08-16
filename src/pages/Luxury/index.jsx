import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Loading from '@/components/shared/Loading';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SearchBar, SearchFilters } from '@/components/search';
import { PropertyCard } from '@/components/property';
import { Button, Badge, Card } from '@/components/ui';
import { getPropertyImage } from '@/assets/images/properties';
import { getAgentImage } from '@/assets/images/agents';
import {
  Crown,
  Sparkles,
  Home,
  Building2,
  Castle,
  Trees,
  Waves,
  Mountain,
  Award,
  Users,
  Eye,
  Shield,
  Car,
  Palette,
  Gavel,
  Globe,
  Star,
  ChevronRight,
  Gem,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

// Lazy load heavy components
const PropertyGallery = lazy(() => import('@/components/property/PropertyGallery'));

// Mock luxury property data
const luxuryProperties = Array.from({ length: 16 }, (_, i) => ({
  id: `lux-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Oceanfront Villa with Infinity Pool',
    'Modern Penthouse with City Views',
    'Private Beachfront Estate',
    'Historic Mansion',
    'Contemporary Cliffside Villa',
    'Luxury Golf Course Residence',
    'Waterfront Retreat',
    'Hilltop Estate with Panoramic Views',
    'Private Island Villa',
    'Sky Penthouse',
    'Mediterranean Style Villa',
    'Modern Minimalist Mansion',
    'Beachfront Paradise',
    'Mountain View Estate',
    'Luxury Compound',
    'Exclusive Gated Community Villa',
  ][i % 16],
  location: [
    'Beverly Hills, CA',
    'Malibu, CA',
    'Santa Monica, CA',
    'Los Angeles, CA',
    'Orange County, CA',
    'San Francisco, CA',
    'New York, NY',
    'Miami, FL',
    'Aspen, CO',
    'Lake Tahoe, CA',
    'Napa Valley, CA',
    'Montecito, CA',
    'Palm Springs, CA',
    'San Diego, CA',
    'Jackson Hole, WY',
    'Newport Beach, CA',
  ][i % 16],
  price: 5000000 + Math.random() * 25000000,
  type: ['Villa', 'Penthouse', 'Estate', 'Mansion', 'Beach House', 'Farm House'][i % 6],
  purpose: 'sale',
  area: 3500 + Math.random() * 15000,
  bedrooms: Math.floor(4 + Math.random() * 6),
  bathrooms: Math.floor(3 + Math.random() * 5),
  parking: Math.floor(3 + Math.random() * 6),
  status: 'active',
  images: [getPropertyImage(i)],
  featured: i < 4,
  badge: i < 3 ? 'Luxury Collection' : i < 6 ? 'Featured Estate' : null,
  yearBuilt: 2005 + Math.floor(Math.random() * 19),
  floors: Math.floor(2 + Math.random() * 5),
  pool: true,
  garden: true,
  waterfront: Math.random() > 0.4,
  smartHome: true,
  security: true,
  privateGym: Math.random() > 0.5,
  wineCellar: Math.random() > 0.5,
  homeTheater: Math.random() > 0.5,
  agent: {
    id: `agt-${String((i % 3) + 1).padStart(3, '0')}`,
    name: ['Sarah Johnson', 'Michael Chen', 'Jennifer Williams'][i % 3],
    image: getAgentImage(i),
    title: 'Luxury Property Specialist',
  },
}));

// Luxury categories
const luxuryCategories = [
  {
    id: 'villa',
    icon: Castle,
    label: 'Luxury Villas',
    description: 'Exclusive private villas with premium amenities',
    count: 45,
    color: 'gold',
  },
  {
    id: 'penthouse',
    icon: Building2,
    label: 'Penthouses',
    description: 'Sky-high living with panoramic views',
    count: 28,
    color: 'navy',
  },
  {
    id: 'beach-house',
    icon: Waves,
    label: 'Beach Houses',
    description: 'Oceanfront luxury living',
    count: 32,
    color: 'gold',
  },
  {
    id: 'farm-house',
    icon: Trees,
    label: 'Farm Houses',
    description: 'Estate living with expansive grounds',
    count: 19,
    color: 'navy',
  },
  {
    id: 'estate',
    icon: Home,
    label: 'Private Estates',
    description: 'Grand estates with exceptional privacy',
    count: 24,
    color: 'gold',
  },
  {
    id: 'mansion',
    icon: Crown,
    label: 'Luxury Mansions',
    description: 'The pinnacle of luxury living',
    count: 16,
    color: 'navy',
  },
];

// Luxury lifestyle features
const lifestyleFeatures = [
  {
    icon: Waves,
    title: 'Private Pools',
    description: 'Infinity pools with ocean or city views',
  },
  {
    icon: Sparkles,
    title: 'Smart Homes',
    description: 'State-of-the-art home automation systems',
  },
  {
    icon: Eye,
    title: 'Sea Views',
    description: 'Breathtaking ocean and coastal vistas',
  },
  {
    icon: Trees,
    title: 'Golf Communities',
    description: 'Exclusive golf course frontage and access',
  },
  {
    icon: Shield,
    title: 'Premium Security',
    description: '24/7 security and gated communities',
  },
  {
    icon: Car,
    title: 'Private Parking',
    description: 'Secure garages for luxury vehicle collections',
  },
  {
    icon: Palette,
    title: 'Luxury Interiors',
    description: 'Designer finishes and premium materials',
  },
  {
    icon: Gem,
    title: 'Concierge Services',
    description: 'White-glove concierge and management',
  },
];

// Exclusive services
const exclusiveServices = [
  {
    icon: Users,
    title: 'Private Consultation',
    description: 'Personalized service from luxury experts.',
    href: '/services/consultation',
  },
  {
    icon: Eye,
    title: 'VIP Tours',
    description: 'Exclusive property viewings and experiences.',
    href: '/services/tours',
  },
  {
    icon: Award,
    title: 'Luxury Investment Advice',
    description: 'Strategic guidance for luxury investments.',
    href: '/services/investment',
  },
  {
    icon: Palette,
    title: 'Interior Design Consultation',
    description: 'Collaboration with world-class designers.',
    href: '/services/design',
  },
  {
    icon: Gavel,
    title: 'Legal Assistance',
    description: 'Expert legal guidance for luxury purchases.',
    href: '/services/legal',
  },
  {
    icon: Globe,
    title: 'International Portfolio',
    description: 'Access to global luxury properties.',
    href: '/services/international',
  },
];

// Luxury locations
const luxuryLocations = [
  {
    name: 'Beverly Hills',
    image: getPropertyImage(0),
    properties: 45,
    badge: 'Prime',
  },
  {
    name: 'Malibu Coast',
    image: getPropertyImage(1),
    properties: 32,
    badge: 'Waterfront',
  },
  {
    name: 'Santa Monica',
    image: getPropertyImage(2),
    properties: 28,
    badge: 'Beachfront',
  },
  {
    name: 'Aspen Mountain',
    image: getPropertyImage(12),
    properties: 19,
    badge: 'Mountain',
  },
  {
    name: 'Napa Valley',
    image: getPropertyImage(4),
    properties: 24,
    badge: 'Vineyard',
  },
  {
    name: 'Newport Beach',
    image: getPropertyImage(5),
    properties: 36,
    badge: 'Coastal',
  },
];

// Luxury benefits
const luxuryBenefits = [
  {
    icon: TrendingUp,
    title: 'Capital Appreciation',
    description:
      'Luxury properties consistently appreciate in value, offering strong long-term returns.',
  },
  {
    icon: DollarSign,
    title: 'High Rental Yield',
    description: 'Premium properties attract high-net-worth tenants willing to pay premium rates.',
  },
  {
    icon: Crown,
    title: 'Exclusive Communities',
    description: 'Access to world-class neighborhoods and elite communities.',
  },
  {
    icon: Award,
    title: 'Long-term Investment',
    description: 'Luxury real estate remains a stable and appreciating asset class.',
  },
];

const LuxuryPage = () => {
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    areaMin: '',
    areaMax: '',
    features: [],
    status: 'active',
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const filteredProperties = useMemo(() => {
    let result = [...luxuryProperties];

    if (filters.propertyType !== 'all') {
      result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
    }

    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }

    if (filters.areaMin) {
      result = result.filter((p) => p.area >= Number(filters.areaMin));
    }
    if (filters.areaMax) {
      result = result.filter((p) => p.area <= Number(filters.areaMax));
    }

    if (filters.bedrooms !== 'any') {
      const beds = Number(filters.bedrooms);
      result = result.filter((p) => p.bedrooms >= beds);
    }

    if (filters.bathrooms !== 'any') {
      const baths = Number(filters.bathrooms);
      result = result.filter((p) => p.bathrooms >= baths);
    }

    if (filters.features?.length > 0) {
      filters.features.forEach((feature) => {
        result = result.filter((p) => p[feature] === true);
      });
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
      case 'beds':
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'baths':
        result.sort((a, b) => b.bathrooms - a.bathrooms);
        break;
      case 'area':
        result.sort((a, b) => b.area - a.area);
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
      propertyType: 'all',
      priceMin: '',
      priceMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      areaMin: '',
      areaMax: '',
      features: [],
      status: 'active',
    });
    setCurrentPage(1);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Luxury', href: '/luxury' },
  ];

  return (
    <motion.div
      variants={pageVariants.luxury}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Luxury Collection | Elite Real Estate</title>
        <meta
          name="description"
          content="Explore our curated collection of ultra-luxury properties. Waterfront estates, modern penthouses, and historic mansions from the world's most prestigious locations."
        />
        <link rel="canonical" href="https://eliterealestate.com/luxury" />
        <meta property="og:title" content="Luxury Collection | Elite Real Estate" />
        <meta
          property="og:description"
          content="Discover the world's most exclusive luxury properties."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Luxury Collection',
            description: 'Premium luxury properties from Elite Real Estate',
            url: 'https://eliterealestate.com/luxury',
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Luxury Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-300/5 rounded-full blur-2xl" />
        </div>

        <Container className="relative z-10 text-center">
          <Badge variant="luxury" size="lg" className="mx-auto mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Elite Collection
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-[1.05]">
            Luxury Collection
          </h1>
          <p className="text-xl sm:text-2xl text-gold-400 font-playfair font-semibold mt-4">
            The Pinnacle of Extraordinary Living
          </p>
          <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Discover the world&apos;s most exclusive properties — each a masterpiece of
            architecture, design, and location.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="#collection">
              <Button variant="luxury" size="lg" className="min-w-[180px]">
                Explore Collection
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" size="lg" className="min-w-[160px]">
                Private Consultation
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-navy-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              200+ Ultra-Luxury Properties
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Global Portfolio
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              White-Glove Service
            </div>
          </div>
        </Container>
      </section>

      {/* Luxury Search */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SearchBar
              variant="elevated"
              size="lg"
              placeholder="Search luxury properties by location, type, or price"
              className="shadow-premium-lg border-gold-200/50"
              onSearch={() => {}}
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
              >
                <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
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
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Luxury Categories */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Luxury Property Types"
            subtitle="Curated selection of the world's finest properties"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {luxuryCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={`/luxury?type=${category.id}`} className="group block">
                  <Card
                    padding="lg"
                    hoverable
                    className={cn(
                      'h-full transition-all duration-500',
                      category.color === 'gold'
                        ? 'border-gold-200 hover:border-gold-400'
                        : 'border-navy-200 hover:border-navy-400'
                    )}
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
                        <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
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

      {/* Featured Luxury Properties */}
      <Section id="collection" padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Featured Luxury Collection"
            subtitle="The world's most extraordinary properties"
            align="left"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {paginatedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="grid"
                size="lg"
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={handleFavoriteToggle}
                showAgent={false}
                showActions={true}
                featured={property.featured}
                className="hover:shadow-premium-xl"
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/luxury?view=all">
              <Button variant="outline" size="md">
                View All Luxury Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Luxury Lifestyle */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Luxury Lifestyle"
            subtitle="Experience the pinnacle of living"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {lifestyleFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  padding="lg"
                  hoverable
                  className="text-center h-full border border-gold-100/50"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gold-50 rounded-full">
                      <Icon className="w-6 h-6 text-gold-500" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-navy-800">{feature.title}</h4>
                  <p className="text-sm text-navy-500 mt-2">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Exclusive Services */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Exclusive Services"
            subtitle="White-glove service for discerning clients"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {exclusiveServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} to={service.href} className="group block">
                  <Card padding="lg" hoverable className="h-full transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gold-50 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-500" />
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

      {/* Featured Luxury Locations */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Featured Luxury Locations"
            subtitle="The world's most prestigious addresses"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {luxuryLocations.map((location, index) => (
              <Link
                key={index}
                to={`/luxury?location=${location.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block"
              >
                <Card
                  padding="none"
                  className="overflow-hidden transition-all duration-500 hover:shadow-premium-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent z-10" />
                    <img
                      src={location.image}
                      alt={`${location.name} luxury property`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-playfair font-semibold text-lg">{location.name}</h4>
                          <p className="text-sm text-white/70">{location.properties} properties</p>
                        </div>
                        <Badge variant="luxury" size="sm" pill>
                          {location.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Luxury Investment Benefits */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Luxury Investment Benefits"
            subtitle="Why invest in luxury real estate"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {luxuryBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  padding="lg"
                  hoverable
                  className="text-center h-full border-gold-100/50"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gold-50 rounded-full">
                      <Icon className="w-6 h-6 text-gold-500" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-navy-800">{benefit.title}</h4>
                  <p className="text-sm text-navy-500 mt-2">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ Section - Reuse existing FAQ component */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Luxury Property FAQs"
            subtitle="Questions about luxury real estate"
            align="center"
            size="md"
          />
          <div className="max-w-3xl mx-auto mt-8">
            <div className="space-y-3">
              {[
                {
                  q: 'What qualifies as a luxury property?',
                  a: 'Luxury properties are distinguished by prime location, architectural significance, premium materials, exclusive amenities, and exceptional design. Our collection features properties valued at $5M+ with unique characteristics.',
                },
                {
                  q: 'How do I arrange a private viewing?',
                  a: 'Our luxury specialists offer private, discreet viewings tailored to your schedule. Contact our team to arrange an exclusive tour of any property in our collection.',
                },
                {
                  q: 'What investment potential do luxury properties offer?',
                  a: 'Luxury properties offer strong capital appreciation, high rental yields, portfolio diversification, and long-term value stability. Our investment advisors provide detailed market analysis.',
                },
                {
                  q: 'Do you offer international luxury properties?',
                  a: "Yes, we have an extensive international portfolio featuring properties in the world's most prestigious locations across Europe, Asia, the Middle East, and the Americas.",
                },
                {
                  q: 'How does the buying process work for luxury properties?',
                  a: 'Our white-glove service includes personalized consultation, property curation, private viewings, negotiation support, due diligence, and seamless closing coordination.',
                },
              ].map((faq, index) => (
                <Card key={index} padding="md" className="border border-navy-100">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-navy-800 hover:text-gold-600 transition-colors">
                      <span>{faq.q}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 text-gold-500" />
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

      {/* Premium CTA - Reuse existing CTA component */}
      <Section padding="xl" background="navy-dark">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-900 to-navy-800 border border-gold-500/20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="flex justify-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-gold-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-navy-300">
                  Elite Collection
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Begin Your Luxury Journey
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Experience the pinnacle of luxury real estate with our expert advisors. Schedule a
                private consultation today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/contact">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/luxury">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    Explore Collection
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Confidential Service
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Global Portfolio
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  White-Glove Experience
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(LuxuryPage);
