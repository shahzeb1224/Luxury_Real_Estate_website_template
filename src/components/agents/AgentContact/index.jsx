import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Phone, MessageCircle, Mail, Calendar, Send } from 'lucide-react';

const AgentContact = React.forwardRef(
  ({ agentId, agentName, agentPhone, agentEmail, className = '', ...props }, ref) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
      preferredDate: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };

    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.message.trim()) newErrors.message = 'Message is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '', preferredDate: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    };

    const quickActions = [
      {
        icon: Phone,
        label: 'Call Now',
        action: () => (window.location.href = `tel:${agentPhone || '+18885550123'}`),
        variant: 'primary',
      },
      {
        icon: MessageCircle,
        label: 'WhatsApp',
        action: () =>
          window.open(`https://wa.me/${agentPhone?.replace(/\D/g, '') || '18885550123'}`, '_blank'),
        variant: 'success',
      },
      {
        icon: Mail,
        label: 'Send Email',
        action: () => (window.location.href = `mailto:${agentEmail || 'info@eliterealestate.com'}`),
        variant: 'outline',
      },
      {
        icon: Calendar,
        label: 'Schedule Meeting',
        action: () =>
          document.getElementById('schedule-section')?.scrollIntoView({ behavior: 'smooth' }),
        variant: 'luxury',
      },
    ];

    return (
      <div ref={ref} className={cn('space-y-6', className)} {...props}>
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300',
                'hover:shadow-premium hover:-translate-y-1',
                action.variant === 'primary' && 'bg-navy-800 text-white hover:bg-navy-700',
                action.variant === 'success' && 'bg-green-500 text-white hover:bg-green-600',
                action.variant === 'outline' &&
                  'border-2 border-navy-200 text-navy-700 hover:border-navy-400',
                action.variant === 'luxury' && 'bg-gold-500 text-white hover:bg-gold-600'
              )}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Contact Form */}
        <Card variant="premium" padding="lg" id="schedule-section">
          <h3 className="text-xl font-playfair font-semibold text-navy-800 mb-4">Send a Message</h3>

          {isSuccess ? (
            <div className="bg-success-50 border border-success-200 rounded-xl p-4 text-success-700 text-center">
              <p className="font-semibold">Message Sent Successfully!</p>
              <p className="text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  error={!!errors.name}
                  errorText={errors.name}
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  error={!!errors.email}
                  errorText={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (888) 555-0123"
                />
                <Input
                  label="Preferred Date"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>

              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="I'm interested in learning more about..."
                rows={4}
                error={!!errors.message}
                errorText={errors.message}
                required
              />

              <Button
                type="submit"
                variant="luxury"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto min-w-[200px]"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          )}
        </Card>
      </div>
    );
  }
);

AgentContact.displayName = 'AgentContact';

export default React.memo(AgentContact);
