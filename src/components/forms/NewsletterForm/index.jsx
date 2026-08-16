import React, { useState, useCallback, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { isValidEmail, isRequired } from '@/lib/validators';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const NewsletterForm = forwardRef(
  (
    {
      className = '',
      onSubmit,
      onSuccess,
      onError,
      loading = false,
      success = false,
      initialEmail = '',
      placeholder = 'Enter your email address',
      submitLabel = 'Subscribe',
      successMessage = 'Thank you for subscribing! Check your inbox for confirmation.',
      showName = false,
      nameLabel = 'Full Name',
      namePlaceholder = 'Enter your name',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = useState(initialEmail);
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(success);

    const validateField = useCallback((field, value) => {
      if (field === 'email') {
        if (!isRequired(value)) return 'Email address is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
      }
      if (field === 'name') {
        if (!isRequired(value)) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 60) return 'Name must be less than 60 characters';
        return '';
      }
      return '';
    }, []);

    const validateForm = useCallback(() => {
      const newErrors = {};

      const emailError = validateField('email', email);
      if (emailError) newErrors.email = emailError;

      if (showName) {
        const nameError = validateField('name', name);
        if (nameError) newErrors.name = nameError;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [email, name, showName, validateField]);

    const handleEmailChange = useCallback(
      (e) => {
        const value = e.target.value;
        setEmail(value);
        if (errors.email) {
          setErrors((prev) => ({ ...prev, email: '' }));
        }
      },
      [errors.email]
    );

    const handleNameChange = useCallback(
      (e) => {
        const value = e.target.value;
        setName(value);
        if (errors.name) {
          setErrors((prev) => ({ ...prev, name: '' }));
        }
      },
      [errors.name]
    );

    const handleBlur = useCallback(
      (field, value) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const error = validateField(field, value);
        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
        }
      },
      [validateField]
    );

    const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();

        // Mark as touched
        setTouched({ email: true, ...(showName ? { name: true } : {}) });

        if (!validateForm()) {
          return;
        }

        setIsSubmitting(true);

        try {
          const data = showName ? { email, name } : { email };

          if (onSubmit) {
            await onSubmit(data);
          }

          setSubmitSuccess(true);
          setEmail('');
          if (showName) setName('');
          setTouched({});

          if (onSuccess) {
            onSuccess(data);
          }

          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        } catch (error) {
          console.error('Newsletter subscription error:', error);

          if (onError) {
            onError(error);
          }

          setErrors((prev) => ({
            ...prev,
            submit: error.message || 'Failed to subscribe. Please try again.',
          }));
        } finally {
          setIsSubmitting(false);
        }
      },
      [email, name, showName, validateForm, onSubmit, onSuccess, onError]
    );

    const isDisabled = loading || isSubmitting || submitSuccess;

    const variantClasses = {
      default: '',
      inline: 'flex flex-col sm:flex-row gap-3',
      minimal: 'flex flex-col sm:flex-row gap-2',
      glass: 'bg-glass-white backdrop-blur-sm p-4 rounded-xl',
    };

    const buttonVariant = variant === 'glass' ? 'luxury' : 'luxury';

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('space-y-3', variantClasses[variant], className)}
        noValidate
        aria-label="Newsletter signup form"
        {...props}
      >
        {showName && (
          <div className={cn('w-full', variant === 'inline' && 'flex-1')}>
            <Input
              label={nameLabel}
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={(e) => handleBlur('name', e.target.value)}
              placeholder={namePlaceholder}
              error={touched.name && !!errors.name}
              errorText={errors.name}
              disabled={isDisabled}
              size={variant === 'minimal' ? 'sm' : 'md'}
              className={variant === 'minimal' ? 'text-sm' : ''}
              required
              autoComplete="name"
            />
          </div>
        )}

        <div className={cn('w-full', variant === 'inline' && 'flex-1')}>
          <Input
            label={showName ? undefined : 'Email Address'}
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={(e) => handleBlur('email', e.target.value)}
            placeholder={placeholder}
            error={touched.email && !!errors.email}
            errorText={errors.email}
            disabled={isDisabled}
            size={variant === 'minimal' ? 'sm' : 'md'}
            className={variant === 'minimal' ? 'text-sm' : ''}
            required
            autoComplete="email"
          />
        </div>

        <div className={cn('flex-shrink-0', variant === 'default' ? 'w-full' : 'w-full sm:w-auto')}>
          <Button
            type="submit"
            variant={buttonVariant}
            size={variant === 'minimal' ? 'sm' : 'md'}
            loading={isSubmitting}
            disabled={isDisabled || !email || !isValidEmail(email) || (showName && !name)}
            fullWidth={variant === 'default' || variant === 'glass'}
            className={cn(
              variant === 'minimal' && 'text-sm',
              variant === 'inline' && 'w-full sm:w-auto'
            )}
          >
            {submitLabel}
          </Button>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div
            className="w-full p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600 text-sm"
            role="alert"
          >
            {errors.submit}
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div
            className="w-full p-4 bg-success-50 border border-success-200 rounded-lg text-success-700 text-sm"
            role="status"
          >
            <p className="font-semibold">✓ {successMessage}</p>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-navy-400 text-center w-full">No spam. Unsubscribe anytime.</p>
      </form>
    );
  }
);

NewsletterForm.displayName = 'NewsletterForm';

export default NewsletterForm;
