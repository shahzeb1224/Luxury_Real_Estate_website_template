export const AWARDS_DATA = [
  {
    icon: 'Trophy',
    title: 'Best Luxury Real Estate Agency',
    organization: 'International Property Awards',
    year: 2024,
    description: 'Recognized for exceptional service and outstanding luxury property portfolio.',
    featured: true,
    verified: true,
  },
  {
    icon: 'Award',
    title: 'Excellence in Client Service',
    organization: 'Real Estate Industry Association',
    year: 2023,
    description:
      'Awarded for consistently exceeding client expectations and delivering premium experiences.',
    featured: false,
    verified: true,
  },
  {
    icon: 'Star',
    title: 'Top Luxury Brokerage',
    organization: 'Luxury Real Estate Magazine',
    year: 2023,
    description:
      'Ranked among the top luxury brokerages in the region for sales volume and client satisfaction.',
    featured: false,
    verified: true,
  },
  {
    icon: 'Award',
    title: 'Innovation in Property Marketing',
    organization: 'Digital Real Estate Awards',
    year: 2022,
    description:
      'Recognized for innovative marketing strategies and digital presence in luxury real estate.',
    featured: false,
    verified: true,
  },
  {
    icon: 'Trophy',
    title: 'Commercial Real Estate Excellence',
    organization: 'Commercial Property Association',
    year: 2022,
    description:
      'Outstanding achievement in commercial real estate transactions and client representation.',
    featured: false,
    verified: true,
  },
  {
    icon: 'Sparkles',
    title: 'Emerging Luxury Leader',
    organization: 'Real Estate Tomorrow Summit',
    year: 2021,
    description: 'Recognized as a rising leader in the luxury real estate sector.',
    featured: false,
    verified: true,
  },
];

export const CERTIFICATIONS_DATA = [
  {
    name: 'Certified Luxury Home Marketing Specialist',
    organization: 'Institute for Luxury Home Marketing',
    logo: getPropertyImage(0),
    validUntil: '2025',
    link: '#',
  },
  {
    name: 'Accredited Buyer Representative',
    organization: "Real Estate Buyer's Agent Council",
    logo: getPropertyImage(1),
    validUntil: '2025',
    link: '#',
  },
  {
    name: 'Commercial Real Estate Specialist',
    organization: 'Commercial Real Estate Institute',
    logo: getPropertyImage(9),
    validUntil: '2024',
    link: '#',
  },
  {
    name: 'Green Real Estate Certification',
    organization: 'Eco-Realty Association',
    logo: getPropertyImage(3),
    validUntil: '2025',
    link: '#',
  },
  {
    name: 'Certified Property Manager',
    organization: 'Institute of Real Estate Management',
    logo: getPropertyImage(4),
    validUntil: '2026',
    link: '#',
  },
  {
    name: 'Senior Real Estate Specialist',
    organization: 'Senior Real Estate Council',
    logo: getPropertyImage(5),
    validUntil: '2025',
    link: '#',
  },
  {
    name: 'Negotiation Expert Certification',
    organization: 'Real Estate Negotiation Institute',
    logo: getPropertyImage(6),
    validUntil: '2024',
    link: '#',
  },
  {
    name: 'International Property Specialist',
    organization: 'Global Real Estate Alliance',
    logo: getPropertyImage(7),
    validUntil: '2025',
    link: '#',
  },
];

export const MILESTONES_DATA = [
  {
    id: 'years',
    icon: 'Award',
    label: 'Years of Excellence',
    value: 10,
    suffix: '+',
    delay: 0,
  },
  {
    id: 'properties',
    icon: 'Home',
    label: 'Properties Sold',
    value: 1200,
    suffix: '+',
    delay: 100,
  },
  {
    id: 'clients',
    icon: 'Users',
    label: 'Happy Families',
    value: 980,
    suffix: '+',
    delay: 200,
  },
  {
    id: 'cities',
    icon: 'MapPin',
    label: 'Cities Covered',
    value: 15,
    suffix: '+',
    delay: 300,
  },
  {
    id: 'luxury',
    icon: 'Building2',
    label: 'Luxury Projects',
    value: 450,
    suffix: '+',
    delay: 400,
  },
  {
    id: 'commercial',
    icon: 'Briefcase',
    label: 'Commercial Projects',
    value: 200,
    suffix: '+',
    delay: 500,
  },
];

export default {
  AWARDS_DATA,
  CERTIFICATIONS_DATA,
  MILESTONES_DATA,
};
import { getPropertyImage } from '@/assets/images/properties';
