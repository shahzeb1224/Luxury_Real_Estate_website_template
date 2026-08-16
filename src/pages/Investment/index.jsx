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
import {
  TrendingUp,
  DollarSign,
  Building2,
  Home,
  Crown,
  Factory,
  PieChart,
  FileText,
  Download,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Users,
} from 'lucide-react';
import { SEARCH_PROPERTIES } from '@/data/searchData';
import INVESTMENT_DATA from '@/data/investmentData';

const InvestmentPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const {
    marketOverview,
    opportunities,
    investmentCategories,
    marketTrends,
    strategyCards,
    riskReturn,
    reports,
  } = INVESTMENT_DATA;

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    if (selectedCategory === 'all') return opportunities;
    return opportunities.filter((opp) => opp.type.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory, opportunities]);

  // Get featured opportunities
  const featuredOpportunities = opportunities.filter((opp) => opp.featured);

  // Get properties for investment section
  const investmentProperties = useMemo(() => {
    return SEARCH_PROPERTIES.filter((p) => p.price > 2000000).slice(0, 3);
  }, []);

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Investment Insights', href: '/investment' },
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
        <title>Investment Insights | Elite Real Estate</title>
        <meta
          name="description"
          content="Discover premium investment opportunities in luxury real estate. Get expert insights, ROI analysis, and market trends."
        />
        <link rel="canonical" href="https://eliterealestate.com/investment" />
        <meta property="og:title" content="Investment Insights | Elite Real Estate" />
        <meta
          property="og:description"
          content="Premium investment opportunities in luxury real estate."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'InvestmentOrDeposit',
            name: 'Real Estate Investment Insights',
            description: 'Premium investment opportunities in luxury real estate',
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-300/5 rounded-full blur-2xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="luxury" size="lg" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Investment Insights
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Premium Investment Opportunities
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Discover exclusive investment opportunities in luxury real estate. Expert insights,
              market trends, and strategic guidance for high-net-worth investors.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="#opportunities">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Explore Opportunities
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/consultation">
                <Button variant="glass" size="lg" className="min-w-[180px]">
                  Speak With Advisor
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Expert Analysis
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Premium Opportunities
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Data-Driven Insights
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Market Overview */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title={marketOverview.title}
            subtitle={marketOverview.subtitle}
            align="center"
            size="md"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {marketOverview.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card padding="lg" className="text-center h-full border-gold-100/30">
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-navy-500 mt-1">{stat.label}</div>
                  <div
                    className={cn(
                      'text-xs font-medium mt-1 flex items-center justify-center gap-1',
                      stat.trend === 'up' ? 'text-success-500' : 'text-danger-500'
                    )}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Investment Categories */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Investment Categories"
            subtitle="Diversify your portfolio"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {investmentCategories.map((category, index) => {
              const Icon = (() => {
                const icons = { Home, Building2, Crown, Factory };
                return icons[category.icon] || Home;
              })();
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card padding="lg" hoverable className="h-full border-gold-100/30">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-gold-50 rounded-full mb-3">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <h4 className="font-semibold text-navy-800">{category.title}</h4>
                      <p className="text-sm text-navy-500 mt-1">{category.description}</p>
                      <div className="mt-3 pt-3 border-t border-navy-100 w-full">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-navy-500">Expected ROI</span>
                          <span className="font-semibold text-gold-500">{category.roi}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-navy-500">Risk Level</span>
                          <span className="font-medium text-navy-700">{category.risk}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Featured Opportunities */}
      <Section id="opportunities" padding="lg" background="gray">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <SectionHeader
              title="Featured Opportunities"
              subtitle="Curated investment options"
              align="left"
              size="md"
              className="flex-1"
            />
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'residential', 'commercial', 'luxury', 'industrial'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                    selectedCategory === category
                      ? 'bg-navy-800 text-white'
                      : 'bg-white text-navy-600 hover:bg-navy-50'
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  padding="none"
                  hoverable
                  className={cn(
                    'overflow-hidden h-full transition-all duration-500',
                    opportunity.featured && 'border-2 border-gold-300'
                  )}
                >
                  <div className="relative aspect-[4/3] bg-navy-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent z-10" />
                    {opportunity.featured && (
                      <Badge variant="luxury" size="sm" className="absolute top-3 left-3 z-20">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                      <h4 className="font-playfair font-semibold">{opportunity.title}</h4>
                      <p className="text-sm text-white/80">{opportunity.location}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="default" size="sm" className="bg-navy-50 text-navy-600">
                        {opportunity.type}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {opportunity.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-navy-500">{opportunity.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-100">
                      <div>
                        <p className="text-xs text-navy-400">Expected ROI</p>
                        <p className="text-sm font-semibold text-gold-500">
                          {opportunity.expectedROI}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-navy-400">Min Investment</p>
                        <p className="text-sm font-semibold text-navy-700">
                          {opportunity.minInvestment}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" fullWidth className="mt-2">
                      View Details
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Market Trends */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Market Trends"
            subtitle="Current market insights"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {marketTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card
                  padding="lg"
                  hoverable
                  className={cn(
                    'h-full text-center border',
                    trend.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                  )}
                >
                  <div
                    className={cn(
                      'text-2xl font-playfair font-bold',
                      trend.color === 'gold' ? 'text-gold-500' : 'text-navy-800'
                    )}
                  >
                    {trend.growth}
                  </div>
                  <h4 className="font-semibold text-navy-800 mt-2">{trend.label}</h4>
                  <p className="text-sm text-navy-500 mt-1">{trend.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Investment Properties */}
      {investmentProperties.length > 0 && (
        <Section padding="lg" background="gray">
          <Container>
            <SectionHeader
              title="Featured Investment Properties"
              subtitle="Premium properties for investors"
              align="center"
              size="md"
            />
            <motion.div
              variants={cardVariants.grid.container}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8"
            >
              {investmentProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                >
                  <PropertyCard
                    property={property}
                    variant="grid"
                    size="md"
                    isFavorite={favorites.includes(property.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                    showActions={true}
                    featured={property.featured}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Investment Strategies */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Investment Strategies"
            subtitle="Maximize your returns"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {strategyCards.map((strategy, index) => {
              const Icon = (() => {
                const icons = { TrendingUp, DollarSign, Tool, PieChart };
                return icons[strategy.icon] || TrendingUp;
              })();
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card
                    padding="lg"
                    hoverable
                    className={cn(
                      'text-center h-full border',
                      strategy.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                    )}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gold-50 rounded-full">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-navy-800">{strategy.title}</h4>
                    <p className="text-sm text-navy-500 mt-1">{strategy.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Risk/Return Explanation */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Risk & Return Profile"
            subtitle="Understanding investment categories"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {Object.entries(riskReturn).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  padding="lg"
                  hoverable
                  className={cn(
                    'h-full text-center border',
                    key === 'low' && 'border-success-200',
                    key === 'medium' && 'border-warning-200',
                    key === 'high' && 'border-danger-200'
                  )}
                >
                  <div
                    className={cn(
                      'text-lg font-semibold',
                      key === 'low' && 'text-success-600',
                      key === 'medium' && 'text-warning-600',
                      key === 'high' && 'text-danger-600'
                    )}
                  >
                    {value.label}
                  </div>
                  <p className="text-sm text-navy-500 mt-2">{value.description}</p>
                  <div className="mt-3 pt-3 border-t border-navy-100">
                    <p className="text-xs text-navy-400">Expected ROI</p>
                    <p className="text-lg font-playfair font-bold text-navy-800">
                      {value.roiRange}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-navy-400">Examples</p>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {value.examples.map((example, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-navy-50 text-navy-600 text-xs rounded-full"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reports */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Investment Reports"
            subtitle="Downloadable insights"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {reports.map((report, index) => {
              const Icon = FileText;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card padding="lg" hoverable className="h-full border-gold-100/30">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gold-50 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-navy-800">{report.title}</h4>
                        <p className="text-sm text-navy-500">{report.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-navy-400">
                          <span>{report.type}</span>
                          <span className="w-1 h-1 rounded-full bg-navy-300" />
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <Download className="w-4 h-4 text-gold-500" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Speak With Advisor CTA */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="luxury" size="lg" className="mx-auto mb-4">
                <Users className="w-4 h-4 mr-2" />
                Expert Advisory
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                Speak With an Investment Advisor
              </h2>
              <p className="text-navy-300 mt-4 max-w-2xl mx-auto">
                Our experienced investment advisors are ready to help you build and optimize your
                real estate portfolio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link to="/consultation">
                  <Button variant="luxury" size="lg" className="min-w-[200px]">
                    Schedule Consultation
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg" className="min-w-[160px]">
                    Contact Advisor
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Confidential Consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  No Obligation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  Expert Guidance
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(InvestmentPage);
