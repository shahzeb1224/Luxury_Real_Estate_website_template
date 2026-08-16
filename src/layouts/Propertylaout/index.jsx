import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Container from '@/components/shared/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

const PropertyLayout = ({ className = '', children, breadcrumbItems, ...props }) => {
  return (
    <div className={cn('flex flex-col min-h-screen bg-gray-50', className)} {...props}>
      {/* Breadcrumb */}
      {breadcrumbItems && (
        <Container className="py-4">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      )}

      {/* Main Content */}
      <Container className="flex-1 py-8">{children || <Outlet />}</Container>
    </div>
  );
};

export default React.memo(PropertyLayout);
