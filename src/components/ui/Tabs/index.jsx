import React, { useState } from 'react';
import { cn } from '@/utils/cn';

const Tabs = ({ tabs, defaultTab = 0, onChange, className = '', ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Tab List */}
      <div className="flex border-b border-navy-200 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              'px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap',
              'focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2',
              activeTab === index
                ? 'text-navy-800 border-b-2 border-navy-800'
                : 'text-navy-500 hover:text-navy-700 hover:border-b-2 hover:border-navy-300'
            )}
            onClick={() => handleTabChange(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'ml-2 px-2 py-0.5 text-xs rounded-full',
                  activeTab === index ? 'bg-navy-800 text-white' : 'bg-navy-100 text-navy-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            id={`tab-panel-${index}`}
            className={cn(
              'transition-opacity duration-200',
              activeTab === index ? 'block' : 'hidden'
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
