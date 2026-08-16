import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, MapPin, Phone, Mail, Star, Calendar, Award } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AgentContact from '../AgentContact';
import { formatNumber } from '@/lib/formatters';

const AgentProfile = React.forwardRef(
  ({ agent, loading = false, className = '', ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const {
      id,
      name,
      title,
      image,
      bio,
      experience,
      specialization,
      languages,
      rating,
      verified,
      propertiesSold,
      awards,
      location,
      phone,
      email,
      social,
      achievements,
      recentProperties,
    } = agent || {};

    const handleImageLoad = () => setImageLoaded(true);
    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    if (loading) {
      return (
        <div className={cn('animate-pulse space-y-6', className)}>
          <div className="h-64 bg-navy-100 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-navy-100 rounded w-3/4" />
            <div className="h-4 bg-navy-100 rounded w-1/2" />
            <div className="h-24 bg-navy-100 rounded" />
          </div>
        </div>
      );
    }

    if (!agent) {
      return <div className="text-center py-12 text-navy-500">Agent not found</div>;
    }

    return (
      <div ref={ref} className={cn('space-y-6 lg:space-y-8', className)} {...props}>
        {/* Profile Header */}
        <Card variant="premium" padding="lg" className="overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Image */}
            <div className="flex-shrink-0 lg:w-64 lg:h-64 rounded-2xl overflow-hidden bg-navy-100">
              {image && !imageError ? (
                <img
                  src={image}
                  alt={name}
                  className={cn(
                    'w-full h-full object-cover transition-opacity duration-700',
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-navy-100 text-navy-400">
                  <span className="text-6xl font-playfair font-bold">{name?.charAt(0) || 'A'}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-navy-800">
                    {name}
                  </h1>
                  <p className="text-lg font-medium text-gold-500">{title}</p>
                </div>
                {verified && (
                  <Badge variant="success" size="md" className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </Badge>
                )}
              </div>

              {rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < Math.floor(rating) ? 'fill-gold-500 text-gold-500' : 'text-navy-200'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-navy-700">{rating.toFixed(1)}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-500">
                {experience && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {experience}+ Years Experience
                  </span>
                )}
                {propertiesSold && (
                  <span className="flex items-center gap-1.5">
                    <Home className="w-4 h-4" />
                    {propertiesSold}+ Properties Sold
                  </span>
                )}
                {awards && (
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gold-500" />
                    {awards} Awards
                  </span>
                )}
                {location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </span>
                )}
              </div>

              {languages && languages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-navy-50 text-navy-600 rounded-full text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}

              {/* Contact Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="luxury" size="md" className="min-w-[140px]">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" size="md" className="min-w-[140px]">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Agent
                </Button>
                <Button variant="secondary" size="md" className="min-w-[140px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>

              {/* Social Links */}
              {social && (
                <div className="flex gap-2 pt-2">
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-navy-50 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
                    >
                      <FaFacebook className="w-4 h-4" />
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-navy-50 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-navy-50 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-navy-50 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
                    >
                      <FaXTwitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Bio Section */}
        {bio && (
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-playfair font-semibold text-navy-800 mb-3">About {name}</h2>
            <div className="prose prose-sm max-w-none text-navy-600 leading-relaxed space-y-3">
              {bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Card>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-playfair font-semibold text-navy-800 mb-3">
              Professional Achievements
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-navy-600">{achievement}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Recent Properties */}
        {recentProperties && recentProperties.length > 0 && (
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-playfair font-semibold text-navy-800">Recent Listings</h2>
              <Link
                to={`/agent/${id}/properties`}
                className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentProperties.map((property) => (
                <Link key={property.id} to={`/property/${property.id}`} className="group block">
                  <Card padding="none" className="overflow-hidden">
                    <div className="aspect-[4/3] bg-navy-100 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-playfair font-semibold text-navy-800 line-clamp-1">
                        {property.title}
                      </p>
                      <p className="text-xs text-navy-500">{property.location}</p>
                      <p className="text-sm font-bold text-gold-500 mt-1">
                        {formatNumber(property.price)}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Contact Section */}
        <AgentContact agentId={id} />
      </div>
    );
  }
);

AgentProfile.displayName = 'AgentProfile';

export default React.memo(AgentProfile);
