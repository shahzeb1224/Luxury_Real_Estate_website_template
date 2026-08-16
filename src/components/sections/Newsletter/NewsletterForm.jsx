import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { Send, Sparkles } from 'lucide-react';

const NewsletterForm = React.forwardRef(
  ({ onSubmit, loading = false, className = '', ...props }, ref) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      interest: 'buying',
      consent: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const interestOptions = [
      { value: 'buying', label: 'Buying a Property' },
      { value: 'renting', label: 'Renting a Property' },
      { value: 'commercial', label: 'Commercial Real Estate' },
      { value: 'investment', label: 'Property Investment' },
      { value: 'luxury', label: 'Luxury Collection' },
      { value: 'all', label: 'All Categories' },
    ];

    const validate = () => {
      const newErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.consent) {
        newErrors.consent = 'You must agree before subscribing.';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field) => (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);

        onSubmit?.(formData);

        setFormData({
          name: '',
          email: '',
          interest: 'buying',
          consent: false,
        });

        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }, 1200);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-50 to-gold-50 p-6 shadow-premium sm:p-8 lg:p-10',
          className
        )}
        {...props}
      >
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold-400/5 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-navy-400/5 blur-2xl" />

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-navy-500">
              Join the Elite Circle
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Enter your full name"
              error={!!errors.name}
              errorText={errors.name}
              disabled={loading || isSubmitting}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Enter your email"
              error={!!errors.email}
              errorText={errors.email}
              disabled={loading || isSubmitting}
              required
            />

            <Select
              label="Area of Interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange('interest')}
              options={interestOptions}
              disabled={loading || isSubmitting}
            />

            <Checkbox
              checked={formData.consent}
              onChange={handleChange('consent')}
              label="I agree to receive exclusive property updates and market insights via email."
              error={!!errors.consent}
              errorText={errors.consent}
              disabled={loading || isSubmitting}
            />

            <Button
              type="submit"
              variant="luxury"
              size="lg"
              fullWidth
              loading={loading || isSubmitting}
              disabled={loading || isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              Subscribe Now
            </Button>

            {isSuccess && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700">
                ✅ Thank you! You have successfully subscribed.
              </div>
            )}

            <p className="text-center text-xs text-navy-400">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>

          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {isSubmitting && 'Submitting your information...'}
            {isSuccess && 'Successfully subscribed!'}
          </div>
        </div>
      </div>
    );
  }
);

NewsletterForm.displayName = 'NewsletterForm';

export default React.memo(NewsletterForm);
