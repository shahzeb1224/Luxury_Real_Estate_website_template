import React, { useState, useCallback, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { isValidEmail, isValidPhone, isRequired } from '@/lib/validators';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const ContactForm = forwardRef(
  (
    {
      className = '',
      onSubmit,
      onSuccess,
      onError,
      loading = false,
      success = false,
      initialValues = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      },
      submitLabel = 'Send Message',
      successMessage = 'Thank you for your message! We will get back to you within 24 hours.',
      ...props
    },
    ref
  ) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(success);

    const validateField = useCallback((name, value) => {
      switch (name) {
        case 'name':
          if (!isRequired(value)) return 'Name is required';
          if (value.length < 2) return 'Name must be at least 2 characters';
          if (value.length > 60) return 'Name must be less than 60 characters';
          return '';
        case 'email':
          if (!isRequired(value)) return 'Email is required';
          if (!isValidEmail(value)) return 'Please enter a valid email address';
          return '';
        case 'phone':
          if (value && !isValidPhone(value)) return 'Please enter a valid phone number';
          return '';
        case 'subject':
          if (!isRequired(value)) return 'Subject is required';
          if (value.length < 3) return 'Subject must be at least 3 characters';
          if (value.length > 100) return 'Subject must be less than 100 characters';
          return '';
        case 'message':
          if (!isRequired(value)) return 'Message is required';
          if (value.length < 10) return 'Message must be at least 10 characters';
          if (value.length > 2000) return 'Message must be less than 2000 characters';
          return '';
        default:
          return '';
      }
    }, []);

    const validateForm = useCallback(() => {
      const newErrors = {};
      const fields = ['name', 'email', 'phone', 'subject', 'message'];

      fields.forEach((field) => {
        const error = validateField(field, values[field]);
        if (error) {
          newErrors[field] = error;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [values, validateField]);

    const handleChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        // Clear error on change
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
        Object.keys(values).forEach((key) => {
          allTouched[key] = true;
        });
        setTouched(allTouched);

        if (!validateForm()) {
          return;
        }

        setIsSubmitting(true);

        try {
          if (onSubmit) {
            await onSubmit(values);
          }

          setSubmitSuccess(true);
          setValues(initialValues);

          if (onSuccess) {
            onSuccess(values);
          }

          // Reset success state after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } catch (error) {
          console.error('Contact form submission error:', error);

          if (onError) {
            onError(error);
          }

          setErrors((prev) => ({
            ...prev,
            submit: error.message || 'Failed to send message. Please try again.',
          }));
        } finally {
          setIsSubmitting(false);
        }
      },
      [values, validateForm, onSubmit, onSuccess, onError, initialValues]
    );

    const isFormValid = useCallback(() => {
      return (
        isRequired(values.name) &&
        isValidEmail(values.email) &&
        isRequired(values.subject) &&
        isRequired(values.message)
      );
    }, [values]);

    const isDisabled = loading || isSubmitting || submitSuccess;

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('space-y-4', className)}
        noValidate
        aria-label="Contact form"
        {...props}
      >
        {/* Name */}
        <Input
          label="Full Name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          error={touched.name && !!errors.name}
          errorText={errors.name}
          disabled={isDisabled}
          required
          autoComplete="name"
        />

        {/* Email */}
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          error={touched.email && !!errors.email}
          errorText={errors.email}
          disabled={isDisabled}
          required
          autoComplete="email"
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your phone number"
          error={touched.phone && !!errors.phone}
          errorText={errors.phone}
          disabled={isDisabled}
          autoComplete="tel"
        />

        {/* Subject */}
        <Input
          label="Subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter subject"
          error={touched.subject && !!errors.subject}
          errorText={errors.subject}
          disabled={isDisabled}
          required
        />

        {/* Message */}
        <Textarea
          label="Message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us about your requirements..."
          rows={5}
          error={touched.message && !!errors.message}
          errorText={errors.message}
          disabled={isDisabled}
          required
          maxLength={2000}
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

        {/* Success Message */}
        {submitSuccess && (
          <div
            className="p-4 bg-success-50 border border-success-200 rounded-lg text-success-700 text-sm"
            role="status"
          >
            <p className="font-semibold">✓ {successMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="luxury"
          size="lg"
          loading={isSubmitting}
          disabled={isDisabled || !isFormValid()}
          fullWidth
          className="mt-2"
        >
          {submitLabel}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-navy-400 text-center mt-3">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-gold-500 hover:underline">
            Privacy Policy
          </a>
          . Your information is secure and will not be shared.
        </p>
      </form>
    );
  }
);

ContactForm.displayName = 'ContactForm';

export default ContactForm;
