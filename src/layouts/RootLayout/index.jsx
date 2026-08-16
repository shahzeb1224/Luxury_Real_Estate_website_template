import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import SEO from '@/components/shared/SEO';

const RootLayout = ({ className = '', ...props }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <SEO />
      <div className={cn('flex flex-col min-h-screen bg-white', className)} {...props}>
        <TopBar />
        <Navbar />
        <main className="flex-1" role="main">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default React.memo(RootLayout);
