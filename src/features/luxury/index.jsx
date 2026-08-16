import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Card, Badge } from '@/components/ui';
import { PropertyCard } from '@/components/property';
import { WhyChooseUs, CTA } from '@/components/sections';
import {
  Crown,
  Sparkles,
  Home,
  Building2,
  Waves,
  Mountain,
  MapPin,
  ChevronRight,
  Star,
  Gem,
  Award,
  Users,
  Eye,
  Shield,
  Car,
  Palette,
  Calendar,
  Heart,
} from 'lucide-react';
import { SEARCH_PROPERTIES } from '@/data/searchData';

const luxuryProperties = SEARCH_PROPERTIES.filter(
  (p) => p.featured || p.price > 2000000 || p.type === 'Estate' || p.type === 'Villa'
).slice(0, 12);

const luxuryCategories = [
  {
    icon: Crown,
    label: 'Luxury Villas',
    description: 'Exclusive private villas with premium amenities',
    count: 45,
    color: 'gold',
  },
  {
    icon: Building2,
    label: 'Penthouses',
    description: 'Sky-high living with panoramic views',
    count: 28,
    color: 'navy',
  },
  {
    icon: Waves,
    label: 'Waterfront Properties',
    description: 'Oceanfront and beachfront luxury estates',
    count: 32,
    color: 'gold',
  },
  {
    icon: Home,
    label: 'Signature Estates',
    description: 'Grand estates with exceptional privacy',
    count: 24,
    color: 'navy',
  },
];

const luxuryBenefits = [
  {
    icon: Award,
    title: 'Curated Collection',
    description: 'Handpicked properties representing the pinnacle of luxury.',
  },
  {
    icon: Shield,
    title: 'White-Glove Service',
    description: 'Personalized service from consultation to closing.',
  },
  {
    icon: Eye,
    title: 'Private Viewings',
    description: 'Exclusive access to properties before public listing.',
  },
  {
    icon: Gem,
    title: 'Global Portfolio',
    description: "Access to the world's most prestigious properties.",
  },
];

const LuxuryPage = () => {
  const [favorites, setFavorites] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Luxury Collection', href: '/luxury' },
  ];

  return (
    <motion.div
      variants={pageVariants.luxury}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white min-h-screen"
    >
      <Helmet>
        <title>Luxury Collection | Elite Real Estate</title>
        <meta
          name="description"
          content="Explore our exclusive luxury collection featuring the world's most prestigious properties. Villas, penthouses, waterfront estates and more."
        />
        <link rel="canonical" href="https://eliterealestate.com/luxury" />
        <meta property="og:title" content="Luxury Collection | Elite Real Estate" />
        <meta property="og:description" content="Explore our exclusive luxury collection." />
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

      {/* Hero Section */}
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
              Curated Collection
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

      {/* Luxury Categories */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Luxury Property Types"
            subtitle="Curated selection of the world's finest properties"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {luxuryCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to={`/properties?type=${category.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group block"
                  >
                    <Card
                      padding="lg"
                      hoverable
                      className={cn(
                        'h-full transition-all duration-300 border',
                        category.color === 'gold'
                          ? 'border-gold-200 hover:border-gold-400'
                          : 'border-navy-200 hover:border-navy-400'
                      )}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={cn(
                            'p-3 rounded-full mb-3',
                            category.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-8 h-8',
                              category.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                            )}
                          />
                        </div>
                        <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                          {category.label}
                        </h3>
                        <p className="text-sm text-navy-500 mt-1">{category.description}</p>
                        <p className="text-xs text-navy-400 mt-2">{category.count} properties</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Why Luxury */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Why Luxury with Elite"
            subtitle="Experience the difference of true luxury service"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {luxuryBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
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
                    <h4 className="font-semibold text-navy-800">{benefit.title}</h4>
                    <p className="text-sm text-navy-500 mt-1">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Featured Luxury Properties */}
      <Section id="collection" padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Featured Luxury Collection"
            subtitle="The world's most extraordinary properties"
            align="center"
            size="md"
          />
          <motion.div
            variants={cardVariants.grid.container}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8"
          >
            {luxuryProperties.slice(0, 6).map((property, index) => (
              <motion.div
                key={property.id}
                variants={cardVariants.grid.item}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  variant="grid"
                  size="lg"
                  isFavorite={favorites.includes(property.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  showActions={true}
                  featured={true}
                  className="hover:shadow-premium-xl"
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link to="/properties">
              <Button variant="outline" size="md" className="min-w-[200px]">
                View All Luxury Properties
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Editorial Showcase */}
      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="luxury" size="md" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Signature Estate
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-navy-800 leading-tight">
                Where Luxury Meets Legacy
              </h2>
              <p className="text-navy-600 mt-4 leading-relaxed">
                Each property in our luxury collection represents a unique opportunity to own a
                piece of architectural history. From historic mansions to contemporary masterpieces,
                these estates are defined by their exceptional quality, prestigious locations, and
                timeless elegance.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link to="/properties">
                  <Button variant="luxury" size="md">
                    Explore Collection
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="md">
                    Private Viewing
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gold-200 to-gold-50 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <Crown className="w-16 h-16 text-gold-300 mx-auto mb-4" />
                  <p className="text-navy-500 font-playfair text-lg">The Art of Luxury Living</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Premium CTA */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
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
                <Link to="/properties">
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
