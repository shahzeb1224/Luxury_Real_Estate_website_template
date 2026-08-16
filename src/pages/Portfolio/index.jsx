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
import { CTA } from '@/components/sections';
import {
  Home,
  Building2,
  Briefcase,
  Award,
  MapPin,
  ChevronRight,
  Calendar,
  Star,
  Sparkles,
  Search,
  Filter,
  Grid3x3,
  List,
  X,
  Eye,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import PORTFOLIO_DATA from '@/data/portfolioData';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { projects, categories, statuses, awards } = PORTFOLIO_DATA;

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeStatus !== 'all') {
      result = result.filter((p) => p.status === activeStatus);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Featured first (projects with awards)
    result.sort((a, b) => {
      if (a.awards.length > 0 && b.awards.length === 0) return -1;
      if (a.awards.length === 0 && b.awards.length > 0) return 1;
      return 0;
    });

    return result;
  }, [activeCategory, activeStatus, searchQuery, projects]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
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
        <title>Portfolio | Elite Real Estate</title>
        <meta
          name="description"
          content="Explore our award-winning portfolio of luxury residential, commercial, and investment properties. Discover our featured developments and projects."
        />
        <link rel="canonical" href="https://eliterealestate.com/portfolio" />
        <meta property="og:title" content="Portfolio | Elite Real Estate" />
        <meta property="og:description" content="Explore our award-winning portfolio." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
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
              <Award className="w-4 h-4 mr-2" />
              Award-Winning Portfolio
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Our Portfolio of Excellence
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Discover our award-winning collection of luxury residential, commercial, and
              investment properties.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="#projects">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Explore Portfolio
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="glass" size="lg" className="min-w-[160px]">
                  Inquire Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Awards Section */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Awards & Recognition"
            subtitle="Celebrating excellence in real estate"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {awards.map((award, index) => (
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
                      <Award className="w-6 h-6 text-gold-500" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-navy-800">{award.title}</h4>
                  <p className="text-sm text-navy-500">{award.organization}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-xs text-navy-400">
                    <span>{award.year}</span>
                    <span className="w-1 h-1 rounded-full bg-navy-300" />
                    <span>{award.category}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Projects Filter */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-3 py-2.5 bg-navy-50 border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={activeStatus}
                onChange={(e) => setActiveStatus(e.target.value)}
                className="px-3 py-2.5 bg-navy-50 border border-navy-200 rounded-lg text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-navy-50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-navy-400 hover:text-navy-600'
                  )}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    viewMode === 'list'
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-navy-400 hover:text-navy-600'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section id="projects" padding="lg" background="gray">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-navy-500">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}{' '}
              found
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {loading ? (
            <div
              className={cn(
                'grid gap-4 sm:gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                  <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                    <div className="h-4 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                    <div className="h-4 bg-navy-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              variants={cardVariants.grid.container}
              initial="initial"
              animate="animate"
              className={cn(
                'grid gap-4 sm:gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Card padding="none" hoverable className="overflow-hidden h-full">
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {project.awards.length > 0 && (
                        <Badge variant="luxury" size="sm" className="absolute top-3 left-3">
                          <Award className="w-3 h-3 mr-1" />
                          Award Winner
                        </Badge>
                      )}
                      <Badge
                        variant={project.status === 'Completed' ? 'success' : 'warning'}
                        size="sm"
                        className="absolute top-3 right-3"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-navy-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {project.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-navy-300" />
                            <span>{project.type}</span>
                          </div>
                        </div>
                        {project.price && (
                          <Badge variant="default" size="sm" className="bg-gold-50 text-gold-600">
                            {project.price}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-navy-500 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-navy-100">
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-navy-50 text-navy-600 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 3 && (
                            <span className="px-2 py-0.5 text-navy-400 text-xs">
                              +{project.features.length - 3}
                            </span>
                          )}
                        </div>
                        <Link to={`/portfolio/${project.id}`} className="ml-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gold-500 hover:text-gold-600"
                          >
                            View Details
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center">
                <Search className="w-10 h-10 text-navy-300" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-navy-800 mt-6">
                No Projects Found
              </h3>
              <p className="text-navy-500 max-w-sm mt-2">
                Try adjusting your filters to find more projects.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveStatus('all');
                }}
                className="mt-6 px-6 py-3 bg-gold-500 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(PortfolioPage);
