import image5 from '@/assets/images/properties/image5.png';
import image6 from '@/assets/images/properties/image6.png';
import image13 from '@/assets/images/properties/image13.png';
import image14 from '@/assets/images/properties/image14.png';

export const STATISTICS_DATA = [
  {
    id: 'properties',
    icon: 'Home',
    label: 'Total Properties',
    value: 2500,
    suffix: '+',
    color: 'navy',
  },
  {
    id: 'sold',
    icon: 'TrendingUp',
    label: 'Properties Sold',
    value: 1200,
    suffix: '+',
    color: 'gold',
  },
  {
    id: 'rentals',
    icon: 'Building2',
    label: 'Properties for Rent',
    value: 800,
    suffix: '+',
    color: 'navy',
  },
  {
    id: 'cities',
    icon: 'MapPin',
    label: 'Cities Covered',
    value: 15,
    suffix: '+',
    color: 'dark',
  },
  {
    id: 'avg-price',
    icon: 'DollarSign',
    label: 'Average Property Price',
    value: 2800000,
    format: 'currency',
    prefix: '$',
    color: 'gold',
  },
  {
    id: 'growth',
    icon: 'BarChart',
    label: 'Monthly Market Growth',
    value: 8.5,
    suffix: '%',
    color: 'navy',
  },
  {
    id: 'satisfaction',
    icon: 'Users',
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    color: 'glass',
  },
  {
    id: 'experience',
    icon: 'Award',
    label: 'Years of Excellence',
    value: 10,
    suffix: '+',
    color: 'dark',
  },
];

export const INVESTMENT_DATA = [
  {
    id: 'beverly-hills',
    location: 'Beverly Hills, CA',
    roi: '12.5%',
    growth: '+8.2% YoY',
    description: 'Premium luxury market with consistent appreciation and high demand.',
    properties: 45,
    image: image5,
    featured: true,
    trend: 'up',
    href: '/investment/beverly-hills',
  },
  {
    id: 'malibu',
    location: 'Malibu, CA',
    roi: '10.8%',
    growth: '+6.5% YoY',
    description: 'Coastal luxury properties with strong rental yields and appreciation.',
    properties: 32,
    image: image6,
    featured: false,
    trend: 'up',
    href: '/investment/malibu',
  },
  {
    id: 'downtown-la',
    location: 'Downtown LA',
    roi: '8.2%',
    growth: '+3.8% YoY',
    description: 'Growing commercial and residential hub with exciting future developments.',
    properties: 28,
    image: image13,
    featured: false,
    trend: 'stable',
    href: '/investment/downtown-la',
  },
  {
    id: 'oc-coast',
    location: 'Orange County Coast',
    roi: '9.5%',
    growth: '+5.2% YoY',
    description: 'Premium coastal communities with steady appreciation and strong rental demand.',
    properties: 56,
    image: image14,
    featured: false,
    trend: 'up',
    href: '/investment/oc-coast',
  },
];

export default {
  STATISTICS_DATA,
  INVESTMENT_DATA,
};
