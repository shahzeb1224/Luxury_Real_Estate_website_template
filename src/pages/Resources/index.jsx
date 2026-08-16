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
  FileText,
  Download,
  TrendingUp,
  BarChart,
  Briefcase,
  Home,
  Building2,
  MapPin,
  Calendar,
  ChevronRight,
  Search,
  Filter,
  Grid3x3,
  List,
  X,
  Sparkles,
  Eye,
  ArrowRight,
  Users,
  Award,
} from 'lucide-react';
import RESOURCES_DATA from '@/data/resourcesData';

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { resources, categories } = RESOURCES_DATA;

  // Filter resources
  const filteredResources = useMemo(() => {
    let result = [...resources];

    if (activeCategory !== 'all') {
      result = result.filter((r) => r.type === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery, resources]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
  ];

  const handleDownload = (resource) => {
    // Simulate download with a placeholder behavior
    alert(`Downloading "${resource.title}" - ${resource.fileSize}`);
  };

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Resources | Elite Real Estate</title>
        <meta
          name="description"
          content="Access premium real estate resources including investment guides, market reports, and investment opportunities."
        />
        <link rel="canonical" href="https://eliterealestate.com/resources" />
        <meta property="og:title" content="Resources | Elite Real Estate" />
        <meta property="og:description" content="Access premium real estate resources." />
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
              <FileText className="w-4 h-4 mr-2" />
              Resources
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Premium Real Estate Resources
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Access our comprehensive collection of investment guides, market reports, and
              exclusive opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="#resources">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Browse Resources
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/consultation">
                <Button variant="glass" size="lg" className="min-w-[160px]">
                  Speak With Advisor
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Search & Filter */}
      <Section padding="md" background="white" className="border-b border-navy-100">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
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

      {/* Resources Grid */}
      <Section id="resources" padding="lg" background="gray">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-navy-500">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}{' '}
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
          ) : filteredResources.length > 0 ? (
            <motion.div
              variants={cardVariants.grid.container}
              initial="initial"
              animate="animate"
              className={cn(
                'grid gap-4 sm:gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
              )}
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card padding="none" hoverable className="overflow-hidden h-full">
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <Badge variant="luxury" size="sm" className="absolute top-3 left-3">
                        {resource.category}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-navy-500 mt-1">{resource.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-navy-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(resource.date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-navy-300" />
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {resource.fileType}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-navy-300" />
                        <span>{resource.fileSize}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-navy-100">
                        <Link to={`/resources/${resource.slug}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View Details
                          </Button>
                        </Link>
                        <Button variant="luxury" size="sm" onClick={() => handleDownload(resource)}>
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center">
                <FileText className="w-10 h-10 text-navy-300" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-navy-800 mt-6">
                No Resources Found
              </h3>
              <p className="text-navy-500 max-w-sm mt-2">
                Try adjusting your filters to find more resources.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
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

export default React.memo(ResourcesPage);
