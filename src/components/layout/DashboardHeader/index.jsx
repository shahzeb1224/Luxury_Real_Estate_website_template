import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Menu, Bell, User, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';

const DashboardHeader = ({ onMenuClick, className = '', user, ...props }) => {
  return (
    <header
      className={cn(
        'bg-white border-b border-navy-100 px-4 sm:px-6 lg:px-8 py-4',
        'flex items-center justify-between',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-navy-50 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-navy-600" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center bg-navy-50 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-navy-600 placeholder-navy-400 ml-2 w-48"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="p-2 rounded-lg hover:bg-navy-50 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-navy-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm font-medium text-navy-700">
            {user?.name || 'Guest'}
          </span>
          <Avatar
            src={user?.avatar}
            alt={user?.name || 'User'}
            size="sm"
            fallback={user?.name?.charAt(0) || 'U'}
          />
        </div>
      </div>
    </header>
  );
};

export default React.memo(DashboardHeader);
