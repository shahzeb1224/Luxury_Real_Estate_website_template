import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Card, Badge } from '@/components/ui';
import { WhyChooseUs, Testimonials, FAQ, CTA } from '@/components/sections';
import {
  Home,
  Building2,
  Users,
  Crown,
  TrendingUp,
  LineChart,
  DollarSign,
  MapPin,
  Briefcase,
  Shield,
  Award,
  Star,
  ChevronRight,
  Sparkles,
  Settings,
  BarChart,
} from 'lucide-react';

const servicesData = [
  {
    id: 'buying',
    icon: Home,
    title: 'Property Buying',
    description:
      'Expert guidance for purchasing your dream luxury property. From search to closing, we handle every detail.',
    href: '/services/buying',
    color: 'gold',
    features: ['Property Search', 'Price Negotiation', 'Due Diligence', 'Closing Support'],
  },
  {
    id: 'selling',
    icon: TrendingUp,
    title: 'Property Selling',
    description:
      "Maximize your property's value with our premium marketing and negotiation expertise.",
    href: '/services/selling',
    color: 'navy',
    features: ['Market Analysis', 'Professional Staging', 'Global Marketing', 'Negotiation'],
  },
  {
    id: 'management',
    icon: Settings,
    title: 'Property Management',
    description: 'Comprehensive management services for your luxury property portfolio.',
    href: '/services/management',
    color: 'gold',
    features: ['Tenant Management', 'Maintenance', 'Financial Reporting', 'Legal Compliance'],
  },
  {
    id: 'luxury-consulting',
    icon: Crown,
    title: 'Luxury Property Consulting',
    description: 'Personalized consulting for ultra-premium property acquisitions and investments.',
    href: '/services/luxury-consulting',
    color: 'navy',
    features: [
      'Market Intelligence',
      'Portfolio Strategy',
      'Exclusive Access',
      'White-Glove Service',
    ],
  },
  {
    id: 'investment-advisory',
    icon: Briefcase,
    title: 'Investment Advisory',
    description:
      'Strategic investment advice for building and optimizing your real estate portfolio.',
    href: '/services/investment-advisory',
    color: 'gold',
    features: ['ROI Analysis', 'Market Trends', 'Risk Assessment', 'Portfolio Diversification'],
  },
  {
    id: 'market-analysis',
    icon: BarChart,
    title: 'Market Analysis',
    description: 'Data-driven market insights to inform your real estate decisions.',
    href: '/services/market-analysis',
    color: 'navy',
    features: ['Price Trends', 'Demand Analysis', 'Competitive Intelligence', 'Future Projections'],
  },
  {
    id: 'valuation',
    icon: DollarSign,
    title: 'Property Valuation',
    description: 'Accurate property valuations from certified luxury real estate appraisers.',
    href: '/services/valuation',
    color: 'gold',
    features: [
      'Comparative Analysis',
      'Investment Value',
      'Appraisal Reports',
      'Market Positioning',
    ],
  },
  {
    id: 'relocation',
    icon: MapPin,
    title: 'Relocation Services',
    description: 'Seamless relocation support for individuals and families moving to new cities.',
    href: '/services/relocation',
    color: 'navy',
    features: ['City Briefings', 'School Searches', 'Community Tours', 'Settlement Support'],
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Real Estate',
    description: 'Specialized services for office, retail, and industrial commercial properties.',
    href: '/services/commercial',
    color: 'gold',
    features: ['Site Selection', 'Lease Negotiation', 'Investment Analysis', 'Property Management'],
  },
];

const servicesStats = [
  { value: '10+', label: 'Years Excellence', icon: Award },
  { value: '1200+', label: 'Properties Sold', icon: Home },
  { value: '980+', label: 'Happy Clients', icon: Users },
  { value: '4.9', label: 'Average Rating', icon: Star },
];

const ServicesPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
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
        <title>Real Estate Services | Elite Real Estate</title>
        <meta
          name="description"
          content="Comprehensive luxury real estate services including buying, selling, property management, investment advisory, and relocation services."
        />
        <link rel="canonical" href="https://eliterealestate.com/services" />
        <meta property="og:title" content="Real Estate Services | Elite Real Estate" />
        <meta property="og:description" content="Comprehensive luxury real estate services." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Luxury Real Estate Services',
            description: 'Comprehensive luxury real estate services',
            provider: {
              '@type': 'RealEstateAgent',
              name: 'Elite Real Estate',
            },
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
              <Sparkles className="w-4 h-4 mr-2" />
              Our Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Comprehensive Real Estate Services
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              From buying and selling to investment advisory and property management — we provide
              end-to-end luxury real estate services.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="#services">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Explore Services
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/consultation">
                <Button variant="glass" size="lg" className="min-w-[180px]">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section id="services" padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Our Services"
            subtitle="Expert solutions for every real estate need"
            align="center"
            size="lg"
          />

          <motion.div
            variants={cardVariants.grid.container}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8"
          >
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={service.href} className="group block h-full">
                    <Card
                      padding="lg"
                      hoverable
                      className={cn(
                        'h-full transition-all duration-300 border',
                        service.color === 'gold'
                          ? 'border-gold-100/50 hover:border-gold-300'
                          : 'border-navy-100 hover:border-navy-300'
                      )}
                    >
                      <div className="flex flex-col items-start">
                        <div
                          className={cn(
                            'p-3 rounded-xl mb-4',
                            service.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-6 h-6',
                              service.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                            )}
                          />
                        </div>
                        <h3 className="text-lg font-playfair font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-navy-500 mt-2 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {service.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-navy-50 text-navy-600 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <span className="mt-4 text-sm font-medium text-gold-500 group-hover:text-gold-600 transition-colors flex items-center gap-1">
                          Learn More
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Statistics */}
      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {servicesStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-navy-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us - Reuse existing component */}
      <WhyChooseUs />

      {/* Testimonials - Reuse existing component */}
      <Testimonials />

      {/* FAQ - Reuse existing component */}
      <FAQ />

      {/* CTA - Reuse existing component */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(ServicesPage);
