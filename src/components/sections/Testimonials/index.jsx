import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import TestimonialCard from './TestimonialCard';
import TestimonialsCarousel from './TestimonialsCarousel';
import SuccessStory from './SuccessStory';
import RatingSummary from './RatingSummary';
import TestimonialsCTA from './TestimonialsCTA';
import { TESTIMONIALS_DATA, SUCCESS_STORIES_DATA, RATING_DATA } from './testimonials.data';

const Testimonials = React.forwardRef(
  (
    {
      testimonials = TESTIMONIALS_DATA,
      successStories = SUCCESS_STORIES_DATA,
      rating = RATING_DATA,
      loading = false,
      title = 'What Our Clients Say',
      subtitle = 'Real stories from real clients',
      description = 'Hear from our valued clients about their experience working with Elite Real Estate.',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="testimonials"
        padding="lg"
        background="gray"
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

          {/* Rating Summary */}
          <RatingSummary rating={rating} />

          {/* Testimonials Carousel */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-64 bg-navy-100 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <TestimonialsCarousel testimonials={testimonials} />
          )}

          {/* Success Stories */}
          {successStories.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-playfair font-semibold text-navy-800">
                  Success Stories
                </h3>
                <span className="text-sm text-navy-500">Featured transformations</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {successStories.map((story, index) => (
                  <SuccessStory key={index} {...story} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <TestimonialsCTA />
        </div>
      </Section>
    );
  }
);

Testimonials.displayName = 'Testimonials';

export default React.memo(Testimonials);
