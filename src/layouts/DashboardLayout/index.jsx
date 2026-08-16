import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ className = '', children, sidebarItems, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn('flex h-screen bg-gray-50 overflow-hidden', className)} {...props}>
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="hidden lg:flex"
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-overlay lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="lg:hidden fixed inset-y-0 left-0 z-50"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default React.memo(DashboardLayout);
