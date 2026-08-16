export const SERVICES_DATA = [
  {
    id: 'property-buying',
    slug: 'property-buying',
    title: 'Property Buying',
    icon: 'Home',
    color: 'gold',
    description:
      'Expert guidance for purchasing your dream luxury property. From search to closing, we handle every detail.',
    fullDescription: `Buying a luxury property is one of the most significant investments you'll ever make. Our expert team provides comprehensive support throughout the entire buying journey, ensuring you find the perfect property with confidence.

    From the initial consultation to the final handover, we handle every aspect of the buying process. We leverage our deep market knowledge, extensive network, and negotiation expertise to secure the best possible terms for you.`,
    benefits: [
      'Personalized property search based on your preferences',
      'Access to off-market and exclusive listings',
      'Expert price negotiation and deal structuring',
      'Full due diligence and legal support',
      'Seamless closing and handover process',
    ],
    process: [
      {
        step: 1,
        title: 'Consultation',
        description: 'We understand your needs, preferences, and budget.',
      },
      {
        step: 2,
        title: 'Property Search',
        description: 'Curated selection of properties matching your criteria.',
      },
      {
        step: 3,
        title: 'Viewings',
        description: 'Private viewings of shortlisted properties.',
      },
      {
        step: 4,
        title: 'Negotiation',
        description: 'Expert negotiation for the best terms and price.',
      },
      {
        step: 5,
        title: 'Closing',
        description: 'Full support through legal and closing process.',
      },
    ],
    features: ['Property Search', 'Price Negotiation', 'Due Diligence', 'Closing Support'],
    whyChoose: [
      '10+ years of luxury real estate expertise',
      'Access to exclusive off-market properties',
      'Professional negotiation and deal structuring',
      'Full legal and due diligence support',
    ],
    relatedServices: ['property-selling', 'property-valuation', 'investment-advisory'],
    relatedProperties: [],
  },
  {
    id: 'property-selling',
    slug: 'property-selling',
    title: 'Property Selling',
    icon: 'TrendingUp',
    color: 'navy',
    description:
      "Maximize your property's value with our premium marketing and negotiation expertise.",
    fullDescription: `Selling a luxury property requires a sophisticated approach that goes beyond traditional real estate marketing. Our comprehensive selling service is designed to maximize your property's value and ensure a smooth transaction.

    We combine strategic pricing, professional staging, global marketing, and expert negotiation to achieve the best possible outcome for you. Our team handles every aspect of the selling process, from initial valuation to final closing.`,
    benefits: [
      'Professional property valuation and pricing strategy',
      'Premium marketing and global exposure',
      'Professional staging and photography',
      'Expert negotiation and deal management',
      'Full legal and closing support',
    ],
    process: [
      {
        step: 1,
        title: 'Valuation',
        description: 'Comprehensive property valuation and market analysis.',
      },
      {
        step: 2,
        title: 'Marketing',
        description: 'Premium marketing strategy and global exposure.',
      },
      {
        step: 3,
        title: 'Viewings',
        description: 'Professional staging and private viewings.',
      },
      {
        step: 4,
        title: 'Negotiation',
        description: 'Expert negotiation for the best price and terms.',
      },
      {
        step: 5,
        title: 'Closing',
        description: 'Full support through legal and closing process.',
      },
    ],
    features: ['Market Analysis', 'Professional Staging', 'Global Marketing', 'Negotiation'],
    whyChoose: [
      'Proven track record of achieving premium prices',
      'Global marketing network and exposure',
      'Professional staging and presentation',
      'Expert negotiation and deal management',
    ],
    relatedServices: ['property-buying', 'property-valuation', 'market-analysis'],
    relatedProperties: [],
  },
  {
    id: 'property-management',
    slug: 'property-management',
    title: 'Property Management',
    icon: 'Settings',
    color: 'gold',
    description: 'Comprehensive management services for your luxury property portfolio.',
    fullDescription: `Our luxury property management service provides complete peace of mind for property owners. We handle every aspect of property management, from tenant screening to maintenance and financial reporting.

    Whether you own a single luxury property or a diverse portfolio, our team ensures your properties are well-maintained, tenants are happy, and your investment performs optimally.`,
    benefits: [
      'Professional tenant screening and placement',
      'Comprehensive maintenance and repair management',
      'Detailed financial reporting and accounting',
      'Legal compliance and regulatory support',
      '24/7 emergency response and support',
    ],
    process: [
      {
        step: 1,
        title: 'Onboarding',
        description: 'Comprehensive property assessment and onboarding.',
      },
      {
        step: 2,
        title: 'Tenant Management',
        description: 'Professional tenant screening and management.',
      },
      {
        step: 3,
        title: 'Maintenance',
        description: 'Proactive maintenance and repair management.',
      },
      {
        step: 4,
        title: 'Financial Reporting',
        description: 'Detailed financial reporting and accounting.',
      },
      {
        step: 5,
        title: 'Review',
        description: 'Regular portfolio reviews and optimization.',
      },
    ],
    features: ['Tenant Management', 'Maintenance', 'Financial Reporting', 'Legal Compliance'],
    whyChoose: [
      'Comprehensive property management expertise',
      'Professional tenant screening and placement',
      'Proactive maintenance and repair management',
      'Detailed financial reporting and accounting',
    ],
    relatedServices: ['property-buying', 'property-selling', 'investment-advisory'],
    relatedProperties: [],
  },
  {
    id: 'investment-advisory',
    slug: 'investment-advisory',
    title: 'Investment Advisory',
    icon: 'Briefcase',
    color: 'gold',
    description:
      'Strategic investment advice for building and optimizing your real estate portfolio.',
    fullDescription: `Our investment advisory service provides strategic guidance to help you build and optimize your real estate portfolio. We combine deep market knowledge with sophisticated analysis to identify the best investment opportunities.

    Whether you're a first-time investor or managing a substantial portfolio, our team provides the insights and expertise you need to make informed investment decisions.`,
    benefits: [
      'Strategic portfolio planning and optimization',
      'Market analysis and investment opportunity identification',
      'Risk assessment and management strategies',
      'ROI analysis and performance tracking',
      'Ongoing portfolio review and adjustment',
    ],
    process: [
      {
        step: 1,
        title: 'Strategy',
        description: 'Develop customized investment strategy and goals.',
      },
      {
        step: 2,
        title: 'Analysis',
        description: 'Comprehensive market analysis and opportunity identification.',
      },
      {
        step: 3,
        title: 'Acquisition',
        description: 'Strategic acquisition and deal management.',
      },
      {
        step: 4,
        title: 'Management',
        description: 'Professional portfolio management and optimization.',
      },
      {
        step: 5,
        title: 'Review',
        description: 'Regular portfolio review and strategy adjustment.',
      },
    ],
    features: ['ROI Analysis', 'Market Trends', 'Risk Assessment', 'Portfolio Diversification'],
    whyChoose: [
      'Experienced investment advisors',
      'Data-driven decision making',
      'Strategic portfolio planning',
      'Ongoing support and review',
    ],
    relatedServices: ['property-buying', 'property-selling', 'market-analysis'],
    relatedProperties: [],
  },
  {
    id: 'property-valuation',
    slug: 'property-valuation',
    title: 'Property Valuation',
    icon: 'DollarSign',
    color: 'navy',
    description: 'Accurate property valuations from certified luxury real estate appraisers.',
    fullDescription: `Our property valuation service provides accurate, comprehensive valuations for luxury properties. Our certified appraisers combine deep market knowledge with sophisticated analysis to deliver precise valuations.

    Whether you're buying, selling, or assessing your portfolio, our valuations provide the insight and confidence you need to make informed decisions.`,
    benefits: [
      'Comprehensive comparative market analysis',
      'Certified appraisals and valuation reports',
      'Investment value assessment',
      'Market positioning and pricing strategy',
      'Detailed valuation reports and documentation',
    ],
    process: [
      {
        step: 1,
        title: 'Assessment',
        description: 'Comprehensive property assessment and data collection.',
      },
      {
        step: 2,
        title: 'Analysis',
        description: 'Detailed market analysis and valuation.',
      },
      {
        step: 3,
        title: 'Reporting',
        description: 'Comprehensive valuation report and recommendations.',
      },
      {
        step: 4,
        title: 'Review',
        description: 'Valuation review and strategy consultation.',
      },
    ],
    features: [
      'Comparative Analysis',
      'Investment Value',
      'Appraisal Reports',
      'Market Positioning',
    ],
    whyChoose: [
      'Certified luxury property appraisers',
      'Comprehensive valuation methodology',
      'Detailed analysis and reporting',
      'Strategic pricing recommendations',
    ],
    relatedServices: ['property-buying', 'property-selling', 'investment-advisory'],
    relatedProperties: [],
  },
  {
    id: 'luxury-consulting',
    slug: 'luxury-consulting',
    title: 'Luxury Consulting',
    icon: 'Crown',
    color: 'gold',
    description: 'Personalized consulting for ultra-premium property acquisitions and investments.',
    fullDescription: `Our luxury consulting service provides personalized guidance for ultra-premium property acquisitions and investments. We work with high-net-worth individuals, family offices, and institutional investors to identify and secure exceptional properties.

    Our team combines deep market knowledge, extensive global networks, and sophisticated analysis to deliver unparalleled service and results.`,
    benefits: [
      'Personalized consulting for ultra-premium properties',
      'Access to exclusive off-market opportunities',
      'Strategic investment and acquisition advice',
      'Global market intelligence and insights',
      'Discreet and confidential service',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'Understanding your vision and requirements.',
      },
      {
        step: 2,
        title: 'Strategy',
        description: 'Developing a tailored property acquisition strategy.',
      },
      {
        step: 3,
        title: 'Sourcing',
        description: 'Identifying and evaluating exceptional properties.',
      },
      {
        step: 4,
        title: 'Acquisition',
        description: 'Expert guidance through acquisition and closing.',
      },
      {
        step: 5,
        title: 'Management',
        description: 'Ongoing portfolio management and support.',
      },
    ],
    features: [
      'Market Intelligence',
      'Portfolio Strategy',
      'Exclusive Access',
      'White-Glove Service',
    ],
    whyChoose: [
      'Expert luxury property consultants',
      'Global network and exclusive access',
      'Personalized service and attention',
      'Discreet and confidential handling',
    ],
    relatedServices: ['property-buying', 'investment-advisory', 'property-valuation'],
    relatedProperties: [],
  },
  {
    id: 'market-analysis',
    slug: 'market-analysis',
    title: 'Market Analysis',
    icon: 'BarChart',
    color: 'navy',
    description: 'Data-driven market insights to inform your real estate decisions.',
    fullDescription: `Our market analysis service provides comprehensive, data-driven insights to inform your real estate decisions. We combine sophisticated analysis with deep market knowledge to deliver actionable intelligence.

    Whether you're evaluating a potential investment, assessing market trends, or developing a strategic plan, our analysis provides the clarity and confidence you need.`,
    benefits: [
      'Comprehensive market trends and analysis',
      'Competitive intelligence and benchmarking',
      'Price trend analysis and projections',
      'Demand analysis and market forecasting',
      'Strategic market positioning recommendations',
    ],
    process: [
      {
        step: 1,
        title: 'Research',
        description: 'Comprehensive market research and data collection.',
      },
      {
        step: 2,
        title: 'Analysis',
        description: 'Detailed analysis and intelligence synthesis.',
      },
      {
        step: 3,
        title: 'Reporting',
        description: 'Comprehensive reports and strategic recommendations.',
      },
      {
        step: 4,
        title: 'Consultation',
        description: 'Strategic consultation and decision support.',
      },
    ],
    features: ['Price Trends', 'Demand Analysis', 'Competitive Intelligence', 'Future Projections'],
    whyChoose: [
      'Data-driven market intelligence',
      'Experienced market analysts',
      'Strategic insights and recommendations',
      'Actionable intelligence for decision making',
    ],
    relatedServices: ['property-buying', 'property-selling', 'investment-advisory'],
    relatedProperties: [],
  },
  {
    id: 'relocation',
    slug: 'relocation',
    title: 'Relocation Services',
    icon: 'MapPin',
    color: 'navy',
    description: 'Seamless relocation support for individuals and families moving to new cities.',
    fullDescription: `Our relocation service provides comprehensive support for individuals and families moving to new cities. We handle every aspect of your move, from finding the perfect home to settling into your new community.

    Our team combines local market knowledge with personalized service to ensure a smooth transition to your new city.`,
    benefits: [
      'City briefings and neighborhood tours',
      'Property search and viewing coordination',
      'School searches and educational consultations',
      'Community and lifestyle introductions',
      'Settlement and integration support',
    ],
    process: [
      {
        step: 1,
        title: 'Consultation',
        description: 'Understanding your relocation needs and preferences.',
      },
      {
        step: 2,
        title: 'Discovery',
        description: 'City briefings and neighborhood familiarization.',
      },
      {
        step: 3,
        title: 'Search',
        description: 'Property search and viewing coordination.',
      },
      {
        step: 4,
        title: 'Settlement',
        description: 'Settlement support and community integration.',
      },
    ],
    features: ['City Briefings', 'School Searches', 'Community Tours', 'Settlement Support'],
    whyChoose: [
      'Expert relocation specialists',
      'Comprehensive settlement support',
      'Personalized service and attention',
      'Seamless transition experience',
    ],
    relatedServices: ['property-buying', 'property-selling'],
    relatedProperties: [],
  },
  {
    id: 'commercial',
    slug: 'commercial',
    title: 'Commercial Real Estate',
    icon: 'Building2',
    color: 'gold',
    description: 'Specialized services for office, retail, and industrial commercial properties.',
    fullDescription: `Our commercial real estate service provides specialized expertise for office, retail, and industrial properties. We help businesses find the perfect space, negotiate favorable terms, and manage their commercial property portfolio.

    Our team combines deep commercial market knowledge with strategic insight to deliver exceptional results for our clients.`,
    benefits: [
      'Site selection and market analysis',
      'Lease negotiation and deal structuring',
      'Investment analysis and portfolio strategy',
      'Property management and tenant representation',
      'Development advisory and project management',
    ],
    process: [
      {
        step: 1,
        title: 'Assessment',
        description: 'Understanding your commercial property needs.',
      },
      {
        step: 2,
        title: 'Search',
        description: 'Strategic property search and site selection.',
      },
      {
        step: 3,
        title: 'Negotiation',
        description: 'Expert lease or purchase negotiation.',
      },
      {
        step: 4,
        title: 'Management',
        description: 'Ongoing property management and support.',
      },
    ],
    features: ['Site Selection', 'Lease Negotiation', 'Investment Analysis', 'Property Management'],
    whyChoose: [
      'Commercial property specialists',
      'Strategic site selection expertise',
      'Expert lease and purchase negotiation',
      'Comprehensive management support',
    ],
    relatedServices: ['investment-advisory', 'market-analysis', 'property-valuation'],
    relatedProperties: [],
  },
];

export default SERVICES_DATA;
