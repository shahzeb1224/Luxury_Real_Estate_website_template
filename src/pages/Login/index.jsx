import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/utils/cn';
import { getPropertyImage } from '@/assets/images/properties';
import { isValidEmail, isRequired } from '@/lib/validators';
import { Button, Input, Checkbox } from '@/components/ui';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Apple } from 'lucide-react';
import { FaChrome } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        if (!isRequired(value)) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!isRequired(value)) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const fields = ['email', 'password'];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

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

      // Mark all fields as touched
      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        if (key !== 'rememberMe') {
          allTouched[key] = true;
        }
      });
      setTouched(allTouched);

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success - redirect to dashboard or home
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        setErrors((prev) => ({
          ...prev,
          submit: error.message || 'Invalid email or password. Please try again.',
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, navigate]
  );

  const isFormValid = useCallback(() => {
    return (
      isRequired(formData.email) &&
      isValidEmail(formData.email) &&
      isRequired(formData.password) &&
      formData.password.length >= 6
    );
  }, [formData]);

  const isDisabled = isLoading || !isFormValid();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
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
        <title>Login | Elite Real Estate</title>
        <meta
          name="description"
          content="Login to your Elite Real Estate account to manage your property journey."
        />
      </Helmet>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getPropertyImage(0)})` }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-800/80 to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
              <span className="text-white font-playfair font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-playfair font-bold text-white">
              Elite<span className="text-gold-400">.</span>
            </span>
          </div>

          {/* Tagline */}
          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl lg:text-4xl font-playfair font-bold text-white leading-tight"
            >
              Welcome Back to
              <br />
              <span className="text-gold-400">Luxury Living</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-navy-300 mt-4 text-base lg:text-lg"
            >
              Access your account to manage properties, track favorites, and continue your journey
              to extraordinary living.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-6 mt-8 text-navy-400 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Premium Properties
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Expert Guidance
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Secure Transactions
              </span>
            </motion.div>
          </div>

          {/* Footer */}
          <p className="text-navy-500 text-xs">
            &copy; {new Date().getFullYear()} Elite Real Estate. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-playfair font-bold text-navy-800">
                Elite<span className="text-gold-500">.</span>
              </span>
            </div>
            <p className="text-navy-500 text-sm mt-2">Sign in to your account</p>
          </div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
              Welcome Back
            </h2>
            <p className="text-navy-500 mt-1">Sign in to continue your property journey</p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="space-y-3">
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
          <motion.div variants={itemVariants} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs text-navy-400">or</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email address"
              error={touched.email && !!errors.email}
              errorText={errors.email}
              disabled={isLoading}
              required
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4 text-navy-400" />}
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
                placeholder="Enter your password"
                error={touched.password && !!errors.password}
                errorText={errors.password}
                disabled={isLoading}
                required
                autoComplete="current-password"
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

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
              loading={isLoading}
              disabled={isDisabled}
              fullWidth
              className="mt-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </motion.form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-navy-500">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-gold-600 hover:text-gold-700 transition-colors"
              >
                Create account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
