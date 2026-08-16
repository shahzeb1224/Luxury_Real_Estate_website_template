import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Card, Badge, Input, Select, Textarea } from '@/components/ui';
import { CTA } from '@/components/sections';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  User,
  MessageSquare,
  Home,
  Building2,
  Briefcase,
  Users,
  CheckCircle,
  Shield,
  Award,
  Star,
  ChevronRight,
  Send,
  Sparkles,
} from 'lucide-react';

const ConsultationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'buying',
    preferredDate: '',
    preferredTime: '',
    propertyInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const consultationTypes = [
    { value: 'buying', label: 'Property Buying' },
    { value: 'selling', label: 'Property Selling' },
    { value: 'investing', label: 'Investment Advisory' },
    { value: 'luxury', label: 'Luxury Property Consulting' },
    { value: 'commercial', label: 'Commercial Real Estate' },
    { value: 'relocation', label: 'Relocation Services' },
  ];

  const timeSlots = [
    { value: '09:00', label: '09:00 AM' },
    { value: '09:30', label: '09:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '01:00 PM' },
    { value: '13:30', label: '01:30 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '14:30', label: '02:30 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '15:30', label: '03:30 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '16:30', label: '04:30 PM' },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Work with seasoned luxury real estate professionals.',
    },
    {
      icon: Shield,
      title: 'Confidential Service',
      description: 'Your privacy and security are our top priority.',
    },
    {
      icon: Award,
      title: 'Market Expertise',
      description: 'Data-driven insights for informed decisions.',
    },
    {
      icon: Star,
      title: 'White-Glove Experience',
      description: 'Personalized service from consultation to closing.',
    },
  ];

  const trustIndicators = [
    { label: '10+ Years Experience', icon: Award },
    { label: '980+ Happy Clients', icon: Users },
    { label: '4.9/5 Client Rating', icon: Star },
    { label: '15+ Cities Covered', icon: MapPin },
  ];

  const today = new Date().toISOString().split('T')[0];
  const minDate = today;

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        if (!value || value.trim() === '') return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value || value.trim() === '') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return '';
      case 'phone':
        if (!value || value.trim() === '') return 'Phone number is required';
        if (!/^[\\+\d\s\-\\(\\)]{10,15}$/.test(value)) return 'Invalid phone number';
        return '';
      case 'consultationType':
        if (!value) return 'Please select a consultation type';
        return '';
      case 'preferredDate':
        if (!value) return 'Please select a date';
        return '';
      case 'preferredTime':
        if (!value) return 'Please select a time';
        return '';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const fields = ['name', 'email', 'phone', 'consultationType', 'preferredDate', 'preferredTime'];

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
          email: '',
          phone: '',
          consultationType: 'buying',
          preferredDate: '',
          preferredTime: '',
          propertyInterest: '',
          message: '',
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        console.error('Consultation submission error:', error);
        setErrors((prev) => ({
          ...prev,
          submit: 'Failed to book consultation. Please try again.',
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
      formData.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phone &&
      /^[\\+\d\s\-\\(\\)]{10,15}$/.test(formData.phone) &&
      formData.consultationType &&
      formData.preferredDate &&
      formData.preferredTime
    );
  }, [formData]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Consultation', href: '/consultation' },
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
        <title>Book Consultation | Elite Real Estate</title>
        <meta
          name="description"
          content="Book a private consultation with our luxury real estate experts. Get personalized guidance for buying, selling, or investing in premium properties."
        />
        <link rel="canonical" href="https://eliterealestate.com/consultation" />
        <meta property="og:title" content="Book Consultation | Elite Real Estate" />
        <meta
          property="og:description"
          content="Book a private consultation with our luxury real estate experts."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Private Consultation',
            description: 'Luxury real estate consultation services',
            provider: {
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

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="luxury" size="lg" className="mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Private Consultation
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Book a Private Consultation
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Connect with our luxury real estate experts for personalized guidance on your property
              journey.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Expert Guidance
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Confidential Service
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                No Obligation
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <Card padding="lg" className="border-gold-100/30 shadow-premium">
                <h2 className="text-2xl font-playfair font-semibold text-navy-800 mb-6">
                  Schedule Your Consultation
                </h2>

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
                        Consultation Booked!
                      </h3>
                      <p className="text-navy-600 mt-2">
                        Thank you for booking a consultation. Our team will contact you within 24
                        hours to confirm your appointment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
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
                    leftIcon={<User className="w-4 h-4 text-navy-400" />}
                  />

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      error={touched.email && !!errors.email}
                      errorText={errors.email}
                      disabled={isSubmitting}
                      required
                      leftIcon={<Mail className="w-4 h-4 text-navy-400" />}
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
                      leftIcon={<Phone className="w-4 h-4 text-navy-400" />}
                    />
                  </div>

                  {/* Consultation Type */}
                  <Select
                    label="Consultation Type"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={consultationTypes}
                    error={touched.consultationType && !!errors.consultationType}
                    errorText={errors.consultationType}
                    disabled={isSubmitting}
                    required
                  />

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Preferred Date"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={minDate}
                      error={touched.preferredDate && !!errors.preferredDate}
                      errorText={errors.preferredDate}
                      disabled={isSubmitting}
                      required
                      leftIcon={<Calendar className="w-4 h-4 text-navy-400" />}
                    />
                    <Select
                      label="Preferred Time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={timeSlots}
                      error={touched.preferredTime && !!errors.preferredTime}
                      errorText={errors.preferredTime}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Property Interest */}
                  <Input
                    label="Property Interest (Optional)"
                    name="propertyInterest"
                    type="text"
                    value={formData.propertyInterest}
                    onChange={handleChange}
                    placeholder="e.g., Villa in Beverly Hills"
                    disabled={isSubmitting}
                    leftIcon={<Home className="w-4 h-4 text-navy-400" />}
                  />

                  {/* Message */}
                  <Textarea
                    label="Message (Optional)"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements or any specific questions..."
                    rows={4}
                    disabled={isSubmitting}
                    maxLength={1000}
                    showCharCount
                  />

                  {/* Submit Error */}
                  {errors.submit && (
                    <div
                      className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600 text-sm"
                      role="alert"
                    >
                      {errors.submit}
                    </div>
                  )}

                  {/* Submit Button */}
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
                    Book Consultation
                  </Button>

                  <p className="text-xs text-navy-400 text-center mt-3">
                    By submitting this form, you agree to our Privacy Policy. Your information is
                    secure and confidential.
                  </p>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Benefits */}
              <Card padding="lg" className="border-gold-100/30">
                <h3 className="font-semibold text-navy-800 mb-4">Why Book a Consultation?</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-1.5 bg-gold-50 rounded-lg flex-shrink-0">
                          <Icon className="w-4 h-4 text-gold-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-navy-800">{benefit.title}</h4>
                          <p className="text-xs text-navy-500">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Contact Info */}
              <Card padding="lg" className="border-gold-100/30">
                <h3 className="font-semibold text-navy-800 mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold-500" />
                    <a
                      href="tel:+18885550123"
                      className="text-navy-600 hover:text-navy-800 transition-colors"
                    >
                      (888) 555-0123
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold-500" />
                    <a
                      href="mailto:consult@eliterealestate.com"
                      className="text-navy-600 hover:text-navy-800 transition-colors"
                    >
                      consult@eliterealestate.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold-500" />
                    <span className="text-navy-600">Mon-Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </Card>

              {/* Trust Indicators */}
              <Card
                padding="lg"
                className="border-gold-100/30 bg-gradient-to-br from-gold-50 to-gold-100/50"
              >
                <h3 className="font-semibold text-navy-800 mb-4">Trusted by Clients Worldwide</h3>
                <div className="grid grid-cols-2 gap-3">
                  {trustIndicators.map((indicator, index) => {
                    const Icon = indicator.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="flex justify-center mb-1">
                          <Icon className="w-4 h-4 text-gold-500" />
                        </div>
                        <p className="text-xs font-medium text-navy-700">{indicator.label}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTA />
    </motion.div>
  );
};

export default React.memo(ConsultationPage);
