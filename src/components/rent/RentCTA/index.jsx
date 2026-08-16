import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Calendar, Phone, MessageCircle, ChevronRight, Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const RentCTA = ({
  title = 'Looking for the Perfect Rental?',
  subtitle = 'Our expert agents can help you find the ideal rental property',
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10',
        'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
        'text-center',
        className
      )}
      {...props}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-500/20 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex justify-center gap-2 mb-4">
          <Home className="w-5 h-5 text-gold-400" />
          <span className="text-xs font-medium uppercase tracking-wider text-navy-300">
            Rental Experts
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">{title}</h3>
        <p className="text-navy-300 mt-3 max-w-2xl mx-auto">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link to="/contact">
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              <span>Schedule Viewing</span>
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link to="/rent">
            <Button variant="glass" size="lg" className="min-w-[160px]">
              <span>Browse Rentals</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-sm text-navy-400">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+18885550123" className="hover:text-white transition-colors">
              (888) 555-0123
            </a>
          </div>
          <span className="text-navy-600">|</span>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">
              Chat with Agent
            </span>
          </div>
          <span className="text-navy-600 hidden sm:block">|</span>
          <div className="flex items-center gap-2 text-navy-500 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              No hidden fees
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Flexible leases
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RentCTA;
