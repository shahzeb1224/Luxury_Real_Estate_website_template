import { lazy } from 'react';

export const HomePage = lazy(() => import('@/pages/Home'));
export const BuyPage = lazy(() => import('@/pages/Buy'));
export const RentPage = lazy(() => import('@/pages/Rent'));
export const CommercialPage = lazy(() => import('@/pages/Commercial'));
export const LuxuryPage = lazy(() => import('@/pages/Luxury'));
export const PropertyDetailsPage = lazy(() => import('@/pages/PropertyDetails'));
export const AgentsPage = lazy(() => import('@/pages/Agents'));
export const AboutPage = lazy(() => import('@/pages/About'));
export const BlogPage = lazy(() => import('@/pages/Blog'));
export const ContactPage = lazy(() => import('@/pages/Contact'));
export const NotFoundPage = lazy(() => import('@/pages/NotFound'));
