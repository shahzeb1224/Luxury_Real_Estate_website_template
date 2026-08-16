import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Container from '@/components/shared/Container';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import config from '@/constants/config';
import NAVIGATION from '@/constants/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({ className = '', ...props }) => {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    youtube: FaYoutube,
    twitter: FaXTwitter,
  };

  return (
    <footer
      className={cn('bg-navy-900 text-white border-t border-navy-800', className)}
      role="contentinfo"
      {...props}
    >
      <Container className="py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold text-gold-400">{config.company.name}</h3>
            <p className="text-navy-300 text-sm mt-3 max-w-xs">{config.app.description}</p>
            <div className="mt-4 space-y-2 text-sm text-navy-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />
                <span>{config.company.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold-400" />
                <a
                  href={`tel:${config.company.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {config.company.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold-400" />
                <a
                  href={`mailto:${config.company.email}`}
                  className="hover:text-white transition-colors"
                >
                  {config.company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {NAVIGATION.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Properties
            </h4>
            <ul className="mt-4 space-y-2">
              {NAVIGATION.footer.properties.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-navy-300 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h4>
            <p className="text-navy-300 text-sm mt-3">
              Subscribe to receive exclusive property updates and market insights.
            </p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-navy-800 border border-navy-700 rounded-lg text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gold-500 text-white rounded-lg text-sm font-semibold hover:bg-gold-600 transition-colors"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {Object.entries(NAVIGATION.social || {}).map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-navy-800 rounded-lg text-navy-400 hover:text-white hover:bg-navy-700 transition-colors"
                    aria-label={`${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-navy-400 text-sm">
            &copy; {currentYear} {config.company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {NAVIGATION.footer.legal.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-navy-400 text-sm hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
