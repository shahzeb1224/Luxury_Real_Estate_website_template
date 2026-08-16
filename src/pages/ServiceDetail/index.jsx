import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Card, Badge } from '@/components/ui';
import { PropertyCard } from '@/components/property';
import { WhyChooseUs, Testimonials, CTA } from '@/components/sections';
import { SERVICES_DATA } from '@/data/servicesData';
import { SEARCH_PROPERTIES } from '@/data/searchData';
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
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react';

// Map service icons
const iconMap = {
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
  Settings,
  BarChart,
};

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Find service data
  const service = useMemo(() => {
    return SERVICES_DATA.find((s) => s.slug === serviceSlug);
  }, [serviceSlug]);

  // Get related services
  const relatedServices = useMemo(() => {
    if (!service) return [];
    return SERVICES_DATA.filter(
      (s) => service.relatedServices.includes(s.id) && s.id !== service.id
    );
  }, [service]);

  // Get related properties (for demonstration)
  const relatedProperties = useMemo(() => {
    if (!service) return [];
    // Get some properties for demonstration
    return SEARCH_PROPERTIES.slice(0, 3);
  }, [service]);

  // Get icon component
  const Icon = service ? iconMap[service.icon] || Home : Home;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [serviceSlug]);

  // If service not found
  if (!loading && !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold text-navy-800">Service Not Found</h1>
          <p className="text-navy-500 mt-4">
            The service you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/services">
            <Button variant="luxury" size="md" className="mt-6">
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading fullscreen />;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title, href: '#' },
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
        <title>{service.title} | Elite Real Estate</title>
        <meta
          name="description"
          content={`${service.title} services from Elite Real Estate. ${service.description}`}
        />
        <link rel="canonical" href={`https://eliterealestate.com/services/${service.slug}`} />
        <meta property="og:title" content={`${service.title} | Elite Real Estate`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: {
              '@type': 'RealEstateAgent',
              name: 'Elite Real Estate',
            },
            serviceType: service.title,
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section
        className={cn(
          'relative w-full overflow-hidden py-16 sm:py-20 lg:py-28',
          service.color === 'gold'
            ? 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700'
            : 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700'
        )}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="luxury" size="lg" className="mb-4">
              <Icon className="w-4 h-4 mr-2" />
              {service.title}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              {service.title}
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">{service.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/consultation">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Book Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="lg" className="min-w-[160px]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Overview */}
      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-playfair font-semibold text-navy-800 mb-4">Overview</h2>
              <div className="prose prose-lg max-w-none text-navy-600 leading-relaxed">
                {service.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card padding="lg" className="border-gold-100/30 sticky top-24">
                <h3 className="font-semibold text-navy-800 mb-4">At a Glance</h3>
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-navy-600">
                      <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-navy-100 space-y-2">
                  <Link to="/consultation">
                    <Button variant="luxury" size="md" fullWidth>
                      Book Now
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="md" fullWidth>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Key Benefits"
            subtitle={`Why choose our ${service.title} services`}
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card padding="lg" hoverable className="h-full border-gold-100/30">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-gold-50 rounded-lg flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-gold-500" />
                    </div>
                    <p className="text-sm text-navy-600 leading-relaxed">{benefit}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader title="Our Process" subtitle="How we work" align="center" size="md" />
          <div className="relative mt-8">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold-200 -translate-x-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {service.process.map((step, index) => (
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
                    {step.step}
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

      {/* Why Choose */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Why Choose Us"
            subtitle={`What sets our ${service.title} services apart`}
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {service.whyChoose.map((reason, index) => {
              const icons = [Award, Shield, Users, Star];
              const Icon = icons[index % icons.length];
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
                    <p className="text-sm text-navy-600">{reason}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <Section padding="lg" background="white">
          <Container>
            <SectionHeader
              title="Related Properties"
              subtitle={`Properties that complement our ${service.title} services`}
              align="center"
              size="md"
            />
            <motion.div
              variants={cardVariants.grid.container}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8"
            >
              {relatedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                >
                  <PropertyCard
                    property={property}
                    variant="grid"
                    size="md"
                    showActions={true}
                    featured={property.featured}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section padding="lg" background="gray">
          <Container>
            <SectionHeader
              title="Related Services"
              subtitle="Explore our other premium services"
              align="center"
              size="md"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {relatedServices.map((relatedService, index) => {
                const RelatedIcon = iconMap[relatedService.icon] || Home;
                return (
                  <motion.div
                    key={relatedService.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link to={`/services/${relatedService.slug}`} className="group block">
                      <Card padding="lg" hoverable className="h-full transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              'p-2 rounded-lg flex-shrink-0',
                              relatedService.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                            )}
                          >
                            <RelatedIcon
                              className={cn(
                                'w-5 h-5',
                                relatedService.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                              )}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                              {relatedService.title}
                            </h4>
                            <p className="text-sm text-navy-500">{relatedService.description}</p>
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
      )}

      {/* Consultation CTA */}
      <Section padding="lg" background="white">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <Badge variant="luxury" size="lg" className="mx-auto mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Consultation
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="text-navy-300 mt-3 max-w-2xl mx-auto">
                Schedule a consultation with our {service.title} experts and take the next step in
                your property journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/consultation">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    Book Consultation
                    <Calendar className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    Contact Us
                    <Mail className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(ServiceDetailPage);
