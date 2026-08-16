import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button, Card, Badge } from '@/components/ui';
import { CTA } from '@/components/sections';
import {
  FileText,
  Download,
  Calendar,
  User,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  MapPin,
  Home,
  Building2,
  Briefcase,
} from 'lucide-react';
import RESOURCES_DATA from '@/data/resourcesData';

const ResourceDetailPage = () => {
  const { resourceSlug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const resource = useMemo(() => {
    return RESOURCES_DATA.resources.find((r) => r.slug === resourceSlug);
  }, [resourceSlug]);

  const relatedResources = useMemo(() => {
    if (!resource) return [];
    return RESOURCES_DATA.resources.filter(
      (r) => resource.relatedResources.includes(r.id) && r.id !== resource.id
    );
  }, [resource]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [resourceSlug]);

  const handleDownload = () => {
    alert(`Downloading "${resource?.title}" - ${resource?.fileSize}`);
  };

  if (loading) {
    return <Loading fullscreen />;
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold text-navy-800">Resource Not Found</h1>
          <p className="text-navy-500 mt-4">The resource you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/resources">
            <Button variant="luxury" size="md" className="mt-6">
              Back to Resources
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: resource.title, href: '#' },
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
        <title>{resource.title} | Elite Real Estate</title>
        <meta name="description" content={`${resource.title} - ${resource.description}`} />
        <link rel="canonical" href={`https://eliterealestate.com/resources/${resource.slug}`} />
        <meta property="og:title" content={`${resource.title} | Elite Real Estate`} />
        <meta property="og:description" content={resource.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <Badge variant="luxury" size="lg" className="mb-4">
              <FileText className="w-4 h-4 mr-2" />
              {resource.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white leading-[1.08]">
              {resource.title}
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              {resource.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Button variant="luxury" size="lg" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download ({resource.fileSize})
              </Button>
              <Link to="/consultation">
                <Button variant="glass" size="lg">
                  Speak With Advisor
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-premium">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Description */}
            <Card padding="lg" className="border-gold-100/30">
              <h2 className="text-2xl font-playfair font-semibold text-navy-800 mb-4">
                About This Resource
              </h2>
              <div className="prose prose-sm max-w-none text-navy-600 leading-relaxed space-y-3">
                {resource.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card padding="lg" className="border-navy-100">
              <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">
                What You&apos;ll Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resource.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-navy-600">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resource Info */}
            <Card padding="lg" className="border-gold-100/30 sticky top-24">
              <h3 className="text-lg font-playfair font-semibold text-navy-800 mb-4">
                Resource Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">Type</span>
                  <span className="font-medium text-navy-700">{resource.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">Category</span>
                  <span className="font-medium text-navy-700">{resource.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">File Type</span>
                  <span className="font-medium text-navy-700">{resource.fileType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">File Size</span>
                  <span className="font-medium text-navy-700">{resource.fileSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">Date</span>
                  <span className="font-medium text-navy-700">
                    {new Date(resource.date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">Author</span>
                  <span className="font-medium text-navy-700">{resource.author}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-navy-100">
                <Button variant="luxury" size="md" onClick={handleDownload} fullWidth>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resource
                </Button>
              </div>
            </Card>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <Card padding="lg" className="border-gold-100/30">
                <h4 className="text-sm font-medium text-navy-600 mb-3">Related Resources</h4>
                <div className="space-y-3">
                  {relatedResources.map((related) => (
                    <Link
                      key={related.id}
                      to={`/resources/${related.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-800 group-hover:text-gold-600 transition-colors truncate">
                            {related.title}
                          </p>
                          <p className="text-xs text-navy-500">{related.category}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-navy-400 group-hover:text-gold-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(ResourceDetailPage);
