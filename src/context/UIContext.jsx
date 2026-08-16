import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  // Mobile Menu
  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Search
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Filter
  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);
  const toggleFilter = useCallback(() => setIsFilterOpen((prev) => !prev), []);

  // Compare
  const openCompare = useCallback(() => setIsCompareOpen(true), []);
  const closeCompare = useCallback(() => setIsCompareOpen(false), []);

  // Toast notifications
  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Modal
  const openModal = useCallback((modalId) => setActiveModal(modalId), []);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const isModalOpen = useCallback((modalId) => activeModal === modalId, [activeModal]);

  const value = useMemo(
    () => ({
      // Mobile Menu
      isMobileMenuOpen,
      openMobileMenu,
      closeMobileMenu,

      // Search
      isSearchOpen,
      openSearch,
      closeSearch,

      // Filter
      isFilterOpen,
      openFilter,
      closeFilter,
      toggleFilter,

      // Compare
      isCompareOpen,
      openCompare,
      closeCompare,

      // Loading
      isLoading,
      setIsLoading,

      // Toasts
      toasts,
      addToast,
      removeToast,
      clearToasts,

      // Modal
      activeModal,
      openModal,
      closeModal,
      isModalOpen,
    }),
    [
      isMobileMenuOpen,
      openMobileMenu,
      closeMobileMenu,
      isSearchOpen,
      openSearch,
      closeSearch,
      isFilterOpen,
      openFilter,
      closeFilter,
      toggleFilter,
      isCompareOpen,
      openCompare,
      closeCompare,
      isLoading,
      setIsLoading,
      toasts,
      addToast,
      removeToast,
      clearToasts,
      activeModal,
      openModal,
      closeModal,
      isModalOpen,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;
