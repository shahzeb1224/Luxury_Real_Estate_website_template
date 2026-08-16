import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import ServiceCard from './ServiceCard';
import FeaturedService from './FeaturedService';
import ServicesCTA from './ServicesCTA';
import { SERVICES_DATA, FEATURED_SERVICE } from './services.data';

const Services = React.forwardRef(
  (
    {
      services = SERVICES_DATA,
      featuredService = FEATURED_SERVICE,
      loading = false,
      title = 'Our Premium Services',
      subtitle = 'Comprehensive real estate solutions',
      description = 'From buying to selling, leasing to investing — we provide end-to-end luxury real estate services tailored to your needs.',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="services"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-10 lg:space-y-14">
          {/* Header */}
          <SectionHeader
            title={title}
            subtitle={subtitle}
            description={description}
            align="center"
            size="lg"
            className="max-w-3xl mx-auto"
          />

          {/* Featured Service */}
          {!loading && featuredService && <FeaturedService {...featuredService} />}

          {/* Services Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-48 bg-navy-100 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id || index} {...service} index={index} />
              ))}
            </div>
          )}

          {/* CTA */}
          <ServicesCTA />
        </div>
      </Section>
    );
  }
);

Services.displayName = 'Services';

export default React.memo(Services);
