import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import authService from '../services/auth.service';
import { useUI } from '@/context/UIContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useUI();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = authService.getSession();
        if (session.isLoggedIn && session.user) {
          setUser(session.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Session check error:', err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login
  const login = useCallback(
    async (credentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.login(credentials);
        setUser(response.user);
        setIsAuthenticated(true);
        addToast(response.message, 'success');
        return response;
      } catch (err) {
        const message = err.message || 'Login failed. Please try again.';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  // Register
  const register = useCallback(
    async (userData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.register(userData);
        addToast(response.message, 'success');
        return response;
      } catch (err) {
        const message = err.message || 'Registration failed. Please try again.';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  // Logout
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      addToast(response.message, 'info');
      return response;
    } catch (err) {
      const message = err.message || 'Logout failed. Please try again.';
      addToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Forgot password
  const forgotPassword = useCallback(
    async (email) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.forgotPassword(email);
        addToast(response.message, 'success');
        return response;
      } catch (err) {
        const message = err.message || 'Failed to send reset link. Please try again.';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  // Reset password
  const resetPassword = useCallback(
    async (token, newPassword, confirmPassword) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.resetPassword(token, newPassword, confirmPassword);
        addToast(response.message, 'success');
        return response;
      } catch (err) {
        const message = err.message || 'Failed to reset password. Please try again.';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  // Verify email
  const verifyEmail = useCallback(
    async (token) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.verifyEmail(token);
        addToast(response.message, 'success');
        return response;
      } catch (err) {
        const message = err.message || 'Failed to verify email. Please try again.';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  // Update profile
  const updateProfile = useCallback(
    async (updates) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.updateProfile(user.id, updates);
        setUser(response.user);
        addToast(response.message, 'success');
        return response;
      } catch (err) {
        const message = err.message || 'Failed to update profile. Please try again.';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user, addToast]
  );

  // Add to favorites
  const addToFavorites = useCallback(
    async (propertyId) => {
      if (!user) throw new Error('User not authenticated');
      try {
        const response = await authService.addToFavorites(user.id, propertyId);
        setUser((prev) => ({ ...prev, favorites: response.favorites }));
        return response;
      } catch (err) {
        addToast(err.message || 'Failed to add to favorites', 'error');
        throw err;
      }
    },
    [user, addToast]
  );

  // Remove from favorites
  const removeFromFavorites = useCallback(
    async (propertyId) => {
      if (!user) throw new Error('User not authenticated');
      try {
        const response = await authService.removeFromFavorites(user.id, propertyId);
        setUser((prev) => ({ ...prev, favorites: response.favorites }));
        return response;
      } catch (err) {
        addToast(err.message || 'Failed to remove from favorites', 'error');
        throw err;
      }
    },
    [user, addToast]
  );

  const isFavorite = useCallback(
    (propertyId) => {
      return user?.favorites?.includes(propertyId) || false;
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      updateProfile,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }),
    [
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      updateProfile,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
