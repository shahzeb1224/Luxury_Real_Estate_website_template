export const RESOURCES_DATA = {
  resources: [
    {
      id: 'investment-guide',
      slug: 'investment-guide',
      title: 'Investment Guide',
      type: 'guide',
      category: 'Investment',
      description:
        'A comprehensive guide to luxury real estate investment strategies, market analysis, and portfolio optimization.',
      fullDescription: `This comprehensive investment guide provides everything you need to know about luxury real estate investment. From market analysis to portfolio optimization, this guide covers:

      • Understanding luxury real estate markets
      • Investment strategies for different property types
      • Risk assessment and mitigation
      • ROI calculation and optimization
      • Portfolio diversification strategies
      • Tax implications and benefits
      • Case studies and real-world examples

      Whether you're a first-time investor or managing a substantial portfolio, this guide provides the insights you need to make informed decisions.`,
      image: getPropertyImage(0),
      features: [
        'Market Analysis Framework',
        'Investment Strategy Templates',
        'ROI Calculation Tools',
        'Risk Assessment Matrix',
        'Portfolio Diversification Guide',
        'Tax Planning Strategies',
        'Case Studies',
        'Expert Insights',
      ],
      downloadUrl: '#',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      date: '2024-07-15',
      author: 'Elite Real Estate Investment Team',
      relatedResources: ['market-report', 'investment-opportunities'],
    },
    {
      id: 'market-report',
      slug: 'market-report',
      title: 'Market Report 2024',
      type: 'report',
      category: 'Market Analysis',
      description:
        'Quarterly luxury real estate market report with trends, forecasts, and investment insights.',
      fullDescription: `Our quarterly luxury real estate market report provides comprehensive analysis of current market conditions, emerging trends, and future forecasts.

      This edition covers:
      • Price trends across major luxury markets
      • Supply and demand analysis
      • Investment hot spots and emerging markets
      • Consumer behavior insights
      • Interest rate impacts
      • International buyer trends
      • Property type performance
      • Regional market comparisons

      Stay ahead of the market with our data-driven insights and expert analysis.`,
      image: getPropertyImage(9),
      features: [
        'Price Trend Analysis',
        'Supply & Demand Metrics',
        'Investment Hot Spots',
        'Consumer Behavior Insights',
        'Regional Comparisons',
        'Forecast Projections',
        'International Trends',
        'Market Performance Data',
      ],
      downloadUrl: '#',
      fileSize: '3.1 MB',
      fileType: 'PDF',
      date: '2024-08-01',
      author: 'Elite Real Estate Research Team',
      relatedResources: ['investment-guide', 'investment-opportunities'],
    },
    {
      id: 'investment-opportunities',
      slug: 'investment-opportunities',
      title: 'Investment Opportunities',
      type: 'opportunity',
      category: 'Investment',
      description:
        'Curated investment opportunities in luxury real estate with high ROI potential.',
      fullDescription: `Discover our curated selection of high-potential investment opportunities in the luxury real estate market.

      This portfolio includes:
      • Off-market luxury properties
      • Pre-construction developments
      • High-yield rental properties
      • Commercial investment opportunities
      • Mixed-use developments
      • Land development projects
      • Distressed property opportunities
      • International investment options

      Each opportunity has been carefully vetted for investment potential and risk-return profile.`,
      image: getPropertyImage(5),
      features: [
        'Off-Market Properties',
        'Pre-Construction Developments',
        'High-Yield Rentals',
        'Commercial Investments',
        'Mixed-Use Developments',
        'Land Development Projects',
        'Distressed Properties',
        'International Investments',
      ],
      downloadUrl: '#',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      date: '2024-08-10',
      author: 'Elite Real Estate Advisory Team',
      relatedResources: ['investment-guide', 'market-report'],
    },
    {
      id: 'luxury-home-buying-guide',
      slug: 'luxury-home-buying-guide',
      title: 'Luxury Home Buying Guide',
      type: 'guide',
      category: 'Buying Guide',
      description: 'Essential guide for purchasing luxury properties with confidence.',
      fullDescription: `A comprehensive guide to navigating the luxury home buying process with confidence.

      This guide covers:
      • Understanding your needs and preferences
      • Financing options for luxury purchases
      • Working with luxury real estate agents
      • Property evaluation and due diligence
      • Negotiation strategies
      • Legal considerations
      • Closing process and post-purchase support

      Make your luxury home purchase a success with our expert guidance.`,
      image: getPropertyImage(4),
      features: [
        'Luxury Property Financing',
        'Agent Selection Guide',
        'Property Evaluation Checklist',
        'Negotiation Strategies',
        'Legal Considerations',
        'Closing Process Guide',
      ],
      downloadUrl: '#',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      date: '2024-07-20',
      author: 'Elite Real Estate Advisory Team',
      relatedResources: ['market-report', 'investment-guide'],
    },
    {
      id: 'commercial-real-estate-guide',
      slug: 'commercial-real-estate-guide',
      title: 'Commercial Real Estate Guide',
      type: 'guide',
      category: 'Commercial',
      description: 'Expert guide to commercial real estate investment and leasing.',
      fullDescription: `A comprehensive guide to commercial real estate investment and leasing.

      This guide covers:
      • Commercial property types and markets
      • Investment analysis and valuation
      • Leasing strategies and tenant management
      • Property management best practices
      • Legal and regulatory considerations
      • Exit strategies and portfolio optimization

      Navigate the commercial real estate market with confidence.`,
      image: getPropertyImage(11),
      features: [
        'Property Type Analysis',
        'Investment Valuation Tools',
        'Leasing Strategies',
        'Property Management Guide',
        'Legal Compliance',
        'Exit Strategy Planning',
      ],
      downloadUrl: '#',
      fileSize: '2.6 MB',
      fileType: 'PDF',
      date: '2024-07-25',
      author: 'Elite Commercial Team',
      relatedResources: ['market-report', 'investment-opportunities'],
    },
    {
      id: 'property-valuation-toolkit',
      slug: 'property-valuation-toolkit',
      title: 'Property Valuation Toolkit',
      type: 'toolkit',
      category: 'Valuation',
      description: 'Professional tools and templates for property valuation and analysis.',
      fullDescription: `A comprehensive toolkit for property valuation and investment analysis.

      This toolkit includes:
      • Property valuation templates
      • Investment analysis worksheets
      • Cash flow calculators
      • ROI analysis tools
      • Comparative market analysis templates
      • Risk assessment frameworks

      Make informed investment decisions with our professional valuation tools.`,
      image: getPropertyImage(7),
      features: [
        'Valuation Templates',
        'Investment Worksheets',
        'Cash Flow Calculators',
        'ROI Analysis Tools',
        'Market Analysis Templates',
        'Risk Assessment Frameworks',
      ],
      downloadUrl: '#',
      fileSize: '1.5 MB',
      fileType: 'ZIP',
      date: '2024-08-05',
      author: 'Elite Valuation Team',
      relatedResources: ['investment-guide', 'market-report'],
    },
  ],
  categories: [
    { id: 'all', label: 'All Resources' },
    { id: 'guide', label: 'Guides' },
    { id: 'report', label: 'Reports' },
    { id: 'opportunity', label: 'Opportunities' },
    { id: 'toolkit', label: 'Toolkits' },
  ],
  resourceTypes: [
    { value: 'guide', label: 'Guide' },
    { value: 'report', label: 'Report' },
    { value: 'opportunity', label: 'Opportunity' },
    { value: 'toolkit', label: 'Toolkit' },
  ],
};

export default RESOURCES_DATA;
import { getPropertyImage } from '@/assets/images/properties';
