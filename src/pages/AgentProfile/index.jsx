import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Card, Badge } from '@/components/ui';
import { PropertyCard } from '@/components/property';
import { AgentContact } from '@/components/agents';
import { CTA } from '@/components/sections';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Home,
  Users,
  Calendar,
  MessageCircle,
  CheckCircle,
  ChevronRight,
  Briefcase,
  Clock,
  TrendingUp,
} from 'lucide-react';
import AGENTS_DATA from '@/data/agentsData';

const AgentProfilePage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const agent = useMemo(() => {
    return AGENTS_DATA.find((a) => a.id === agentId);
  }, [agentId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [agentId]);

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  if (loading) {
    return <Loading fullscreen />;
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold text-navy-800">Agent Not Found</h1>
          <p className="text-navy-500 mt-4">
            The agent you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/agents">
            <Button variant="luxury" size="md" className="mt-6">
              Back to Agents
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Agents', href: '/agents' },
    { label: agent.name, href: '#' },
  ];

  const allProperties = [...(agent.listedProperties || []), ...(agent.soldProperties || [])];
  const hasProperties = allProperties.length > 0;

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>{agent.name} | Real Estate Agent | Elite Real Estate</title>
        <meta
          name="description"
          content={`Contact ${agent.name}, expert real estate agent specializing in ${agent.specialization}. ${agent.bio.slice(0, 160)}`}
        />
        <link rel="canonical" href={`https://eliterealestate.com/agent/${agent.id}`} />
        <meta
          property="og:title"
          content={`${agent.name} | Real Estate Agent | Elite Real Estate`}
        />
        <meta
          property="og:description"
          content={`Contact ${agent.name}, expert real estate agent.`}
        />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: agent.name,
            jobTitle: agent.title,
            address: {
              '@type': 'PostalAddress',
              addressLocality: agent.location,
            },
            telephone: agent.phone,
            email: agent.email,
            knowsAbout: agent.specialties,
            worksFor: {
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

      {/* Profile Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-navy-700 border-4 border-gold-500/30 shadow-premium">
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold">
                  {agent.name}
                </h1>
                {agent.verified && (
                  <Badge variant="success" size="md" className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </Badge>
                )}
              </div>

              <p className="text-lg text-gold-400 font-medium">{agent.title}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-navy-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  {agent.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-400" />
                  {agent.experience} Years Experience
                </span>
                <span className="flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-gold-400" />
                  {agent.propertiesSold} Properties Sold
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  {agent.rating}/5 Rating
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Link to="/consultation">
                  <Button variant="luxury" size="md">
                    Book Consultation
                    <Calendar className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href={`tel:${agent.phone}`}>
                  <Button variant="glass" size="md">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </a>
                <a href={`mailto:${agent.email}`}>
                  <Button variant="glass" size="md">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Bio & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card padding="lg" className="border-gold-100/30">
              <h2 className="text-2xl font-playfair font-semibold text-navy-800 mb-4">
                About {agent.name}
              </h2>
              <div className="prose prose-sm max-w-none text-navy-600 leading-relaxed space-y-3">
                {agent.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {agent.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-navy-50 text-navy-600 rounded-full text-xs font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Card>

            {/* Specialties */}
            <Card padding="lg" className="border-gold-100/30">
              <h3 className="text-lg font-playfair font-semibold text-navy-800 mb-3">
                Specialties
              </h3>
              <div className="flex flex-wrap gap-3">
                {agent.specialties.map((specialty, index) => (
                  <Badge key={index} variant="luxury" size="md">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Listed Properties */}
            {agent.listedProperties && agent.listedProperties.length > 0 && (
              <div>
                <h3 className="text-lg font-playfair font-semibold text-navy-800 mb-4">
                  Current Listings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agent.listedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      variant="grid"
                      size="sm"
                      isFavorite={favorites.includes(property.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      showActions={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sold Properties */}
            {agent.soldProperties && agent.soldProperties.length > 0 && (
              <div>
                <h3 className="text-lg font-playfair font-semibold text-navy-800 mb-4">
                  Sold Properties
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agent.soldProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      variant="grid"
                      size="sm"
                      isFavorite={favorites.includes(property.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      showActions={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Properties */}
            {!hasProperties && (
              <Card padding="lg" className="border-gold-100/30 text-center">
                <div className="py-8">
                  <Home className="w-12 h-12 text-navy-300 mx-auto mb-3" />
                  <h3 className="text-lg font-playfair font-semibold text-navy-800">
                    No Properties Listed
                  </h3>
                  <p className="text-sm text-navy-500 mt-1">
                    This agent currently has no properties available.
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Contact & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card padding="lg" className="border-gold-100/30 sticky top-24">
              <h3 className="text-lg font-playfair font-semibold text-navy-800 mb-4">
                Contact {agent.name}
              </h3>

              <div className="space-y-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span className="text-sm font-medium text-navy-700">{agent.phone}</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold-500" />
                  <span className="text-sm font-medium text-navy-700">{agent.email}</span>
                </a>
                <div className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span className="text-sm font-medium text-navy-700">{agent.location}</span>
                </div>
              </div>

              {/* Social Links */}
              {agent.social && Object.keys(agent.social).length > 0 && (
                <div className="mt-4 pt-4 border-t border-navy-100">
                  <h4 className="text-sm font-medium text-navy-600 mb-3">Connect on Social</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.social.facebook && (
                      <a
                        href={agent.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                        aria-label="Facebook"
                      >
                        <FaFacebook className="w-4 h-4 text-navy-600" />
                      </a>
                    )}
                    {agent.social.instagram && (
                      <a
                        href={agent.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                        aria-label="Instagram"
                      >
                        <FaInstagram className="w-4 h-4 text-navy-600" />
                      </a>
                    )}
                    {agent.social.linkedin && (
                      <a
                        href={agent.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn className="w-4 h-4 text-navy-600" />
                      </a>
                    )}
                    {agent.social.twitter && (
                      <a
                        href={agent.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
                        aria-label="Twitter"
                      >
                        <FaTwitter className="w-4 h-4 text-navy-600" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-navy-100">
                <Link to="/consultation">
                  <Button variant="luxury" size="md" fullWidth>
                    Schedule Consultation
                    <Calendar className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card padding="lg" className="border-gold-100/30">
              <h4 className="text-sm font-medium text-navy-600 mb-3">Agent Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-navy-50 rounded-lg">
                  <div className="text-xl font-playfair font-bold text-navy-800">
                    {agent.propertiesSold}
                  </div>
                  <div className="text-xs text-navy-500">Properties Sold</div>
                </div>
                <div className="text-center p-3 bg-navy-50 rounded-lg">
                  <div className="text-xl font-playfair font-bold text-navy-800">
                    {agent.experience}+
                  </div>
                  <div className="text-xs text-navy-500">Years Experience</div>
                </div>
                <div className="text-center p-3 bg-navy-50 rounded-lg">
                  <div className="text-xl font-playfair font-bold text-navy-800">
                    {agent.awards}
                  </div>
                  <div className="text-xs text-navy-500">Awards Won</div>
                </div>
                <div className="text-center p-3 bg-navy-50 rounded-lg">
                  <div className="text-xl font-playfair font-bold text-navy-800">
                    {agent.rating}
                  </div>
                  <div className="text-xs text-navy-500">Client Rating</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(AgentProfilePage);
