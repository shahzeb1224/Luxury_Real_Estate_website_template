import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
const ConsultationPage = lazy(() => import('@/pages/Consultation'));
const ServicesPage = lazy(() => import('@/pages/Services'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetail'));
const ResourcesPage = lazy(() => import('@/pages/Resources'));
const ResourceDetailPage = lazy(() => import('@/pages/ResourceDetail'));
// const ChatPage = lazy(() => import('@/pages/Chat'));
const InvestmentPage = lazy(() => import('@/pages/Investment'));
const AgentProfilePage = lazy(() => import('@/pages/AgentProfile'));
import Loading from '@/components/shared/Loading';
const LocationsPage = lazy(() => import('@/pages/Locations'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));

// Lazy load pages
const HomePage = lazy(() => import('@/pages/Home'));
const BuyPage = lazy(() => import('@/pages/Buy'));
const RentPage = lazy(() => import('@/pages/Rent'));
const CommercialPage = lazy(() => import('@/pages/Commercial'));
const CommercialServicesPage = lazy(() => import('@/pages/CommercialServices'));
const LuxuryPage = lazy(() => import('@/pages/Luxury'));
const PropertyDetailsPage = lazy(() => import('@/pages/PropertyDetails'));
const PartnershipPage = lazy(() => import('@/pages/Partnership'));

const AgentsPage = lazy(() => import('@/pages/Agents'));
const AboutPage = lazy(() => import('@/pages/About'));
const BlogPage = lazy(() => import('@/pages/Blog'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const SearchPage = lazy(() => import('@/pages/Search'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const LoginPage = lazy(() => import('@/pages/Login'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const FavoritesPage = lazy(() => import('@/pages/Favorites'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-navy-800 border-t-gold-500 rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: 'agents',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AgentsPage />
            </Suspense>
          ),
        },
        {
          path: 'agent/:agentId',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AgentProfilePage />
            </Suspense>
          ),
        },
        {
          path: 'buy',
          element: (
            <Suspense fallback={<PageLoader />}>
              <BuyPage />
            </Suspense>
          ),
        },
        {
          path: 'partnership',
          element: (
            <Suspense fallback={<PageLoader />}>
              <PartnershipPage />
            </Suspense>
          ),
        },
        {
          path: 'portfolio',
          element: (
            <Suspense fallback={<PageLoader />}>
              <Portfolio />
            </Suspense>
          ),
        },
        {
          path: 'resources',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ResourcesPage />
            </Suspense>
          ),
        },
        {
          path: 'resources/:resourceSlug',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ResourceDetailPage />
            </Suspense>
          ),
        },
        {
          path: 'rent',
          element: (
            <Suspense fallback={<PageLoader />}>
              <RentPage />
            </Suspense>
          ),
        },
        {
          path: 'commercial',
          element: (
            <Suspense fallback={<PageLoader />}>
              <CommercialPage />
            </Suspense>
          ),
        },
        {
          path: 'commercial-services',
          element: (
            <Suspense fallback={<PageLoader />}>
              <CommercialServicesPage />
            </Suspense>
          ),
        },
        {
          path: 'locations',
          element: (
            <Suspense fallback={<PageLoader />}>
              <LocationsPage />
            </Suspense>
          ),
        },
        {
          path: 'luxury',
          element: (
            <Suspense fallback={<PageLoader />}>
              <LuxuryPage />
            </Suspense>
          ),
        },
        {
          path: 'property/:id',
          element: (
            <Suspense fallback={<PageLoader />}>
              <PropertyDetailsPage />
            </Suspense>
          ),
        },
        {
          path: 'investment',
          element: (
            <Suspense fallback={<PageLoader />}>
              <InvestmentPage />
            </Suspense>
          ),
        },
        {
          path: 'agents',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AgentsPage />
            </Suspense>
          ),
        },
        {
          path: 'about',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          ),
        },
        {
          path: 'blog',
          element: (
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          ),
        },
        {
          path: 'blog/:slug',
          element: (
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          ),
        },
        {
          path: 'contact',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          ),
        },
        {
          path: 'search',
          element: (
            <Suspense fallback={<PageLoader />}>
              <SearchPage />
            </Suspense>
          ),
        },
        {
          path: 'login',
          element: (
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          ),
        },
        // {
        //   path: 'chat',
        //   element: (
        //     <Suspense fallback={<PageLoader />}>
        //       <ChatPage />
        //     </Suspense>
        //   ),
        // },
        {
          path: 'register',
          element: (
            <Suspense fallback={<PageLoader />}>
              <RegisterPage />
            </Suspense>
          ),
        },
        {
          path: 'favorites',
          element: (
            <Suspense fallback={<PageLoader />}>
              <FavoritesPage />
            </Suspense>
          ),
        },
        {
          path: 'consultation',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ConsultationPage />
            </Suspense>
          ),
        },
        {
          path: 'services',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ServicesPage />
            </Suspense>
          ),
        },
        {
          path: 'services/:serviceSlug',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ServiceDetailPage />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
    },
  }
);
