import image from '@/assets/images/properties/image12.png';
export const SERVICES_DATA = [
  {
    id: 'residential-buying',
    icon: 'Home',
    title: 'Residential Buying',
    description: 'Find your dream home with expert guidance from our luxury property specialists.',
    href: '/services/buying',
    color: 'navy',
  },
  {
    id: 'residential-selling',
    icon: 'TrendingUp',
    title: 'Residential Selling',
    description:
      "Maximize your property's value with our premium marketing and negotiation expertise.",
    href: '/services/selling',
    color: 'gold',
  },
  {
    id: 'property-renting',
    icon: 'Building2',
    title: 'Property Renting',
    description: 'Discover premium rental properties with flexible terms and expert support.',
    href: '/services/renting',
    color: 'navy',
  },
  {
    id: 'commercial-leasing',
    icon: 'Briefcase',
    title: 'Commercial Leasing',
    description: 'Find the perfect commercial space for your business with our specialized team.',
    href: '/services/commercial',
    color: 'dark',
  },
  {
    id: 'luxury-consulting',
    icon: 'Crown',
    title: 'Luxury Consulting',
    description: 'Receive personalized guidance on acquiring or selling ultra-premium properties.',
    href: '/services/consulting',
    color: 'gold',
  },
  {
    id: 'investment-advisory',
    icon: 'Calculator',
    title: 'Investment Advisory',
    description: 'Make informed real estate investments with data-driven market insights.',
    href: '/services/investment',
    color: 'navy',
  },
  {
    id: 'property-valuation',
    icon: 'Shield',
    title: 'Property Valuation',
    description: 'Get accurate property valuations from certified luxury real estate appraisers.',
    href: '/services/valuation',
    color: 'glass',
  },
  {
    id: 'property-management',
    icon: 'Users',
    title: 'Property Management',
    description: 'Comprehensive management services for your luxury property portfolio.',
    href: '/services/management',
    color: 'navy',
  },
  {
    id: 'legal-assistance',
    icon: 'FileText',
    title: 'Legal Documentation',
    description: 'Navigate complex property laws with our experienced legal team.',
    href: '/services/legal',
    color: 'glass',
  },
  {
    id: 'mortgage-assistance',
    icon: 'Heart',
    title: 'Mortgage Assistance',
    description: 'Secure the best financing options for your luxury property purchase.',
    href: '/services/mortgage',
    color: 'gold',
  },
  {
    id: 'relocation-services',
    icon: 'MapPin',
    title: 'Relocation Services',
    description: 'Seamless relocation support for individuals and families moving to new cities.',
    href: '/services/relocation',
    color: 'navy',
  },
  {
    id: 'property-marketing',
    icon: 'Star',
    title: 'Property Marketing',
    description: 'Premium marketing strategies to showcase your property to the right buyers.',
    href: '/services/marketing',
    color: 'dark',
  },
];

export const FEATURED_SERVICE = {
  title: 'Luxury Property Consulting',
  description:
    'Our expert consultants provide personalized guidance for acquiring or selling ultra-premium properties. From market analysis to negotiation strategy, we ensure you make the most informed decisions.',
  image: image,

  href: '/services/consulting',
  ctaLabel: 'Book Consultation',
  badge: 'Premium Service',
};

export default {
  SERVICES_DATA,
  FEATURED_SERVICE,
};
