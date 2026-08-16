import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Container from '@/components/shared/Container';
import config from '@/constants/config';

const AuthLayout = ({ className = '', children, ...props }) => {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-navy-500 blur-3xl" />
      </div>

      {/* Content */}
      <Container size="narrow" className="relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-premium-xl p-8 sm:p-12">
          {/* Brand Logo */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block text-3xl font-playfair font-bold text-navy-800 hover:text-navy-700 transition-colors"
            >
              {config.app.name}
            </Link>
            <p className="text-sm text-navy-500 mt-1">{config.app.tagline}</p>
          </div>

          {/* Auth Content */}
          <div className="max-w-sm mx-auto">{children || <Outlet />}</div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-navy-400">
              &copy; {new Date().getFullYear()} {config.company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(AuthLayout);
