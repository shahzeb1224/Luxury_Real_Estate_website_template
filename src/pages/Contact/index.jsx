import React, { useState, lazy, Suspense } from 'react';
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
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  ChevronRight,
  Building2,
  School,
  ShoppingBag,
  UtensilsCrossed,
  Bus,
  Heart,
  Shield,
  TrendingUp,
  Zap,
  Send,
  Star,
  Users,
} from 'lucide-react';

// Import form components
import { ContactForm, AppointmentForm, NewsletterForm } from '@/components/forms';

// Import map component
const GoogleMap = lazy(() => import('@/components/maps/GoogleMap'));

// Import FAQ component
import { FAQ } from '@/components/sections';
import useMediaQuery from '../../hooks/useMediaQuery';
import FAQAccordion from '../../components/sections/Awards/FAQ/FAQAccordion';

// Contact information
const contactInfo = [
  {
    icon: MapPin,
    title: 'Office Address',
    details: '123 Luxury Boulevard, Beverly Hills, CA 90210',
    link: 'https://maps.google.com',
    color: 'gold',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    details: '+1 (888) 555-0123',
    link: 'tel:+18885550123',
    color: 'navy',
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: 'info@eliterealestate.com',
    link: 'mailto:info@eliterealestate.com',
    color: 'gold',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: 'Mon-Fri: 9:00 AM - 6:00 PM',
    color: 'navy',
  },
];

// Quick contact options
const quickContactOptions = [
  {
    icon: Phone,
    label: 'Call Now',
    action: 'tel:+18885550123',
    variant: 'primary',
    description: 'Speak directly with our team',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    action: 'https://wa.me/18885550123',
    variant: 'success',
    description: 'Chat with us instantly',
  },
  {
    icon: Mail,
    label: 'Send Email',
    action: 'mailto:info@eliterealestate.com',
    variant: 'outline',
    description: "We'll respond within 24 hours",
  },
  {
    icon: Calendar,
    label: 'Book Appointment',
    action: '#appointment',
    variant: 'luxury',
    description: 'Schedule a consultation',
  },
];

// Why contact us
const reasons = [
  {
    icon: Shield,
    title: 'Trusted Advisors',
    description: 'Expert guidance from experienced professionals.',
  },
  {
    icon: Star,
    title: 'Verified Listings',
    description: 'Every property is thoroughly vetted.',
  },
  {
    icon: Zap,
    title: 'Fast Response',
    description: 'Quick and efficient communication.',
  },
  {
    icon: Heart,
    title: 'Legal Assistance',
    description: 'Full legal support for your transaction.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Guidance',
    description: 'Data-driven investment advice.',
  },
  {
    icon: Users,
    title: 'Personalized Service',
    description: 'Tailored solutions for your needs.',
  },
];

// Nearby landmarks
const nearbyLandmarks = [
  { icon: School, label: 'Beverly Hills High School', distance: '0.8 mi' },
  { icon: Building2, label: 'Business District', distance: '0.5 mi' },
  { icon: ShoppingBag, label: 'Rodeo Drive', distance: '1.2 mi' },
  { icon: UtensilsCrossed, label: 'Fine Dining', distance: '0.6 mi' },
  { icon: Bus, label: 'Public Transport', distance: '0.3 mi' },
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleContactSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1500);
  };

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white min-h-screen"
    >
      <Helmet>
        <title>Contact Elite Real Estate | Luxury Real Estate Experts</title>
        <meta
          name="description"
          content="Get in touch with our team of luxury real estate experts. Schedule a consultation, inquiry, or property viewing today."
        />
        <link rel="canonical" href="https://eliterealestate.com/contact" />
        <meta
          property="og:title"
          content="Contact Elite Real Estate | Luxury Real Estate Experts"
        />
        <meta property="og:description" content="Contact our team of luxury real estate experts." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Elite Real Estate',
            description: 'Contact our team of luxury real estate experts.',
            url: 'https://eliterealestate.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'Elite Real Estate',
              telephone: '+1-888-555-0123',
              email: 'info@eliterealestate.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Luxury Boulevard',
                addressLocality: 'Beverly Hills',
                addressRegion: 'CA',
                postalCode: '90210',
                addressCountry: 'US',
              },
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
              <Send className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Let&apos;s Find Your Perfect Property
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Our team of expert advisors is here to help you navigate the luxury real estate
              market. Contact us for personalized assistance.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Contact Options */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickContactOptions.map((option, index) => (
              <a
                key={index}
                href={option.action}
                target={option.action.startsWith('http') ? '_blank' : undefined}
                rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={cn(
                  'group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border',
                  option.variant === 'primary' &&
                    'bg-navy-800 text-white border-navy-800 hover:bg-navy-700',
                  option.variant === 'success' &&
                    'bg-green-500 text-white border-green-500 hover:bg-green-600',
                  option.variant === 'outline' &&
                    'bg-white text-navy-800 border-navy-200 hover:bg-navy-50',
                  option.variant === 'luxury' &&
                    'bg-gold-500 text-white border-gold-500 hover:bg-gold-600',
                  'hover:shadow-premium hover:-translate-y-0.5'
                )}
              >
                <div
                  className={cn(
                    'p-2 rounded-lg flex-shrink-0',
                    option.variant === 'outline' ? 'bg-navy-50' : 'bg-white/20'
                  )}
                >
                  <option.icon
                    className={cn(
                      'w-5 h-5',
                      option.variant === 'outline' ? 'text-navy-600' : 'text-white'
                    )}
                  />
                </div>
                <div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs opacity-80">{option.description}</div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Information */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Contact Information"
            subtitle="Reach out to us through any channel"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const Wrapper = info.link ? 'a' : 'div';
              const wrapperProps = info.link
                ? {
                    href: info.link,
                    target: info.link.startsWith('http') ? '_blank' : undefined,
                    rel: info.link.startsWith('http') ? 'noopener noreferrer' : undefined,
                  }
                : {};

              return (
                <Wrapper
                  key={index}
                  className={cn(
                    'block group',
                    info.link &&
                      'cursor-pointer hover:scale-[1.02] transition-transform duration-300'
                  )}
                  {...wrapperProps}
                >
                  <Card
                    padding="lg"
                    hoverable
                    className={cn(
                      'h-full text-center border',
                      info.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                    )}
                  >
                    <div
                      className={cn(
                        'p-3 rounded-full w-fit mx-auto mb-3',
                        info.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-6 h-6',
                          info.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                        )}
                      />
                    </div>
                    <h4 className="font-semibold text-navy-800">{info.title}</h4>
                    <p className="text-sm text-navy-500 mt-1">{info.details}</p>
                    {info.link && (
                      <span className="text-xs text-gold-500 mt-2 inline-block group-hover:underline">
                        {info.title === 'Phone Number'
                          ? 'Call Now'
                          : info.title === 'Email Address'
                            ? 'Send Email'
                            : 'Open in Maps'}
                      </span>
                    )}
                  </Card>
                </Wrapper>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Contact Form & Appointment */}
      <Section id="appointment" padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Get in Touch"
            subtitle="We're here to help with all your real estate needs"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
            {/* Contact Form */}
            <Card padding="lg" className="border-gold-100/30">
              <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
                Send us a Message
              </h3>
              <ContactForm
                onSubmit={handleContactSubmit}
                loading={isSubmitting}
                success={formSuccess}
                className="space-y-4"
              />
            </Card>

            {/* Appointment Form */}
            <Card padding="lg" className="border-gold-100/30">
              <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
                Book an Appointment
              </h3>
              <AppointmentForm
                onSubmit={handleContactSubmit}
                loading={isSubmitting}
                className="space-y-4"
              />
            </Card>
          </div>
        </Container>
      </Section>

      {/* Office Location */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Visit Our Office"
            subtitle="Located in the heart of Beverly Hills"
            align="center"
            size="md"
          />
          <div className="mt-8 rounded-2xl overflow-hidden shadow-premium">
            <Suspense fallback={<Loading variant="skeleton" className="h-80" />}>
              <GoogleMap lat={34.0736} lng={-118.4004} zoom={15} markerTitle="Elite Real Estate" />
            </Suspense>
          </div>

          {/* Nearby Landmarks */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {nearbyLandmarks.map((landmark, index) => {
              const Icon = landmark.icon;
              return (
                <Card key={index} padding="md" className="text-center border-navy-100">
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4 text-gold-500" />
                    <span className="text-sm font-medium text-navy-700">{landmark.label}</span>
                  </div>
                  <p className="text-xs text-navy-400 mt-1">{landmark.distance}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Why Contact Us */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Why Contact Us"
            subtitle="Expert guidance, trusted service"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card
                  key={index}
                  padding="lg"
                  hoverable
                  className="text-center h-full border-gold-100/30"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-gold-50 rounded-full">
                      <Icon className="w-6 h-6 text-gold-500" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-navy-800">{reason.title}</h4>
                  <p className="text-sm text-navy-500 mt-1">{reason.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ - Reuse existing component */}
      <FAQAccordion />

      {/* Premium CTA - Reuse existing component */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="flex justify-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-gold-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-navy-300">
                  We&apos;re Here to Help
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Start Your Real Estate Journey Today
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Whether you&apos;re buying, selling, or investing, our expert team is ready to
                assist you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="#appointment">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation
                  </Button>
                </Link>
                <a href="tel:+18885550123">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
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
                  Confidential Service
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter - Reuse existing component */}
      <Section padding="lg" background="white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Stay Updated"
              subtitle="Subscribe to our newsletter for market insights"
              align="center"
              size="md"
            />
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(ContactPage);
