import React, { useState, useRef, useEffect, useCallback, use } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  Calendar,
  User,
  Home,
  Building2,
  TrendingUp,
  Crown,
  Clock,
  ChevronRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { CHAT_MESSAGES } from '@/data/chatData';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';

const ChatWidget = ({ isOpen, onClose, className = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(CHAT_MESSAGES.suggestions);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { agent, welcome } = CHAT_MESSAGES.initial;

  // Scroll to bottom
  const scrollToBottom = use(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'agent',
          text: welcome,
          timestamp: new Date().toISOString(),
        },
      ]);
      setSuggestions(CHAT_MESSAGES.suggestions);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, welcome, messages.length]);

  // Simulate agent response
  const simulateAgentResponse = useCallback((userMessage) => {
    setIsTyping(true);

    setTimeout(
      () => {
        let response = CHAT_MESSAGES.responses.default;
        const lowerMessage = userMessage.toLowerCase();

        // Check for keywords
        if (lowerMessage.includes('villa')) {
          response = CHAT_MESSAGES.responses.villa;
        } else if (lowerMessage.includes('penthouse')) {
          response = CHAT_MESSAGES.responses.penthouse;
        } else if (lowerMessage.includes('apartment')) {
          response = CHAT_MESSAGES.responses.apartment;
        } else if (lowerMessage.includes('estate')) {
          response = CHAT_MESSAGES.responses.estate;
        } else if (lowerMessage.includes('commercial')) {
          response = CHAT_MESSAGES.responses.commercial;
        } else if (lowerMessage.includes('schedule') || lowerMessage.includes('viewing')) {
          response = CHAT_MESSAGES.responses.schedule;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone')) {
          response = CHAT_MESSAGES.responses.contact;
        } else if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
          response =
            "I'd love to help you find your dream property! Let me show you some of our premium listings. What type of property are you interested in?";
        } else if (lowerMessage.includes('sell') || lowerMessage.includes('listing')) {
          response =
            'Our selling team achieves exceptional results. We offer professional staging, global marketing, and expert negotiation. Would you like to discuss a valuation?';
        } else if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
          response =
            'We have excellent investment opportunities with strong ROI potential. Would you like to speak with our investment advisory team?';
        } else if (lowerMessage.includes('luxury') || lowerMessage.includes('premium')) {
          response =
            'Our luxury collection features extraordinary properties. From waterfront estates to modern penthouses, we have exceptional options for discerning clients.';
        }

        // Add agent response
        setMessages((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}`,
            type: 'agent',
            text: response,
            timestamp: new Date().toISOString(),
          },
        ]);

        // Update suggestions based on context
        const newSuggestions = CHAT_MESSAGES.suggestions.map((s) => ({
          ...s,
          label: s.label.includes('Schedule') ? 'View Properties' : s.label,
        }));
        setSuggestions(newSuggestions);

        setIsTyping(false);
      },
      1000 + Math.random() * 800
    );
  }, []);

  // Handle sending message
  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        text: userMessage,
        timestamp: new Date().toISOString(),
      },
    ]);
    setInputValue('');
    setConversationStarted(true);
    setSuggestions([]);

    // Simulate agent response
    simulateAgentResponse(userMessage);
  }, [inputValue, simulateAgentResponse]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        text: suggestion.label,
        timestamp: new Date().toISOString(),
      },
    ]);
    setConversationStarted(true);
    setSuggestions([]);

    // Add agent response based on suggestion
    const response =
      suggestion.response ||
      "I'd be happy to help with that! Let me connect you with the right expert.";
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `agent-${Date.now()}`,
          type: 'agent',
          text: response,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }, 800);
  }, []);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
      if (e.key === 'Escape') {
        onClose?.();
      }
    },
    [handleSendMessage, onClose]
  );

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed bottom-6 right-6 z-modal w-full max-w-md bg-white rounded-2xl shadow-premium-xl overflow-hidden border border-navy-100',
        className
      )}
      role="dialog"
      aria-label="Chat"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              src={agent.avatar}
              alt={agent.name}
              size="md"
              fallback={agent.name.charAt(0)}
              className="ring-2 ring-gold-500/30"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
              <div className="flex items-center gap-1.5">
                <Badge variant="success" size="sm" className="text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Online
                </Badge>
                <span className="text-xs text-navy-300">{agent.title}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'flex items-start gap-2 max-w-[80%]',
                message.type === 'user' ? 'ml-auto flex-row-reverse' : ''
              )}
            >
              {message.type === 'agent' && (
                <Avatar
                  src={agent.avatar}
                  alt={agent.name}
                  size="sm"
                  fallback={agent.name.charAt(0)}
                  className="flex-shrink-0 mt-0.5"
                />
              )}
              <div
                className={cn(
                  'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  message.type === 'user'
                    ? 'bg-gold-500 text-white'
                    : 'bg-white border border-navy-100 text-navy-700 shadow-sm'
                )}
              >
                {message.text}
                <div
                  className={cn(
                    'text-[10px] mt-1',
                    message.type === 'user' ? 'text-white/70' : 'text-navy-400'
                  )}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 max-w-[80%]"
            >
              <Avatar
                src={agent.avatar}
                alt={agent.name}
                size="sm"
                fallback={agent.name.charAt(0)}
                className="flex-shrink-0 mt-0.5"
              />
              <div className="bg-white border border-navy-100 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-navy-300 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-navy-300 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-navy-300 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && !conversationStarted && (
        <div className="p-4 bg-white border-t border-navy-100">
          <p className="text-xs text-navy-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-navy-50 text-navy-700 text-xs rounded-full hover:bg-navy-100 transition-colors"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t border-navy-100">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-navy-50 border-0 rounded-lg text-sm text-navy-700 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="Type a message"
          />
          <Button
            variant="luxury"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-navy-400">
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hover:text-navy-600 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              Call
            </Link>
            <Link
              to="/contact"
              className="hover:text-navy-600 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              Email
            </Link>
          </div>
          <span>Available 24/7</span>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ChatWidget);
