import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Badge, Card } from '@/components/ui';
import Loading from '@/components/shared/Loading';
import { Services } from '@/components/sections';
import { Testimonials } from '@/components/sections';
import { FAQ } from '@/components/sections';
import { CTA } from '@/components/sections/CTA/index.jsx';
import { cn } from '@/utils/cn';
import CommercialCategories from '@/components/sections/CommercialCategories';
import CommercialProcess from '@/components/sections/CommercialProcess';
import {
  COMMERCIAL_STATS,
  COMMERCIAL_SERVICES,
  COMMERCIAL_PROPERTY_TYPES,
  COMMERCIAL_PROCESS,
  COMMERCIAL_WHY_CHOOSE,
} from '@/data/commercialServices';
import {
  Building2,
  TrendingUp,
  Users,
  MapPin,
  Settings,
  DollarSign,
  ChevronRight,
  Award,
  LineChart,
  Handshake,
  Briefcase,
  Store,
  Factory,
  Warehouse,
} from 'lucide-react';

// Lazy load heavy components
const LazyCommercialCategories = lazy(() => import('@/components/sections/CommercialCategories'));

const LazyCommercialProcess = lazy(() => import('@/components/sections/CommercialProcess'));

const CommercialServicesPage = () => {
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Commercial Services', href: '/commercial-services' },
  ];

  // Why Choose Us data for commercial
  const whyChooseData = [
    {
      icon: Award,
      title: 'Commercial Expertise',
      description: 'Specialized knowledge across all commercial property types.',
    },
    {
      icon: LineChart,
      title: 'Investment Advisory',
      description: 'Data-driven insights for optimal investment decisions.',
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Comprehensive market research and competitive analysis.',
    },
    {
      icon: Handshake,
      title: 'Expert Negotiation',
      description: 'Skilled negotiation for favorable terms and conditions.',
    },
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
        <title>Commercial Real Estate Services | Elite Real Estate</title>
        <meta
          name="description"
          content="Expert commercial real estate services including tenant representation, investment consulting, property management, and site selection. Find your commercial property today."
        />
        <link rel="canonical" href="https://eliterealestate.com/commercial-services" />
        <meta property="og:title" content="Commercial Real Estate Services | Elite Real Estate" />
        <meta
          property="og:description"
          content="Expert commercial real estate services for businesses and investors."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Commercial Real Estate Services',
            description:
              'Comprehensive commercial real estate services including tenant representation, investment consulting, and property management.',
            provider: {
              '@type': 'RealEstateAgent',
              name: 'Elite Real Estate',
            },
            serviceType: 'Commercial Real Estate',
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
              <Building2 className="w-4 h-4 mr-2" />
              Commercial Division
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Commercial Real Estate
              <br />
              <span className="text-gold-400">Services</span>
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Expert guidance for businesses, investors, and developers. From site selection to
              investment consulting, we deliver comprehensive commercial real estate solutions.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/contact">
                <Button variant="luxury" size="lg">
                  Schedule Consultation
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/commercial">
                <Button variant="glass" size="lg">
                  Browse Properties
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-navy-300">
              {COMMERCIAL_STATS.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span className="font-semibold text-white">{stat.value}</span>
                  <span className="text-navy-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us - Commercial */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Why Choose Elite Commercial"
            subtitle="Excellence in commercial real estate"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {whyChooseData.map((item, index) => {
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

      {/* Commercial Services Grid */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Our Commercial Services"
            subtitle="Comprehensive solutions for your business"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {COMMERCIAL_SERVICES.map((service, index) => {
              const Icon = (() => {
                const icons = {
                  Users,
                  Building2,
                  TrendingUp,
                  MapPin,
                  Settings,
                  DollarSign,
                };
                return icons[service.icon] || Building2;
              })();

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link to={service.href} className="group block">
                    <Card
                      padding="lg"
                      hoverable
                      className={cn(
                        'h-full transition-all duration-300 border',
                        service.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'p-2 rounded-lg flex-shrink-0',
                            service.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-5 h-5',
                              service.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                            )}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-sm text-navy-500">{service.description}</p>
                          <span className="text-xs text-gold-500 mt-2 inline-block group-hover:underline">
                            Learn More →
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Commercial Categories - Lazy Loaded */}
      <Suspense fallback={<Loading variant="skeleton" className="py-20" />}>
        <LazyCommercialCategories
          categories={COMMERCIAL_PROPERTY_TYPES}
          title="Commercial Property Types"
          subtitle="Find the perfect commercial space for your business"
          viewAllLink="/commercial"
          columns={3}
        />
      </Suspense>

      {/* Commercial Process - Lazy Loaded */}
      <Suspense fallback={<Loading variant="skeleton" className="py-20" />}>
        <LazyCommercialProcess
          steps={COMMERCIAL_PROCESS}
          title="Our Commercial Process"
          subtitle="Expert guidance from start to finish"
        />
      </Suspense>

      {/* Testimonials - Reuse existing */}
      <Testimonials />

      {/* FAQ - Reuse existing FAQ architecture with commercial FAQs */}
      <FAQ />

      {/* Final CTA - Reuse existing CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(CommercialServicesPage);
