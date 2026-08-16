import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import NewsletterForm from './NewsletterForm';
import NewsletterBenefits from './NewsletterBenefits';
import NewsletterSuccess from './NewsletterSuccess';
import NewsletterCTA from './NewsletterCTA';
import { BENEFITS_DATA } from './newsletter.data';

const Newsletter = React.forwardRef(
  (
    {
      benefits = BENEFITS_DATA,
      loading = false,
      title = 'Join The Elite Circle',
      subtitle = 'Exclusive insights for discerning investors',
      description = 'Stay ahead of the market with our premium newsletter featuring exclusive property launches, investment opportunities, and expert market analysis.',
      className = '',
      ...props
    },
    ref
  ) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleSubmit = (data) => {
      setFormData(data);
      setIsSubmitted(true);
    };

    const handleReset = () => {
      setIsSubmitted(false);
      setFormData(null);
    };

    return (
      <Section
        ref={ref}
        id="newsletter"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-10 lg:space-y-12">
          {/* Header */}
          <SectionHeader
            title={title}
            subtitle={subtitle}
            description={description}
            align="center"
            size="lg"
            className="max-w-3xl mx-auto"
          />

          {/* Benefits */}
          <NewsletterBenefits benefits={benefits} loading={loading} />

          {/* Form or Success */}
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <NewsletterSuccess
                name={formData?.name}
                email={formData?.email}
                onReset={handleReset}
              />
            ) : (
              <NewsletterForm onSubmit={handleSubmit} loading={loading} />
            )}
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-navy-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              No spam. Unsubscribe anytime.
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Your data is secure.
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Trusted by 5,000+ subscribers.
            </span>
          </div>

          {/* CTA */}
          <NewsletterCTA />
        </div>
      </Section>
    );
  }
);

Newsletter.displayName = 'Newsletter';

export default React.memo(Newsletter);
