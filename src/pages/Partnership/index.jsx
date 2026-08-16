import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, cardVariants } from '@/animations/framer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Card, Badge, Input, Select, Textarea } from '@/components/ui';
import { FAQ } from '@/components/sections';
import { CTA } from '@/components/sections';
import {
  Handshake,
  TrendingUp,
  Users,
  Building2,
  Award,
  Sparkles,
  Shield,
  Home,
  Briefcase,
  Globe,
  Star,
  ChevronRight,
  CheckCircle,
  Send,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import PARTNERSHIP_DATA from '@/data/partnershipData';

const PartnershipPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const partnershipTypes = [
    { value: '', label: 'Select Partnership Type' },
    { value: 'agent', label: 'Agent Partnership' },
    { value: 'brokerage', label: 'Brokerage Partnership' },
    { value: 'developer', label: 'Developer Partnership' },
    { value: 'investment', label: 'Investment Firm' },
    { value: 'international', label: 'International Partner' },
    { value: 'other', label: 'Other' },
  ];

  const { benefits, whoCanPartner, partnershipModels, process, stats, faqs } = PARTNERSHIP_DATA;

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        if (!value || value.trim() === '') return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'company':
        if (!value || value.trim() === '') return 'Company name is required';
        return '';
      case 'email':
        if (!value || value.trim() === '') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return '';
      case 'phone':
        if (!value || value.trim() === '') return 'Phone number is required';
        if (!/^[\\+\d\s\-\\(\\)]{10,15}$/.test(value)) return 'Invalid phone number';
        return '';
      case 'partnershipType':
        if (!value) return 'Please select a partnership type';
        return '';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const fields = ['name', 'company', 'email', 'phone', 'partnershipType'];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          partnershipType: '',
          message: '',
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        console.error('Partnership submission error:', error);
        setErrors((prev) => ({
          ...prev,
          submit: 'Failed to submit partnership inquiry. Please try again.',
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const isFormValid = useCallback(() => {
    return (
      formData.name?.trim() &&
      formData.name?.trim().length >= 2 &&
      formData.company?.trim() &&
      formData.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phone &&
      /^[\\+\d\s\-\\(\\)]{10,15}$/.test(formData.phone) &&
      formData.partnershipType
    );
  }, [formData]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Partnership', href: '/partnership' },
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
        <title>Partnership Opportunities | Elite Real Estate</title>
        <meta
          name="description"
          content="Join the Elite Real Estate network. Explore partnership opportunities for agents, brokerages, developers, and investors."
        />
        <link rel="canonical" href="https://eliterealestate.com/partnership" />
        <meta property="og:title" content="Partnership Opportunities | Elite Real Estate" />
        <meta property="og:description" content="Join the Elite Real Estate network." />
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
              <Handshake className="w-4 h-4 mr-2" />
              Partnership Opportunities
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Grow With Our Real Estate Network
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Join the Elite Real Estate network and unlock new opportunities for growth,
              collaboration, and success.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link to="/partnership">
                <Button variant="luxury" size="lg" className="min-w-[180px]">
                  Become a Partner
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="#benefits">
                <Button variant="glass" size="lg" className="min-w-[160px]">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <Section id="benefits" padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Partnership Benefits"
            subtitle="What we offer our partners"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {benefits.map((benefit, index) => {
              const Icon = (() => {
                const icons = { TrendingUp, Users, Building2, Award, Sparkles, Shield };
                return icons[benefit.icon] || TrendingUp;
              })();
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
                      <div>
                        <h4 className="font-semibold text-navy-800">{benefit.title}</h4>
                        <p className="text-sm text-navy-500 mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Who Can Partner */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Who Can Become a Partner"
            subtitle="Join our growing network"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {whoCanPartner.map((partner, index) => {
              const Icon = (() => {
                const icons = { Users, Building2, Home, Briefcase, Globe };
                return icons[partner.icon] || Users;
              })();
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card padding="lg" hoverable className="h-full border-navy-100">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-navy-50 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-800">{partner.title}</h4>
                        <p className="text-sm text-navy-500 mt-1">{partner.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Partnership Models */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Partnership Models"
            subtitle="Choose the right partnership for you"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {partnershipModels.map((model, index) => {
              const Icon = (() => {
                const icons = { Users, Building2, Home };
                return icons[model.icon] || Users;
              })();
              return (
                <motion.div
                  key={index}
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
                      <h4 className="font-semibold text-navy-800">{model.title}</h4>
                      <p className="text-sm text-navy-500 mt-1">{model.description}</p>
                      <div className="mt-3 pt-3 border-t border-navy-100 w-full">
                        <ul className="space-y-1.5 text-left">
                          {model.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                              <CheckCircle className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        {model.cta}
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Partnership Process"
            subtitle="How we work together"
            align="center"
            size="md"
          />
          <div className="relative mt-8">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold-200 -translate-x-1/2" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {process.map((step, index) => (
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

      {/* Statistics */}
      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = (() => {
                const icons = { Users, Globe, Home, Star };
                return icons[stat.icon] || Users;
              })();
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-navy-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ - Reuse existing component */}
      <FAQ />

      {/* Partnership Inquiry Form */}
      <Section id="inquiry" padding="lg" background="gray">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Start Your Partnership Journey"
              subtitle="Let's explore how we can grow together"
              align="center"
              size="md"
            />

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-6 bg-success-50 border border-success-200 rounded-2xl text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-navy-800">
                    Partnership Inquiry Submitted!
                  </h3>
                  <p className="text-navy-600 mt-2">
                    Thank you for your interest in partnering with Elite Real Estate. Our team will
                    contact you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Card padding="lg" className="border-gold-100/30 shadow-premium">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    error={touched.name && !!errors.name}
                    errorText={errors.name}
                    disabled={isSubmitting}
                    required
                  />
                  <Input
                    label="Company Name"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your company name"
                    error={touched.company && !!errors.company}
                    errorText={errors.company}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@company.com"
                    error={touched.email && !!errors.email}
                    errorText={errors.email}
                    disabled={isSubmitting}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+1 (555) 000-0000"
                    error={touched.phone && !!errors.phone}
                    errorText={errors.phone}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <Select
                  label="Partnership Type"
                  name="partnershipType"
                  value={formData.partnershipType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={partnershipTypes}
                  error={touched.partnershipType && !!errors.partnershipType}
                  errorText={errors.partnershipType}
                  disabled={isSubmitting}
                  required
                />

                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your partnership vision..."
                  rows={4}
                  disabled={isSubmitting}
                  maxLength={1000}
                  showCharCount
                />

                {errors.submit && (
                  <div
                    className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600 text-sm"
                    role="alert"
                  >
                    {errors.submit}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="luxury"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting || !isFormValid()}
                  fullWidth
                  className="mt-4"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Partnership Inquiry
                </Button>

                <p className="text-xs text-navy-400 text-center mt-3">
                  By submitting this form, you agree to our Privacy Policy. Your information is
                  secure and confidential.
                </p>
              </form>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(PartnershipPage);
