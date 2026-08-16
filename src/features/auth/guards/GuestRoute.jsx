import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '@/components/shared/Loading';

const GuestRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullscreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default GuestRoute;
