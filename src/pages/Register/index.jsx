import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/utils/cn';
import { getPropertyImage } from '@/assets/images/properties';
import { isValidEmail, isValidPhone, isRequired } from '@/lib/validators';
import { Button, Input, Checkbox, Select } from '@/components/ui';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Apple,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { FaChrome } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    accountType: 'buyer',
    acceptTerms: false,
    newsletter: true,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const levels = [
      { score: 0, label: 'Weak', color: 'text-danger-500' },
      { score: 1, label: 'Weak', color: 'text-danger-500' },
      { score: 2, label: 'Fair', color: 'text-warning-500' },
      { score: 3, label: 'Good', color: 'text-info-500' },
      { score: 4, label: 'Strong', color: 'text-success-500' },
      { score: 5, label: 'Very Strong', color: 'text-success-600' },
    ];

    return levels[score] || levels[0];
  }, [formData.password]);

  const accountTypes = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'seller', label: 'Seller' },
    { value: 'agent', label: 'Agent' },
    { value: 'investor', label: 'Investor' },
  ];

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'au', label: 'Australia' },
    { value: 'sg', label: 'Singapore' },
  ];

  const validateField = useCallback(
    (name, value) => {
      switch (name) {
        case 'firstName':
          if (!isRequired(value)) return 'First name is required';
          if (value.length < 2) return 'First name must be at least 2 characters';
          if (value.length > 50) return 'First name must be less than 50 characters';
          return '';
        case 'lastName':
          if (!isRequired(value)) return 'Last name is required';
          if (value.length < 2) return 'Last name must be at least 2 characters';
          if (value.length > 50) return 'Last name must be less than 50 characters';
          return '';
        case 'email':
          if (!isRequired(value)) return 'Email is required';
          if (!isValidEmail(value)) return 'Please enter a valid email address';
          return '';
        case 'phone':
          if (!isRequired(value)) return 'Phone number is required';
          if (!isValidPhone(value)) return 'Please enter a valid phone number';
          return '';
        case 'password':
          if (!isRequired(value)) return 'Password is required';
          if (value.length < 8) return 'Password must be at least 8 characters';
          return '';
        case 'confirmPassword':
          if (!isRequired(value)) return 'Please confirm your password';
          if (value !== formData.password) return 'Passwords do not match';
          return '';
        case 'country':
          if (!isRequired(value)) return 'Country is required';
          return '';
        case 'accountType':
          if (!isRequired(value)) return 'Account type is required';
          return '';
        default:
          return '';
      }
    },
    [formData.password]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    const fields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'password',
      'confirmPassword',
      'country',
      'accountType',
    ];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));

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

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSuccess(true);

        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } catch (error) {
        console.error('Registration error:', error);
        setErrors((prev) => ({
          ...prev,
          submit: error.message || 'Registration failed. Please try again.',
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate]
  );

  const isFormValid = useCallback(() => {
    return (
      isRequired(formData.firstName) &&
      formData.firstName.length >= 2 &&
      isRequired(formData.lastName) &&
      formData.lastName.length >= 2 &&
      isRequired(formData.email) &&
      isValidEmail(formData.email) &&
      isRequired(formData.phone) &&
      isValidPhone(formData.phone) &&
      isRequired(formData.password) &&
      formData.password.length >= 8 &&
      isRequired(formData.confirmPassword) &&
      formData.confirmPassword === formData.password &&
      isRequired(formData.country) &&
      isRequired(formData.accountType) &&
      formData.acceptTerms
    );
  }, [formData]);

  const isDisabled = isLoading || isSuccess || !isFormValid();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Helmet>
        <title>Create Account | Elite Real Estate</title>
        <meta
          name="description"
          content="Create your Elite Real Estate account to start your property journey."
        />
      </Helmet>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getPropertyImage(1)})` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-800/80 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
              <span className="text-white font-playfair font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-playfair font-bold text-white">
              Elite<span className="text-gold-400">.</span>
            </span>
          </div>

          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl lg:text-4xl font-playfair font-bold text-white leading-tight"
            >
              Start Your
              <br />
              <span className="text-gold-400">Luxury Journey</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-navy-300 mt-4 text-base lg:text-lg"
            >
              Create your account and gain access to the world&apos;s finest luxury properties and
              exclusive investment opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-6 mt-8 text-navy-400 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Free Account
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Premium Access
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Expert Support
              </span>
            </motion.div>
          </div>

          <p className="text-navy-500 text-xs">
            &copy; {new Date().getFullYear()} Elite Real Estate. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto min-h-screen lg:min-h-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto py-6"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-playfair font-bold text-navy-800">
                Elite<span className="text-gold-500">.</span>
              </span>
            </div>
            <p className="text-navy-500 text-sm mt-2">Create your account</p>
          </div>

          {/* Success State */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6 p-6 bg-success-50 border border-success-200 rounded-2xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <h3 className="text-lg font-playfair font-semibold text-navy-800">
                  Account Created!
                </h3>
                <p className="text-sm text-navy-600 mt-1">
                  Welcome to Elite Real Estate. Redirecting you to login...
                </p>
                <div className="w-full h-1 bg-success-200 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'linear' }}
                    className="h-full bg-success-500 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
              Create Account
            </h2>
            <p className="text-navy-500 mt-1">Join Elite Real Estate and discover luxury living</p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="space-y-2.5">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
              aria-label="Continue with Google"
            >
              <FaChrome className="w-5 h-5" />
              <span className="text-sm font-medium text-navy-700">Continue with Google</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
              aria-label="Continue with Apple"
            >
              <Apple className="w-5 h-5" />
              <span className="text-sm font-medium text-navy-700">Continue with Apple</span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs text-navy-400">or</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                error={touched.firstName && !!errors.firstName}
                errorText={errors.firstName}
                disabled={isLoading || isSuccess}
                required
                autoComplete="given-name"
                leftIcon={<User className="w-4 h-4 text-navy-400" />}
              />
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Doe"
                error={touched.lastName && !!errors.lastName}
                errorText={errors.lastName}
                disabled={isLoading || isSuccess}
                required
                autoComplete="family-name"
                leftIcon={<User className="w-4 h-4 text-navy-400" />}
              />
            </div>

            {/* Email */}
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
              disabled={isLoading || isSuccess}
              required
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4 text-navy-400" />}
            />

            {/* Phone */}
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
              disabled={isLoading || isSuccess}
              required
              autoComplete="tel"
              leftIcon={<Phone className="w-4 h-4 text-navy-400" />}
            />

            {/* Country */}
            <Select
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              options={countries}
              placeholder="Select your country"
              error={touched.country && !!errors.country}
              errorText={errors.country}
              disabled={isLoading || isSuccess}
              required
              leftIcon={<MapPin className="w-4 h-4 text-navy-400" />}
            />

            {/* Account Type */}
            <Select
              label="Account Type"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              onBlur={handleBlur}
              options={accountTypes}
              error={touched.accountType && !!errors.accountType}
              errorText={errors.accountType}
              disabled={isLoading || isSuccess}
              required
            />

            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Create a strong password"
                error={touched.password && !!errors.password}
                errorText={errors.password}
                disabled={isLoading || isSuccess}
                required
                autoComplete="new-password"
                leftIcon={<Lock className="w-4 h-4 text-navy-400" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-navy-400 hover:text-navy-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all duration-300 rounded-full',
                          passwordStrength.color.replace('text-', 'bg-')
                        )}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={cn('text-xs font-medium', passwordStrength.color)}>
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm your password"
              error={touched.confirmPassword && !!errors.confirmPassword}
              errorText={errors.confirmPassword}
              disabled={isLoading || isSuccess}
              required
              autoComplete="new-password"
              leftIcon={<Lock className="w-4 h-4 text-navy-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-navy-400 hover:text-navy-600 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
            />

            {/* Terms & Newsletter */}
            <div className="space-y-2">
              <Checkbox
                label={
                  <span>
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                }
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                error={!!errors.acceptTerms}
                errorText={errors.acceptTerms}
                disabled={isLoading || isSuccess}
                required
              />
              <Checkbox
                label="Subscribe to exclusive property updates and market insights"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                disabled={isLoading || isSuccess}
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div
                className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600 text-sm flex items-start gap-2"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="luxury"
              size="lg"
              loading={isLoading}
              disabled={isDisabled}
              fullWidth
              className="mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && !isSuccess && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </motion.form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-navy-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-gold-600 hover:text-gold-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(RegisterPage);
