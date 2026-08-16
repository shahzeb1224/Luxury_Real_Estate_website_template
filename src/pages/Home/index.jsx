import React, { lazy, Suspense } from 'react';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import Loading from '@/components/shared/Loading';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

// Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';

// Hero & Search
import { Hero } from '@/components/hero';
import { SearchBar, AdvancedSearch } from '@/components/search';

// Feature Components
import { FeaturedProperties, PropertyCarousel } from '@/components/property';
import { CategoryGrid, PropertyTypes } from '@/components/categories';
import { FeaturedLocations } from '@/components/sections';
import { LuxuryShowcase } from '@/components/sections';
import { WhyChooseUs } from '@/components/sections';
import { Services } from '@/components/sections';
import { Statistics } from '@/components/sections';
import { AgentGrid } from '@/components/agents';
import { Testimonials } from '@/components/sections';
import { Partners } from '@/components/sections';
import { Awards } from '@/components/sections';
import { FAQ } from '@/components/sections';
import { Newsletter } from '@/components/sections';
import { CTA } from '@/components/sections';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import { Button } from '@/components/ui';
// images imports
import image1 from '@/assets/images/properties/image1.png';
import image2 from '@/assets/images/properties/image2.png';
import image3 from '@/assets/images/properties/image3.png';
import image4 from '@/assets/images/properties/image4.png';
import image5 from '@/assets/images/properties/image5.png';
import image6 from '@/assets/images/properties/image6.png';
import image7 from '@/assets/images/properties/image7.png';
import image8 from '@/assets/images/properties/image8.png';
import image9 from '@/assets/images/properties/image12.png';
// Data
import { STATISTICS_DATA } from '@/components/sections/Statistics/statistics.data';
import { TESTIMONIALS_DATA } from '@/components/sections/Testimonials/testimonials.data';
import { PARTNERS_DATA } from '@/components/sections/Partners/partners.data';
import { AWARDS_DATA } from '@/components/sections/Awards/awards.data';
import { FAQ_DATA } from '@/components/sections/FAQ/faq.data';
import { CTA_DEFAULTS } from '@/components/sections/CTA/cta.data';
import imageAgent1 from '@/assets/images/agents/image1.png';
import imageAgent2 from '@/assets/images/agents/image2.png';
import imageAgent3 from '@/assets/images/agents/image3.png';
import heroImage from '@/assets/images/hero/heroImage.png';

const LazyBlog = lazy(() => import('@/pages/Blog')); // Lazy load below-fold sections for performance

const LazyAgentGrid = lazy(() =>
  import('@/components/agents').then((module) => ({ default: module.AgentGrid }))
);

// Mock Data (replace with real data from API)
const mockFeaturedProperties = [
  {
    id: '1',
    title: 'Modern Villa with Ocean View',
    location: 'Beverly Hills, CA',
    price: 2500000,
    type: 'Villa',
    purpose: 'sale',
    area: 4500,
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    status: 'active',
    images: [image1],
    featured: true,
    badge: 'Featured',
  },
  {
    id: '2',
    title: 'Contemporary Penthouse',
    location: 'Los Angeles, CA',
    price: 1800000,
    type: 'Penthouse',
    purpose: 'sale',
    area: 3200,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    status: 'active',
    images: [image2],
    featured: true,
    badge: 'Premium',
  },
  {
    id: '3',
    title: 'Beachfront Estate',
    location: 'Malibu, CA',
    price: 4500000,
    type: 'Estate',
    purpose: 'sale',
    area: 6200,
    bedrooms: 6,
    bathrooms: 5,
    parking: 4,
    status: 'active',
    images: [image3],
    featured: true,
    badge: 'Luxury',
  },
  {
    id: '4',
    title: 'Luxury Apartment',
    location: 'Santa Monica, CA',
    price: 950000,
    type: 'Apartment',
    purpose: 'sale',
    area: 1800,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    status: 'active',
    images: [image4],
    featured: false,
  },
  {
    id: '5',
    title: 'Modern Villa',
    location: 'Beverly Hills, CA',
    price: 3200000,
    type: 'Villa',
    purpose: 'sale',
    area: 5200,
    bedrooms: 5,
    bathrooms: 4,
    parking: 3,
    status: 'active',
    images: [image5],
    featured: true,
    badge: 'New',
  },
  {
    id: '6',
    title: 'Penthouse with View',
    location: 'Los Angeles, CA',
    price: 2200000,
    type: 'Penthouse',
    purpose: 'sale',
    area: 3800,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    status: 'active',
    images: [image6],
    featured: false,
  },
];

const mockAgents = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Luxury Property Specialist',
    image: imageAgent1,
    experience: 12,
    specialization: 'Beverly Hills & Malibu',
    rating: 4.9,
    verified: true,
    propertiesSold: 45,
    awards: 8,
    location: 'Beverly Hills, CA',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Commercial Real Estate Expert',
    image: imageAgent2,
    experience: 15,
    specialization: 'Commercial & Investment',
    rating: 4.8,
    verified: true,
    propertiesSold: 67,
    awards: 12,
    location: 'Los Angeles, CA',
  },
  {
    id: '3',
    name: 'Jennifer Williams',
    title: 'Luxury Villa Specialist',
    image: imageAgent3,
    experience: 10,
    specialization: 'Malibu & Santa Monica',
    rating: 4.9,
    verified: true,
    propertiesSold: 34,
    awards: 6,
    location: 'Malibu & Santa Monica, CA',
  },
];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Elite Luxury Real Estate | Premium Properties & Villas for Sale</title>
        <meta
          name="description"
          content="Discover the finest luxury properties and villas. Elite Real Estate offers premium homes, expert agents, and white-glove service. Find your dream property today."
        />
        <meta
          name="keywords"
          content="luxury real estate, premium properties, luxury homes, real estate agents, property for sale, villas, mansions, waterfront properties"
        />
        <link rel="canonical" href="https://eliterealestate.com" />
        <meta property="og:title" content="Elite Luxury Real Estate | Premium Properties" />
        <meta
          property="og:description"
          content="Discover the finest luxury properties and villas."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eliterealestate.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elite Luxury Real Estate" />
        <meta
          name="twitter:description"
          content="Premium luxury properties for the discerning few."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Elite Luxury Real Estate',
            url: 'https://eliterealestate.com',
            logo: 'https://eliterealestate.com/logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-888-555-0123',
              contactType: 'sales',
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Luxury Boulevard',
              addressLocality: 'Beverly Hills',
              addressRegion: 'CA',
              postalCode: '90210',
              addressCountry: 'US',
            },
          })}
        </script>
      </Helmet>

      <TopBar />
      <Navbar />

      <main id="main-content" role="main">
        {/* 1. Hero Section */}
        <Hero
          eyebrow="Welcome to Elite Real Estate"
          headline="Discover Extraordinary Living"
          subheadline="Curated luxury properties for the discerning few"
          description="Explore our exclusive collection of premium homes, villas, and estates in the world's most prestigious locations."
          primaryCTA={{ label: 'Explore Properties', href: '/buy' }}
          secondaryCTA={{ label: 'Luxury Collection', href: '/luxury' }}
          stats={[
            { value: 500, label: 'Properties', suffix: '+' },
            { value: 50, label: 'Expert Agents', suffix: '+' },
            { value: 15, label: 'Cities' },
            { value: 10, label: 'Years', suffix: '+' },
          ]}
          background={{
            src: heroImage,
            type: 'image',
            fallback: heroImage,
          }}
        />

        {/* 2. Search Section */}
        <section
          className="py-8 sm:py-12 bg-white border-b border-navy-100"
          aria-label="Property Search"
        >
          <div className="container-premium">
            <div className="max-w-4xl mx-auto">
              <SearchBar
                variant="elevated"
                size="lg"
                placeholder="Search by location, property, or ZIP"
                className="shadow-premium"
              />
              <div className="mt-4 flex justify-center">
                <AdvancedSearch
                  triggerLabel="Advanced Search"
                  applyLabel="Apply Filters"
                  resetLabel="Reset All"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Properties */}
        <FeaturedProperties
          properties={mockFeaturedProperties}
          title="Featured Properties"
          subtitle="Discover our handpicked selection of premium properties"
          viewAllLink="/buy"
          columns={3}
          showCarousel={true}
        />

        {/* 4. Property Categories */}
        <CategoryGrid
          title="Browse Properties"
          subtitle="Find your perfect property by category"
          viewAllLink="/buy"
          columns={4}
          showCarousel={true}
        />

        {/* 5. Featured Locations */}
        <FeaturedLocations
          locations={[
            {
              id: '1',
              name: 'Beverly Hills',
              image: [image8],
              properties: 124,
              slug: 'beverly-hills',
              featured: true,
              investmentRating: 4.8,
              averagePrice: 2800000,
            },
            {
              id: '2',
              name: 'Malibu',
              image: [image7],
              properties: 87,
              slug: 'malibu',
              featured: true,
              investmentRating: 4.7,
              averagePrice: 3200000,
            },
            {
              id: '3',
              name: 'Santa Monica',
              image: [image9],
              properties: 95,
              slug: 'santa-monica',
              featured: false,
              investmentRating: 4.5,
              averagePrice: 1800000,
            },
            {
              id: '4',
              name: 'Downtown LA',
              image: image9,
              properties: 156,
              slug: 'downtown-la',
              featured: false,
              investmentRating: 4.2,
              averagePrice: 950000,
            },
          ]}
          title="Featured Locations"
          subtitle="Discover premium communities and investment hotspots"
          viewAllLink="/locations"
          columns={3}
          showCarousel={true}
        />

        {/* 6. Luxury Collection */}
        <LuxuryShowcase
          properties={mockFeaturedProperties.filter((p) => p.featured)}
          title="Luxury Collection"
          subtitle="Discover the world's most exclusive properties"
          description="Curated masterpieces of architecture and design, each property represents the pinnacle of luxury living."
          viewAllLink="/luxury"
        />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Services */}
        <Services />

        {/* 9. Market Statistics */}
        <Statistics
          statistics={STATISTICS_DATA}
          title="Market Statistics & Insights"
          subtitle="Data-driven real estate intelligence"
          description="Stay ahead of the market with our comprehensive statistics and investment insights."
        />

        {/* 9.5 Investment Opportunities CTA - NEW SECTION */}
        <Section padding="md" background="white">
          <Container>
            <div className="text-center">
              <p className="text-navy-600 max-w-2xl mx-auto mb-6">
                Explore premium investment opportunities and maximize your returns with expert
                guidance.
              </p>
              <Link to="/investment">
                <Button variant="luxury" size="lg" className="min-w-[200px]">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Explore Investment
                </Button>
              </Link>
            </div>
          </Container>
        </Section>

        {/* 10. Agent Spotlight - Lazy Loaded */}
        <Suspense fallback={<Loading variant="skeleton" className="py-20" />}>
          <LazyAgentGrid
            agents={mockAgents}
            title="Meet Our Expert Agents"
            subtitle="World-class professionals dedicated to your success"
            description="Our team of luxury real estate specialists brings unparalleled expertise and personalized service to every transaction."
            viewAllLink="/agents"
            columns={3}
            showViewAll={true}
          />
        </Suspense>

        {/* 11. Testimonials */}
        <Testimonials
          testimonials={TESTIMONIALS_DATA}
          title="What Our Clients Say"
          subtitle="Real stories from real clients"
          description="Hear from our valued clients about their experience working with Elite Real Estate."
        />

        {/* 12. Partners */}
        <Partners
          partners={PARTNERS_DATA}
          title="Our Trusted Partners"
          subtitle="Collaborating with industry leaders"
          description="We partner with the most respected names in real estate, finance, and luxury services."
        />

        {/* 13. Awards */}
        <Awards
          awards={AWARDS_DATA}
          title="Awards & Recognition"
          subtitle="Excellence acknowledged globally"
          description="Our commitment to excellence has been recognized by industry leaders and prestigious organizations worldwide."
        />

        {/* 14. Latest Blog - Lazy Loaded */}
        <Suspense fallback={<Loading variant="skeleton" className="py-20" />}>
          <LazyBlog
            posts={[]}
            title="Latest Insights"
            subtitle="Expert perspectives on luxury real estate"
            viewAllLink="/blog"
            columns={3}
          />
        </Suspense>

        {/* 15. FAQ */}
        <FAQ
          faqs={FAQ_DATA}
          title="Frequently Asked Questions"
          subtitle="Everything you need to know"
          description="Find answers to the most common questions about buying, selling, and investing in luxury real estate."
        />

        {/* 16. Newsletter */}
        <Newsletter
          title="Join The Elite Circle"
          subtitle="Exclusive insights for discerning investors"
          description="Stay ahead of the market with our premium newsletter featuring exclusive property launches, investment opportunities, and expert market analysis."
        />

        {/* 17. Premium CTA */}
        <CTA
          title={CTA_DEFAULTS.title}
          subtitle={CTA_DEFAULTS.subtitle}
          description={CTA_DEFAULTS.description}
          primaryCTA={CTA_DEFAULTS.primaryCTA}
          secondaryCTA={CTA_DEFAULTS.secondaryCTA}
          phoneCTA={CTA_DEFAULTS.phoneCTA}
          whatsappCTA={CTA_DEFAULTS.whatsappCTA}
        />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default React.memo(HomePage);
