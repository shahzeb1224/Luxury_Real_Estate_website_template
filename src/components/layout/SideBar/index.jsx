import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { X, Home, Building2, Users, FileText, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ items, isOpen, onClose, className = '', ...props }) => {
  const iconMap = {
    home: Home,
    building: Building2,
    users: Users,
    file: FileText,
    settings: Settings,
    logout: LogOut,
  };

  const sidebarClasses = cn(
    'w-64 bg-white border-r border-navy-100 h-full overflow-y-auto',
    'transition-transform duration-300 ease-in-out',
    !isOpen && '-translate-x-full lg:translate-x-0',
    className
  );

  return (
    <aside
      className={sidebarClasses}
      role="complementary"
      aria-label="Sidebar Navigation"
      {...props}
    >
      <div className="p-4">
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-navy-50 transition-colors mb-4"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-navy-600" />
          </button>
        )}

        {/* Navigation */}
        <nav className="space-y-1" role="navigation">
          {items?.map((item) => {
            const Icon = iconMap[item.icon] || null;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-navy-50 text-navy-800'
                      : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800'
                  )
                }
                onClick={onClose}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-navy-100 text-navy-600 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
