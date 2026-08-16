import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Button, Badge } from '@/components/ui';
import ChatWidget from '@/components/chat/ChatWidget';
import {
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Users,
  Clock,
  Shield,
  Sparkles,
} from 'lucide-react';

const ChatPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Live Chat', href: '/chat' },
  ];

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Live Chat | Elite Real Estate</title>
        <meta
          name="description"
          content="Chat with our luxury real estate experts. Get instant answers and personalized assistance for your property needs."
        />
        <link rel="canonical" href="https://eliterealestate.com/chat" />
        <meta property="og:title" content="Live Chat | Elite Real Estate" />
        <meta property="og:description" content="Chat with our luxury real estate experts." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="luxury" size="lg" className="mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Chat With Our Experts
            </h1>
            <p className="text-navy-300 text-lg sm:text-xl mt-4 max-w-2xl">
              Connect instantly with our luxury real estate specialists. Get answers, explore
              properties, and start your journey.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Button
                variant="luxury"
                size="lg"
                onClick={() => setIsChatOpen(true)}
                className="min-w-[180px]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
              <Link to="/contact">
                <Button variant="glass" size="lg" className="min-w-[160px]">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <Section padding="lg" background="white">
        <Container>
          <SectionHeader
            title="Why Chat With Us"
            subtitle="Instant support, expert guidance"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {[
              {
                icon: Users,
                title: 'Expert Agents',
                description: 'Speak with licensed real estate professionals.',
              },
              {
                icon: Clock,
                title: 'Instant Response',
                description: 'Get answers in real-time, 24/7.',
              },
              {
                icon: Shield,
                title: 'Confidential Service',
                description: 'Your privacy is our priority.',
              },
              {
                icon: Sparkles,
                title: 'Personalized Support',
                description: 'Tailored advice for your needs.',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="text-center p-6 bg-white rounded-2xl border border-navy-100 hover:border-gold-300 transition-colors">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gold-50 rounded-full">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-navy-800">{benefit.title}</h4>
                    <p className="text-sm text-navy-500 mt-1">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Quick Contact */}
      <Section padding="lg" background="gray">
        <Container>
          <SectionHeader
            title="Other Ways to Reach Us"
            subtitle="We're here to help"
            align="center"
            size="md"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
            <Link to="/contact">
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-premium transition-shadow cursor-pointer">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-navy-50 rounded-full">
                    <Phone className="w-6 h-6 text-navy-600" />
                  </div>
                </div>
                <h4 className="font-semibold text-navy-800">Call Us</h4>
                <p className="text-sm text-navy-500 mt-1">(888) 555-0123</p>
                <span className="text-xs text-gold-500 mt-2 inline-block">Available 24/7 →</span>
              </div>
            </Link>
            <Link to="/contact">
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-premium transition-shadow cursor-pointer">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-navy-50 rounded-full">
                    <Mail className="w-6 h-6 text-navy-600" />
                  </div>
                </div>
                <h4 className="font-semibold text-navy-800">Email Us</h4>
                <p className="text-sm text-navy-500 mt-1">support@eliterealestate.com</p>
                <span className="text-xs text-gold-500 mt-2 inline-block">
                  Response within 24h →
                </span>
              </div>
            </Link>
            <Link to="/consultation">
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-premium transition-shadow cursor-pointer">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-navy-50 rounded-full">
                    <Calendar className="w-6 h-6 text-navy-600" />
                  </div>
                </div>
                <h4 className="font-semibold text-navy-800">Book Consultation</h4>
                <p className="text-sm text-navy-500 mt-1">Schedule a private consultation</p>
                <span className="text-xs text-gold-500 mt-2 inline-block">Book Now →</span>
              </div>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Mobile Chat Toggle (if chat is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-sticky p-4 bg-gold-500 text-white rounded-full shadow-premium-lg hover:bg-gold-600 transition-colors flex items-center gap-2"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Chat</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </button>
      )}
    </motion.div>
  );
};

export default React.memo(ChatPage);
export { default as ChatWidget } from './ChatWidget';
