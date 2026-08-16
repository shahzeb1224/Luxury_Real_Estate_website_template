export const CHAT_MESSAGES = {
  initial: {
    agent: {
      name: 'Sarah Johnson',
      title: 'Luxury Property Specialist',
      avatar: getAgentImage(0),
    },
    welcome:
      "Hello! Welcome to Elite Real Estate. I'm Sarah, your luxury property specialist. How can I assist you today?",
  },
  suggestions: [
    {
      id: 'buy',
      label: 'I want to buy a property',
      response:
        "Excellent! I'd be delighted to help you find your dream property. Let me understand your preferences. What type of property are you looking for?",
      followUp: 'villa, penthouse, apartment, or estate?',
    },
    {
      id: 'sell',
      label: 'I want to sell my property',
      response:
        "I understand you're looking to sell. Our team has an excellent track record of achieving premium prices. Can you tell me more about your property?",
      followUp: 'Where is it located and what type of property is it?',
    },
    {
      id: 'invest',
      label: 'Investment opportunities',
      response:
        'Great question! We have several premium investment opportunities available. Are you interested in residential, commercial, or mixed-use properties?',
      followUp: 'What is your target investment amount?',
    },
    {
      id: 'luxury',
      label: 'Luxury collection',
      response:
        "Our luxury collection features the world's most prestigious properties. From oceanfront villas to penthouse suites, we have exceptional options. Would you like to explore specific locations?",
      followUp: 'Which areas interest you most?',
    },
    {
      id: 'schedule',
      label: 'Schedule viewing',
      response:
        "I'd be happy to arrange a private viewing for you. Which property caught your attention, and when would you prefer to visit?",
      followUp: 'Our agents are flexible and can accommodate your schedule.',
    },
  ],
  responses: {
    villa:
      'Wonderful choice! We have stunning villas in Beverly Hills, Malibu, and Santa Monica. Would you like to see our featured listings?',
    penthouse:
      'Excellent taste! Our penthouse collection features breathtaking panoramic views. We have options in Downtown LA, Beverly Hills, and Santa Monica.',
    apartment:
      "Great! We have luxury apartments available in premium locations across Los Angeles, San Francisco, and New York. What's your preferred neighborhood?",
    estate:
      'Magnificent choice! Our estate portfolio includes historic mansions and contemporary masterpieces. Would you like to receive our exclusive estate brochure?',
    commercial:
      'I understand your interest in commercial properties. We have premium offices, retail spaces, and investment properties. What type of commercial space are you looking for?',
    schedule:
      "I'll coordinate with our team to arrange a private viewing. Please share your preferred property and availability.",
    contact:
      'You can reach our team at (888) 555-0123 or visit our contact page for a more detailed consultation. Would you like me to connect you with a specialist?',
    default:
      "That's an interesting question! Let me connect you with the right expert. In the meantime, would you like to explore our property collection or schedule a consultation?",
  },
};

export default CHAT_MESSAGES;
import { getAgentImage } from '@/assets/images/agents';
