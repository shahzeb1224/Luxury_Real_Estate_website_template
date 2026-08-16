import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, Phone, MessageCircle, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import image from '@/assets/images/properties/image6.png';

const WhyChooseCTA = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10',
        'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
        'text-center',
        className
      )}
      {...props}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Luxury real estate background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-500/20 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
          Ready to Find Your Dream Property?
        </h3>
        <p className="text-navy-300 mt-3 max-w-2xl mx-auto">
          Work with our expert team to discover the perfect luxury property tailored to your needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link to="/contact">
            <Button variant="luxury" size="lg" className="min-w-[180px]">
              <span>Schedule Consultation</span>
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link to="/buy">
            <Button variant="glass" size="lg" className="min-w-[160px]">
              <span>Browse Properties</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-sm text-navy-300">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+18885550123" className="hover:text-white transition-colors">
              (888) 555-0123
            </a>
          </div>
          <span className="text-navy-600">|</span>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Chat with us</span>
          </div>
        </div>
      </div>
    </div>
  );
});

WhyChooseCTA.displayName = 'WhyChooseCTA';

export default React.memo(WhyChooseCTA);
