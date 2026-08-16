import { getAgentImage } from '@/assets/images/agents';

export const BLOG_DATA = [
  {
    id: 'blog-001',
    title: 'The Future of Luxury Real Estate: Trends Shaping 2025',
    slug: 'future-of-luxury-real-estate-trends-2025',
    category: 'Market Insights',
    description:
      'From AI-powered property searches to sustainable architecture, discover the key trends that will define the luxury real estate market in 2025 and beyond.',
    image: getPropertyImage(0),
    author: {
      name: 'Sarah Johnson',
      avatar: getAgentImage(0),
      title: 'Luxury Property Specialist',
    },
    date: '2024-08-15',
    readingTime: 6,
    featured: true,
    tags: ['Trends', 'Technology', 'Sustainability', '2025'],
    excerpt:
      'Discover the key trends that will define the luxury real estate market in 2025 and beyond.',
  },
  {
    id: 'blog-002',
    title: "How to Find the Perfect Luxury Villa: A Buyer's Guide",
    slug: 'how-to-find-perfect-luxury-villa-buyers-guide',
    category: 'Buying Guide',
    description:
      'Navigate the competitive luxury villa market with confidence. Learn what to look for, where to invest, and how to secure your dream property.',
    image: getPropertyImage(1),
    author: {
      name: 'Michael Chen',
      avatar: getAgentImage(1),
      title: 'Commercial & Investment Expert',
    },
    date: '2024-08-10',
    readingTime: 8,
    featured: false,
    tags: ['Villa', 'Buying Guide', 'Luxury', 'Investment'],
    excerpt:
      'Navigate the competitive luxury villa market with confidence and secure your dream property.',
  },
  {
    id: 'blog-003',
    title: 'Smart Home Technology: The New Standard in Luxury Living',
    slug: 'smart-home-technology-new-standard-luxury-living',
    category: 'Technology',
    description:
      'Explore the latest smart home innovations that are transforming luxury properties, from AI-integrated systems to sustainable energy solutions.',
    image: getPropertyImage(2),
    author: {
      name: 'Jennifer Williams',
      avatar: getAgentImage(2),
      title: 'Luxury Villa Specialist',
    },
    date: '2024-08-05',
    readingTime: 5,
    featured: false,
    tags: ['Smart Home', 'Technology', 'Innovation', 'Sustainability'],
    excerpt: 'Explore the latest smart home innovations that are transforming luxury properties.',
  },
  {
    id: 'blog-004',
    title: 'The Rise of Sustainable Luxury: Eco-Friendly Estates',
    slug: 'rise-of-sustainable-luxury-eco-friendly-estates',
    category: 'Sustainability',
    description:
      'Discover how the luxury real estate market is embracing sustainability, from net-zero homes to eco-friendly materials and green certifications.',
    image: getPropertyImage(3),
    author: {
      name: 'David Park',
      avatar: getAgentImage(0),
      title: 'Investment Property Advisor',
    },
    date: '2024-07-28',
    readingTime: 7,
    featured: false,
    tags: ['Sustainability', 'Green Homes', 'Eco-Friendly', 'Investment'],
    excerpt:
      'Discover how the luxury real estate market is embracing sustainability and eco-friendly estates.',
  },
  {
    id: 'blog-005',
    title: 'Investment Strategies for Commercial Real Estate in 2024',
    slug: 'investment-strategies-commercial-real-estate-2024',
    category: 'Investment',
    description:
      'Expert insights on commercial real estate investment strategies, including market analysis, risk assessment, and maximizing returns in a changing landscape.',
    image: getPropertyImage(9),
    author: {
      name: 'Michael Chen',
      avatar: getAgentImage(1),
      title: 'Commercial & Investment Expert',
    },
    date: '2024-07-20',
    readingTime: 9,
    featured: false,
    tags: ['Investment', 'Commercial', 'ROI', 'Strategy'],
    excerpt:
      'Expert insights on commercial real estate investment strategies and maximizing returns.',
  },
  {
    id: 'blog-006',
    title: 'Top 5 Luxury Neighborhoods for Real Estate Investment',
    slug: 'top-5-luxury-neighborhoods-real-estate-investment',
    category: 'Neighborhoods',
    description:
      'Explore the most promising luxury neighborhoods for real estate investment, featuring growth projections, market trends, and lifestyle highlights.',
    image: getPropertyImage(4),
    author: {
      name: 'Sarah Johnson',
      avatar: getAgentImage(0),
      title: 'Luxury Property Specialist',
    },
    date: '2024-07-15',
    readingTime: 6,
    featured: true,
    tags: ['Neighborhoods', 'Investment', 'Luxury', 'Market Trends'],
    excerpt:
      'Explore the most promising luxury neighborhoods for real estate investment and growth.',
  },
];

export default BLOG_DATA;
import { getPropertyImage } from '@/assets/images/properties';
