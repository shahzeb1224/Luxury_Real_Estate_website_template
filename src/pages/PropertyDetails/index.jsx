import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import Loading from '@/components/shared/Loading';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import PropertyMap from '@/components/maps/PropertyMap';
import NearbyPlaces from '@/components/maps/NearbyPlaces';
import SimilarProperties from '@/components/property/SimilarProperties';
import AgentContact from '@/components/agents/AgentContact';
import AgentCard from '@/components/agents/AgentCard';
import { Button } from '@/components/ui';
import {
  Heart,
  Share2,
  Printer,
  Calendar,
  Phone,
  MessageCircle,
  Calculator,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency, formatArea } from '@/lib/formatters';
import { scrollToElement } from '@/utils/scroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getPropertyImage, propertyImages } from '@/assets/images/properties';
import { getAgentImage } from '@/assets/images/agents';

// Lazy load heavy components
const MortgageCalculator = lazy(() => import('@/components/property/MortgageCalculator'));
const InvestmentScore = lazy(() => import('@/components/property/InvestmentScore'));
const PropertyComparison = lazy(() => import('@/components/property/PropertyComparison'));

// Mock property data (would come from API)
const mockProperty = {
  id: 'prop-001',
  title: 'Modern Villa with Ocean View',
  description:
    'This stunning modern villa offers breathtaking ocean views, state-of-the-art amenities, and unparalleled luxury living. Designed by award-winning architects, this property represents the pinnacle of coastal living.',
  price: 2500000,
  currency: 'USD',
  status: 'active',
  type: 'Villa',
  purpose: 'sale',
  bedrooms: 5,
  bathrooms: 4,
  halfBathrooms: 1,
  area: 4500,
  lotSize: 12000,
  yearBuilt: 2022,
  floors: 2,
  parking: 3,
  images: propertyImages.slice(0, 6),
  location: {
    address: '123 Ocean View Drive',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    country: 'USA',
    lat: 34.0736,
    lng: -118.4004,
  },
  features: [
    'Swimming Pool',
    'Home Theater',
    'Wine Cellar',
    'Smart Home System',
    'Gym',
    'Spa',
    'Tennis Court',
    'Helipad',
    'Security System',
    'Elevator',
    'Fireplace',
  ],
  amenities: [
    { icon: 'Pool', label: 'Swimming Pool' },
    { icon: 'Wifi', label: 'High-Speed WiFi' },
    { icon: 'Parking', label: '3 Car Garage' },
    { icon: 'AirConditioning', label: 'Central AC' },
    { icon: 'Heating', label: 'Underfloor Heating' },
    { icon: 'Security', label: '24/7 Security' },
    { icon: 'Gym', label: 'Fitness Center' },
    { icon: 'Spa', label: 'Spa & Sauna' },
  ],
  agent: {
    id: 'agt-001',
    name: 'Sarah Johnson',
    title: 'Luxury Property Specialist',
    image: getAgentImage(0),
    experience: 12,
    specialization: 'Beverly Hills & Malibu',
    rating: 4.9,
    verified: true,
    propertiesSold: 45,
    phone: '+1 (310) 555-0123',
    email: 'sarah@eliterealestate.com',
  },
  nearbyPlaces: [
    { name: 'Beverly Hills High School', type: 'School', distance: '0.8 mi' },
    { name: 'Rodeo Drive Shopping', type: 'Shopping', distance: '1.2 mi' },
    { name: 'Cedars-Sinai Medical Center', type: 'Hospital', distance: '2.0 mi' },
    { name: 'Beverly Gardens Park', type: 'Park', distance: '1.5 mi' },
    { name: 'Spago Restaurant', type: 'Restaurant', distance: '0.6 mi' },
  ],
  similarProperties: [
    {
      id: 'prop-002',
      title: 'Contemporary Villa with City Views',
      price: 2200000,
      location: 'Los Angeles, CA',
      image: getPropertyImage(1),
      beds: 4,
      baths: 3,
      sqft: 3800,
      status: 'active',
    },
    {
      id: 'prop-003',
      title: 'Oceanfront Estate',
      price: 4500000,
      location: 'Malibu, CA',
      image: getPropertyImage(2),
      beds: 6,
      baths: 5,
      sqft: 6200,
      status: 'active',
    },
    {
      id: 'prop-004',
      title: 'Modern Penthouse',
      price: 1800000,
      location: 'Los Angeles, CA',
      image: getPropertyImage(3),
      beds: 3,
      baths: 3,
      sqft: 3200,
      status: 'active',
    },
  ],
  investmentScore: {
    score: 85,
    roi: 12.5,
    appreciation: 8.2,
    rentalYield: 4.8,
    marketTrend: 'up',
  },
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(mockProperty);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const sidebarRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Handle scroll for sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      // Sticky sidebar logic handled by CSS
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <Loading fullscreen />;
  }

  if (!property) {
    return (
      <div className="container-premium py-20 text-center">
        <h1 className="text-3xl font-playfair font-bold text-navy-800">Property Not Found</h1>
        <p className="text-navy-500 mt-4">
          The property you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/buy"
          className="inline-block mt-6 px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/buy' },
    { label: property.title, href: '#' },
  ];

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50"
    >
      <Helmet>
        <title>
          {property.title} | {formatCurrency(property.price)} | Elite Real Estate
        </title>
        <meta
          name="description"
          content={`${property.title} - ${property.bedrooms} bed, ${property.bathrooms} bath, ${formatArea(property.area)}. Located in ${property.location.city}, ${property.location.state}.`}
        />
        <link rel="canonical" href={`https://eliterealestate.com/property/${property.id}`} />
        <meta
          property="og:title"
          content={`${property.title} | ${formatCurrency(property.price)}`}
        />
        <meta
          property="og:description"
          content={`${property.bedrooms} bed, ${property.bathrooms} bath, ${formatArea(property.area)} luxury property in ${property.location.city}.`}
        />
        <meta property="og:image" content={property.images[0]} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property.title} />
        <meta name="twitter:description" content={`Luxury property in ${property.location.city}`} />
        <meta name="twitter:image" content={property.images[0]} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: property.title,
            description: property.description,
            image: property.images[0],
            offers: {
              '@type': 'Offer',
              price: property.price,
              priceCurrency: property.currency,
              availability: 'https://schema.org/InStock',
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: property.location.address,
              addressLocality: property.location.city,
              addressRegion: property.location.state,
              postalCode: property.location.zip,
              addressCountry: property.location.country,
            },
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Main Content */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Gallery & Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery
              images={property.images}
              title={property.title}
              layout="grid"
              showThumbnails={!isMobile}
            />

            {/* Property Header */}
            <div className="bg-white rounded-2xl p-6 shadow-premium">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-navy-800">
                    {property.title}
                  </h1>
                  <p className="text-navy-500 mt-1">
                    {property.location.address}, {property.location.city}, {property.location.state}{' '}
                    {property.location.zip}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full bg-navy-50 hover:bg-navy-100 transition-colors"
                    aria-label="Save property"
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5',
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-navy-400'
                      )}
                    />
                  </button>
                  <button
                    className="p-2 rounded-full bg-navy-50 hover:bg-navy-100 transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="w-5 h-5 text-navy-400" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-navy-50 hover:bg-navy-100 transition-colors"
                    aria-label="Print"
                  >
                    <Printer className="w-5 h-5 text-navy-400" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className="text-3xl sm:text-4xl font-playfair font-bold text-gold-500">
                  {formatCurrency(property.price)}
                </span>
                <span className="px-3 py-1 bg-success-50 text-success-600 rounded-full text-sm font-medium">
                  For Sale
                </span>
                <span className="px-3 py-1 bg-navy-50 text-navy-600 rounded-full text-sm font-medium">
                  {property.type}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-navy-100">
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-navy-500">Bedrooms</span>
                    <span className="font-semibold text-navy-800">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-navy-500">Bathrooms</span>
                    <span className="font-semibold text-navy-800">{property.bathrooms}</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-navy-500">Area</span>
                    <span className="font-semibold text-navy-800">{formatArea(property.area)}</span>
                  </div>
                )}
                {property.parking && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-navy-500">Parking</span>
                    <span className="font-semibold text-navy-800">{property.parking}</span>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-navy-500">Year Built</span>
                    <span className="font-semibold text-navy-800">{property.yearBuilt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-premium">
              <h2 className="text-xl font-playfair font-semibold text-navy-800 mb-3">
                Description
              </h2>
              <p className="text-navy-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <PropertyFeatures features={property.features} />

            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />

            {/* Location & Map */}
            <div className="bg-white rounded-2xl p-6 shadow-premium">
              <h2 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Location</h2>
              <PropertyMap
                lat={property.location.lat}
                lng={property.location.lng}
                address={`${property.location.address}, ${property.location.city}, ${property.location.state}`}
              />
            </div>

            {/* Nearby Places */}
            <NearbyPlaces places={property.nearbyPlaces} />

            {/* Investment Score (lazy loaded) */}
            <Suspense fallback={<Loading variant="skeleton" className="h-48" />}>
              <InvestmentScore score={property.investmentScore} />
            </Suspense>

            {/* Similar Properties */}
            <SimilarProperties properties={property.similarProperties} />

            {/* Property Comparison (lazy loaded) */}
            <Suspense fallback={<Loading variant="skeleton" className="h-32" />}>
              <PropertyComparison
                property={property}
                similarProperties={property.similarProperties}
              />
            </Suspense>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div
              ref={sidebarRef}
              className={cn('sticky top-24 space-y-6', isTablet && 'relative top-0')}
            >
              {/* Agent Card */}
              <AgentCard
                agent={property.agent}
                variant="featured"
                size="md"
                showContact={true}
                onContact={() => scrollToElement('.agent-contact-section')}
              />

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-4 shadow-premium space-y-3">
                <button
                  onClick={() => scrollToElement('.agent-contact-section')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gold-500 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Visit
                </button>
                <button
                  onClick={() => (window.location.href = `tel:${property.agent.phone}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy-50 text-navy-800 rounded-lg font-medium hover:bg-navy-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Agent
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy-50 text-navy-800 rounded-lg font-medium hover:bg-navy-100 transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  Mortgage Calculator
                </button>
              </div>

              {/* Mortgage Calculator (lazy loaded) */}
              {showCalculator && (
                <Suspense fallback={<Loading variant="skeleton" className="h-64" />}>
                  <MortgageCalculator price={property.price} />
                </Suspense>
              )}

              {/* Investment Score Summary */}
              {property.investmentScore && (
                <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gold-400" />
                    <span className="text-sm font-medium text-gold-400">Investment Score</span>
                  </div>
                  <div className="text-3xl font-playfair font-bold text-white">
                    {property.investmentScore.score}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-navy-300 text-sm">ROI</span>
                    <span className="text-green-400 font-semibold">
                      {property.investmentScore.roi}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-navy-300 text-sm">Appreciation</span>
                    <span className="text-green-400 font-semibold">
                      {property.investmentScore.appreciation}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-navy-300 text-sm">Rental Yield</span>
                    <span className="text-green-400 font-semibold">
                      {property.investmentScore.rentalYield}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Agent Contact Section */}
        <div className="agent-contact-section mt-12">
          <Section padding="md" background="white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-playfair font-semibold text-navy-800 text-center mb-6">
                Contact the Agent
              </h2>
              <AgentContact
                agentId={property.agent.id}
                agentName={property.agent.name}
                agentPhone={property.agent.phone}
                agentEmail={property.agent.email}
              />
            </div>
          </Section>
        </div>
      </Container>
    </motion.div>
  );
};

export default PropertyDetailsPage;
