import React from 'react';
import { cn } from '@/utils/cn';
import Container from '@/components/shared/Container';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import config from '@/constants/config';

const TopBar = ({ className = '', ...props }) => {
  return (
    <div
      className={cn(
        'hidden sm:block bg-navy-800 text-navy-300 text-xs border-b border-navy-700',
        className
      )}
      {...props}
    >
      <Container>
        <div className="flex items-center justify-between h-9">
          {/* Contact Info */}
          <div className="flex items-center gap-6">
            <a
              href={`tel:${config.company.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{config.company.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${config.company.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>{config.company.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-navy-400">
              <Clock className="w-3 h-3" />
              <span>Mon-Fri 9am-6pm</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Schedule Consultation
            </a>
            <span className="text-navy-600">|</span>
            <select
              className="bg-transparent text-navy-300 hover:text-white cursor-pointer focus:outline-none"
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(TopBar);
