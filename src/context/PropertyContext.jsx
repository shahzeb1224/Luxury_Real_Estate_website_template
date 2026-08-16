import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('propertyFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('propertyCompare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('recentlyViewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentProperty, setCurrentProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Favorites
  const addFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      if (prev.includes(propertyId)) return prev;
      const updated = [...prev, propertyId];
      localStorage.setItem('propertyFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      const updated = prev.filter((id) => id !== propertyId);
      localStorage.setItem('propertyFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((propertyId) => {
    setFavorites((prev) => {
      const updated = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('propertyFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (propertyId) => {
      return favorites.includes(propertyId);
    },
    [favorites]
  );

  // Compare
  const addToCompare = useCallback((property) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === property.id)) return prev;
      if (prev.length >= 4) return prev;
      const updated = [...prev, property];
      localStorage.setItem('propertyCompare', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCompare = useCallback((propertyId) => {
    setCompareList((prev) => {
      const updated = prev.filter((p) => p.id !== propertyId);
      localStorage.setItem('propertyCompare', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    localStorage.removeItem('propertyCompare');
  }, []);

  const isInCompare = useCallback(
    (propertyId) => {
      return compareList.some((p) => p.id === propertyId);
    },
    [compareList]
  );

  // Recently Viewed
  const addRecentlyViewed = useCallback((property) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== property.id);
      const updated = [property, ...filtered].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    localStorage.removeItem('recentlyViewed');
  }, []);

  const value = useMemo(
    () => ({
      // Favorites
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,

      // Compare
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,

      // Recently Viewed
      recentlyViewed,
      addRecentlyViewed,
      clearRecentlyViewed,

      // Current Property
      currentProperty,
      setCurrentProperty,

      // Properties
      properties,
      setProperties,
      loading,
      setLoading,
    }),
    [
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      recentlyViewed,
      addRecentlyViewed,
      clearRecentlyViewed,
      currentProperty,
      properties,
      loading,
    ]
  );

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export default PropertyContext;
