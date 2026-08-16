import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { cn } from '@/utils/cn';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Badge, Card } from '@/components/ui';
import {
  Award,
  Target,
  Eye,
  Heart,
  Shield,
  CheckCircle,
  Users,
  Building2,
  TrendingUp,
  Home,
  Crown,
  Sparkles,
  ChevronRight,
  Star,
  Handshake,
  Lightbulb,
  Zap,
} from 'lucide-react';

// Import existing section components
import { WhyChooseUs, Services, Partners, Awards, Testimonials } from '@/components/sections';
import { Statistics } from '@/components/sections';

// Mock company values
const companyValues = [
  {
    icon: Shield,
    title: 'Trust',
    description: 'Building lasting relationships through transparency and reliability.',
    color: 'navy',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Open communication and honest dealings in every transaction.',
    color: 'gold',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'Doing the right thing, even when no one is watching.',
    color: 'navy',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Embracing technology and modern approaches to real estate.',
    color: 'gold',
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description: "Our clients' success is our success. We go above and beyond.",
    color: 'navy',
  },
  {
    icon: Award,
    title: 'Professional Excellence',
    description: 'Striving for excellence in every aspect of our service.',
    color: 'gold',
  },
];

// Mock statistics data
const aboutStats = [
  {
    id: 'years',
    icon: 'Award',
    label: 'Years of Excellence',
    value: 10,
    suffix: '+',
    color: 'gold',
  },
  {
    id: 'properties',
    icon: 'Home',
    label: 'Properties Sold',
    value: 1200,
    suffix: '+',
    color: 'navy',
  },
  {
    id: 'rentals',
    icon: 'Building2',
    label: 'Rental Properties',
    value: 800,
    suffix: '+',
    color: 'gold',
  },
  {
    id: 'commercial',
    icon: 'Briefcase',
    label: 'Commercial Deals',
    value: 350,
    suffix: '+',
    color: 'navy',
  },
  { id: 'luxury', icon: 'Crown', label: 'Luxury Listings', value: 200, suffix: '+', color: 'gold' },
  { id: 'clients', icon: 'Users', label: 'Happy Clients', value: 980, suffix: '+', color: 'navy' },
];

const AboutPage = () => {
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
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
        <title>About Elite Real Estate | Luxury Real Estate Experts</title>
        <meta
          name="description"
          content="Learn about Elite Real Estate - our story, values, and commitment to excellence in luxury real estate. Discover why we're the trusted choice for premium properties."
        />
        <link rel="canonical" href="https://eliterealestate.com/about" />
        <meta property="og:title" content="About Elite Real Estate | Luxury Real Estate Experts" />
        <meta
          property="og:description"
          content="Learn about Elite Real Estate - our story, values, and commitment to excellence."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Elite Real Estate',
            description: 'Learn about our story, values, and commitment to excellence.',
            url: 'https://eliterealestate.com/about',
          })}
        </script>
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
          <div className="max-w-3xl">
            <Badge variant="luxury" size="lg" className="mb-4">
              <Star className="w-4 h-4 mr-2" />
              About Us
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Our Story
            </h1>
            <p className="text-gold-400 text-xl sm:text-2xl font-playfair font-semibold mt-2">
              Excellence in luxury real estate
            </p>
            <p className="text-navy-300 text-base sm:text-lg mt-4 max-w-2xl">
              Founded with a vision to transform the luxury real estate experience, Elite Real
              Estate has grown into a trusted name in premium properties.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/contact">
                <Button variant="luxury" size="lg">
                  Get in Touch
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/agents">
                <Button variant="glass" size="lg">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Story */}
      <Section padding="lg" background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our Journey"
              subtitle="Built on trust, driven by excellence"
              align="center"
              size="lg"
            />
            <div className="prose prose-lg max-w-none text-navy-600 leading-relaxed mt-8 space-y-4">
              <p>
                Elite Real Estate was founded in 2014 with a simple yet powerful vision: to redefine
                the luxury real estate experience. What began as a small boutique agency has grown
                into one of the most trusted names in premium properties, serving clients across 15+
                cities and 3 countries.
              </p>
              <p>
                Our journey has been defined by an unwavering commitment to excellence,
                transparency, and client satisfaction. We&apos;ve helped thousands of families find their
                dream homes, assisted investors in building wealth through strategic property
                acquisitions, and guided businesses in securing prime commercial spaces.
              </p>
              <p>
                Today, Elite Real Estate stands as a symbol of trust and expertise in the luxury
                real estate market. Our team of 50+ expert agents brings decades of combined
                experience, deep local market knowledge, and a global network of premium properties.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section padding="lg" background="gray">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission */}
            <Card padding="xl" className="h-full border-gold-100/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gold-50 rounded-full">
                  <Target className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-navy-800">Our Mission</h3>
              </div>
              <p className="text-navy-600 leading-relaxed">
                To provide an unparalleled real estate experience through expert guidance,
                innovative marketing, and a commitment to our clients&apos; success. We strive to make
                every property transaction seamless, transparent, and rewarding.
              </p>
            </Card>

            {/* Vision */}
            <Card padding="xl" className="h-full border-gold-100/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gold-50 rounded-full">
                  <Eye className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-navy-800">Our Vision</h3>
              </div>
              <p className="text-navy-600 leading-relaxed">
                To be the world&apos;s leading luxury real estate platform, connecting discerning buyers
                and sellers with exceptional properties and creating lasting value for our clients,
                partners, and communities.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Company Statistics */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Our Impact in Numbers"
            subtitle="Trusted by clients worldwide"
            align="center"
            size="md"
          />
          <div className="mt-8">
            <Statistics statistics={aboutStats} title="" subtitle="" description="" />
          </div>
        </Container>
      </Section>

      {/* Why Choose Us - Reuse existing component */}
      <WhyChooseUs />

      {/* Our Services - Reuse existing component */}
      <Services />

      {/* Company Values */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide us"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  padding="lg"
                  hoverable
                  className={cn(
                    'text-center h-full border',
                    value.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                  )}
                >
                  <div
                    className={cn(
                      'p-3 rounded-full w-fit mx-auto mb-3',
                      value.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-6 h-6',
                        value.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                      )}
                    />
                  </div>
                  <h4 className="font-semibold text-navy-800">{value.title}</h4>
                  <p className="text-sm text-navy-500 mt-2">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Our Partners - Reuse existing component */}
      <Partners />

      {/* Awards & Recognition - Reuse existing component */}
      <Awards />

      {/* Client Testimonials - Reuse existing component */}
      <Testimonials />

      {/* Premium CTA - Reuse existing component */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="flex justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-gold-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-navy-300">
                  Get Started
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Ready to Begin Your Real Estate Journey?
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Whether you&apos;re buying, selling, or investing, our expert team is here to guide you
                every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/contact">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/buy">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    Browse Properties
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Expert Guidance
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Premium Service
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  No Obligation
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(AboutPage);
