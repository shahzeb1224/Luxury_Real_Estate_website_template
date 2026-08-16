import React, { useState, useMemo } from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import FAQAccordion from './FAQAccordion';
import FAQSearch from './FAQSearch';
import FAQCategories from './FAQCategories';
import SupportCTA from './SupportCTA';
import { FAQ_DATA, FAQ_CATEGORIES } from './faq.data';

const FAQ = React.forwardRef(
  (
    {
      faqs = FAQ_DATA,
      categories = FAQ_CATEGORIES,
      loading = false,
      title = 'Frequently Asked Questions',
      subtitle = 'Everything you need to know',
      description = 'Find answers to the most common questions about buying, selling, and investing in luxury real estate.',
      className = '',
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openItems, setOpenItems] = useState([]);

    // Filter FAQs based on search and category
    const filteredFaqs = useMemo(() => {
      let filtered = faqs;

      // Category filter
      if (activeCategory !== 'all') {
        filtered = filtered.filter((faq) => faq.category === activeCategory);
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query) ||
            faq.category.toLowerCase().includes(query)
        );
      }

      return filtered;
    }, [faqs, activeCategory, searchQuery]);

    const handleToggle = (id) => {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    const handleCategoryChange = (category) => {
      setActiveCategory(category);
      setOpenItems([]);
    };

    const handleSearch = (query) => {
      setSearchQuery(query);
      setOpenItems([]);
    };

    const handleClearSearch = () => {
      setSearchQuery('');
      setOpenItems([]);
    };

    // Get featured FAQ
    const featuredFaq = faqs.find((faq) => faq.featured);

    return (
      <Section
        ref={ref}
        id="faq"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-10 lg:space-y-12">
          {/* Header */}
          <SectionHeader
            title={title}
            subtitle={subtitle}
            description={description}
            align="center"
            size="lg"
            className="max-w-3xl mx-auto"
          />

          {/* Search */}
          <FAQSearch
            value={searchQuery}
            onChange={handleSearch}
            onClear={handleClearSearch}
            loading={loading}
          />

          {/* Categories */}
          <FAQCategories
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            loading={loading}
          />

          {/* Featured FAQ */}
          {!loading && featuredFaq && searchQuery === '' && activeCategory === 'all' && (
            <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl p-4 sm:p-6 border border-gold-200">
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-gold-500 text-white text-xs font-medium rounded-lg flex-shrink-0">
                  Featured
                </span>
                <div>
                  <h4 className="font-semibold text-navy-800">{featuredFaq.question}</h4>
                  <p className="text-sm text-navy-600 mt-1">{featuredFaq.answer}</p>
                  <span className="text-xs text-navy-400 mt-2 inline-block">
                    Category: {featuredFaq.category}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          <FAQAccordion
            items={filteredFaqs}
            openItems={openItems}
            onToggle={handleToggle}
            loading={loading}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />

          {/* Support CTA */}
          <SupportCTA />
        </div>
      </Section>
    );
  }
);

FAQ.displayName = 'FAQ';

export default React.memo(FAQ);
