export const COMMERCIAL_STATS = [
  { value: '350+', label: 'Commercial Properties', icon: 'Building2' },
  { value: '12.5%', label: 'Average ROI', icon: 'TrendingUp' },
  { value: '8.2%', label: 'Investment Growth', icon: 'BarChart' },
  { value: '97%', label: 'Client Satisfaction', icon: 'Users' },
];

export const COMMERCIAL_SERVICES = [
  {
    id: 'tenant-rep',
    icon: 'Users',
    title: 'Tenant Representation',
    description: 'Expert guidance for businesses seeking the perfect commercial space.',
    href: '/services/commercial/tenant',
    color: 'navy',
  },
  {
    id: 'landlord-rep',
    icon: 'Building2',
    title: 'Landlord Representation',
    description: "Maximize your commercial property's value with premium marketing.",
    href: '/services/commercial/landlord',
    color: 'gold',
  },
  {
    id: 'investment-consulting',
    icon: 'TrendingUp',
    title: 'Investment Consulting',
    description: 'Strategic commercial real estate investment advice and market analysis.',
    href: '/services/commercial/investment',
    color: 'navy',
  },
  {
    id: 'site-selection',
    icon: 'MapPin',
    title: 'Site Selection',
    description: 'Find the optimal location for your business with data-driven insights.',
    href: '/services/commercial/site-selection',
    color: 'gold',
  },
  {
    id: 'property-management',
    icon: 'Settings',
    title: 'Property Management',
    description: 'Full-service management for commercial properties and portfolios.',
    href: '/services/commercial/management',
    color: 'navy',
  },
  {
    id: 'commercial-valuation',
    icon: 'DollarSign',
    title: 'Commercial Valuation',
    description: 'Accurate property valuations from certified commercial appraisers.',
    href: '/services/commercial/valuation',
    color: 'gold',
  },
];

export const COMMERCIAL_PROPERTY_TYPES = [
  {
    id: 'office',
    icon: 'Building2',
    label: 'Office Buildings',
    description: 'Premium office spaces in prime business districts',
    color: 'navy',
    count: 120,
  },
  {
    id: 'retail',
    icon: 'Store',
    label: 'Retail Spaces',
    description: 'High-footfall retail locations for your business',
    color: 'gold',
    count: 85,
  },
  {
    id: 'industrial',
    icon: 'Factory',
    label: 'Industrial Properties',
    description: 'Manufacturing and industrial facilities',
    color: 'navy',
    count: 64,
  },
  {
    id: 'warehouse',
    icon: 'Warehouse',
    label: 'Warehouses',
    description: 'Storage and distribution centers',
    color: 'gold',
    count: 48,
  },
  {
    id: 'mixed-use',
    icon: 'Building',
    label: 'Mixed-Use Developments',
    description: 'Combined residential and commercial spaces',
    color: 'navy',
    count: 32,
  },
  {
    id: 'investment',
    icon: 'Briefcase',
    label: 'Investment Properties',
    description: 'High-ROI commercial investment opportunities',
    color: 'gold',
    count: 56,
  },
];

export const COMMERCIAL_PROCESS = [
  {
    step: 1,
    title: 'Discovery',
    description: 'Understand your commercial real estate needs and objectives.',
    icon: 'Compass',
  },
  {
    step: 2,
    title: 'Consultation',
    description: 'Strategic consultation with our commercial experts.',
    icon: 'Handshake',
  },
  {
    step: 3,
    title: 'Property Search',
    description: 'Curated selection of properties matching your criteria.',
    icon: 'Search',
  },
  {
    step: 4,
    title: 'Negotiation',
    description: 'Expert negotiation for the best terms and value.',
    icon: 'Scale',
  },
  {
    step: 5,
    title: 'Closing',
    description: 'Seamless transaction and property handover.',
    icon: 'CheckCircle',
  },
];

export const COMMERCIAL_WHY_CHOOSE = [
  {
    icon: 'Award',
    title: 'Commercial Expertise',
    description: 'Specialized knowledge across all commercial property types.',
  },
  {
    icon: 'TrendingUp',
    title: 'Investment Advisory',
    description: 'Data-driven insights for optimal investment decisions.',
  },
  {
    icon: 'LineChart',
    title: 'Market Analysis',
    description: 'Comprehensive market research and competitive analysis.',
  },
  {
    icon: 'Handshake',
    title: 'Expert Negotiation',
    description: 'Skilled negotiation for favorable terms and conditions.',
  },
];

export default {
  COMMERCIAL_STATS,
  COMMERCIAL_SERVICES,
  COMMERCIAL_PROPERTY_TYPES,
  COMMERCIAL_PROCESS,
  COMMERCIAL_WHY_CHOOSE,
};
