import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Badge, Card } from '@/components/ui';
import { AgentGrid, AgentCard, AgentContact } from '@/components/agents';
import { getAgentImage } from '@/assets/images/agents';
import {
  Users,
  Star,
  Award,
  Home,
  Building2,
  Briefcase,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Crown,
  ChevronRight,
  Handshake,
  FileText,
  PenTool,
} from 'lucide-react';

// Mock agents data
const mockAgents = [
  {
    id: 'agt-001',
    name: 'Sarah Johnson',
    title: 'Luxury Property Specialist',
    image: getAgentImage(0),
    experience: 12,
    specialization: 'Luxury Villas & Estates',
    languages: ['English', 'Spanish', 'French'],
    rating: 4.9,
    verified: true,
    propertiesSold: 45,
    awards: 8,
    location: 'Beverly Hills, CA',
    phone: '+1 (310) 555-0123',
    email: 'sarah@eliterealestate.com',
    social: {
      facebook: 'https://facebook.com/sarahjohnson',
      instagram: 'https://instagram.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
    },
  },
  {
    id: 'agt-002',
    name: 'Michael Chen',
    title: 'Commercial Real Estate Expert',
    image: getAgentImage(1),
    experience: 15,
    specialization: 'Commercial & Investment',
    languages: ['English', 'Mandarin', 'Cantonese'],
    rating: 4.8,
    verified: true,
    propertiesSold: 67,
    awards: 12,
    location: 'Los Angeles, CA',
    phone: '+1 (213) 555-0456',
    email: 'michael@eliterealestate.com',
    social: {
      linkedin: 'https://linkedin.com/in/michaelchen',
    },
  },
  {
    id: 'agt-003',
    name: 'Jennifer Williams',
    title: 'Luxury Villa Specialist',
    image: getAgentImage(2),
    experience: 10,
    specialization: 'Malibu & Santa Monica',
    languages: ['English'],
    rating: 4.9,
    verified: true,
    propertiesSold: 34,
    awards: 6,
    location: 'Malibu, CA',
    phone: '+1 (310) 555-0789',
    email: 'jennifer@eliterealestate.com',
    social: {
      instagram: 'https://instagram.com/jenniferwilliams',
      linkedin: 'https://linkedin.com/in/jenniferwilliams',
    },
  },
  {
    id: 'agt-004',
    name: 'David Park',
    title: 'Investment Property Advisor',
    image: getAgentImage(0),
    experience: 8,
    specialization: 'Investment & Portfolio Management',
    languages: ['English', 'Korean'],
    rating: 4.7,
    verified: true,
    propertiesSold: 28,
    awards: 4,
    location: 'Orange County, CA',
    phone: '+1 (714) 555-0345',
    email: 'david@eliterealestate.com',
    social: {
      linkedin: 'https://linkedin.com/in/davidpark',
    },
  },
  {
    id: 'agt-005',
    name: 'Lisa Martinez',
    title: 'Residential Sales Expert',
    image: getAgentImage(1),
    experience: 9,
    specialization: 'Family Homes & Relocation',
    languages: ['English', 'Spanish'],
    rating: 4.8,
    verified: true,
    propertiesSold: 52,
    awards: 7,
    location: 'Santa Monica, CA',
    phone: '+1 (310) 555-0678',
    email: 'lisa@eliterealestate.com',
    social: {
      instagram: 'https://instagram.com/lisamartinez',
    },
  },
  {
    id: 'agt-006',
    name: 'James Thompson',
    title: 'Luxury Waterfront Specialist',
    image: getAgentImage(2),
    experience: 14,
    specialization: 'Waterfront & Coastal Properties',
    languages: ['English'],
    rating: 4.9,
    verified: true,
    propertiesSold: 41,
    awards: 9,
    location: 'Newport Beach, CA',
    phone: '+1 (949) 555-0890',
    email: 'james@eliterealestate.com',
    social: {
      linkedin: 'https://linkedin.com/in/jamesthompson',
    },
  },
];

const AgentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [agents] = useState(mockAgents);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Agent specializations
  const specializations = [
    { icon: Home, label: 'Residential', count: '120+', color: 'navy' },
    { icon: Crown, label: 'Luxury Homes', count: '85+', color: 'gold' },
    { icon: Building2, label: 'Commercial', count: '45+', color: 'navy' },
    { icon: Briefcase, label: 'Rental Properties', count: '60+', color: 'gold' },
    { icon: TrendingUp, label: 'Investment', count: '40+', color: 'navy' },
    { icon: FileText, label: 'Off-plan Projects', count: '25+', color: 'gold' },
  ];

  // Success statistics
  const stats = [
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '350+', label: 'Properties Sold', icon: Home },
    { value: '980+', label: 'Happy Clients', icon: Users },
    { value: '4.9', label: 'Average Rating', icon: Star },
    { value: '15', label: 'Cities Covered', icon: MapPin },
  ];

  // Process steps
  const processSteps = [
    {
      icon: Handshake,
      title: 'Consultation',
      description: 'Understand your needs and preferences.',
    },
    {
      icon: PenTool,
      title: 'Property Selection',
      description: 'Curated properties matching your criteria.',
    },
    {
      icon: MapPin,
      title: 'Site Visits',
      description: 'Private viewings of shortlisted properties.',
    },
    {
      icon: Handshake,
      title: 'Negotiation',
      description: 'Expert negotiation for the best deal.',
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Complete legal and financial documentation.',
    },
    {
      icon: CheckCircle,
      title: 'Closing',
      description: 'Seamless transaction and handover.',
    },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Agents', href: '/agents' },
  ];

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Expert Real Estate Agents | Elite Real Estate</title>
        <meta
          name="description"
          content="Meet our team of expert real estate agents. Specializing in luxury properties, commercial real estate, and premium client service."
        />
        <link rel="canonical" href="https://eliterealestate.com/agents" />
        <meta property="og:title" content="Expert Real Estate Agents | Elite Real Estate" />
        <meta property="og:description" content="Meet our team of expert real estate agents." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Real Estate Agents',
            description: 'Our team of expert real estate agents.',
            url: 'https://eliterealestate.com/agents',
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
              <Users className="w-4 h-4 mr-2" />
              Our Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Meet Our Professional Property Experts
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Our team of dedicated real estate professionals brings decades of combined experience
              and a passion for excellence. Whether you&apos;re buying, selling, or investing,
              we&apos;re here to guide you every step of the way.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="#agents">
                <Button variant="luxury" size="lg">
                  View Our Agents
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="lg">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Work With Our Agents */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Why Work With Our Agents"
            subtitle="Excellence in every transaction"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
            {[
              { icon: Award, title: 'Experience', description: '10+ years average experience' },
              { icon: MapPin, title: 'Local Knowledge', description: 'Deep market expertise' },
              {
                icon: CheckCircle,
                title: 'Verified Listings',
                description: 'Authentic properties',
              },
              { icon: Handshake, title: 'Expert Negotiation', description: 'Best deal for you' },
              { icon: TrendingUp, title: 'Investment Guidance', description: 'Data-driven advice' },
            ].map((item, index) => (
              <Card
                key={index}
                padding="lg"
                hoverable
                className="text-center h-full border-gold-100/30"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gold-50 rounded-full">
                    <item.icon className="w-6 h-6 text-gold-500" />
                  </div>
                </div>
                <h4 className="font-semibold text-navy-800">{item.title}</h4>
                <p className="text-sm text-navy-500 mt-1">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Agent Specializations */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Agent Specializations"
            subtitle="Expertise across all property types"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <Card key={index} padding="lg" hoverable className="border border-gold-100/30">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        spec.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-5 h-5',
                          spec.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                        )}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-800">{spec.label}</h4>
                      <p className="text-sm text-navy-500">{spec.count} properties</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Featured Agents */}
      <Section id="agents" padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Featured Agents"
            subtitle="Meet our expert team"
            align="left"
            size="md"
          />
          <div className="mt-8">
            <AgentGrid
              agents={agents}
              loading={loading}
              featuredAgent={agents[0]}
              columns={3}
              showViewAll={false}
            />
          </div>
        </Container>
      </Section>

      {/* Success Statistics */}
      <Section padding="lg" background="navy-dark" className="text-white">
        <Container>
          <SectionHeader
            title="Our Success in Numbers"
            subtitle="Trusted by clients worldwide"
            align="center"
            size="md"
            titleClassName="text-white"
            subtitleClassName="text-gold-400"
          />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 mt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-navy-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Our Process */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Our Process"
            subtitle="Seamless experience from start to finish"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} padding="lg" hoverable className="border border-gold-100/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500 font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gold-500" />
                        <h4 className="font-semibold text-navy-800">{step.title}</h4>
                      </div>
                      <p className="text-sm text-navy-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Join Our Team CTA */}
      <Section padding="lg" background="gray">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <Badge variant="luxury" size="lg" className="mx-auto mb-4">
                <Users className="w-4 h-4 mr-2" />
                Careers
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Join Our Team of Experts
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Are you passionate about real estate and delivering exceptional service? Join our
                growing team of professionals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/careers">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    View Open Positions
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    Contact HR
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Top Industry Compensation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Professional Development
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Award-Winning Culture
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Our Experts */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Contact Our Experts"
            subtitle="Get personalized assistance"
            align="center"
            size="md"
          />
          <div className="max-w-3xl mx-auto mt-8">
            <AgentContact
              agentId="general"
              agentName="Our Team"
              agentPhone="+1 (888) 555-0123"
              agentEmail="agents@eliterealestate.com"
            />
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(AgentsPage);
