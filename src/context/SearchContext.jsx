import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    areaMin: '',
    areaMax: '',
    features: [],
    sortBy: 'relevance',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      location: '',
      propertyType: 'all',
      priceMin: '',
      priceMax: '',
      bedrooms: 'any',
      bathrooms: 'any',
      areaMin: '',
      areaMax: '',
      features: [],
      sortBy: 'relevance',
    });
  }, []);

  const addRecentSearch = useCallback((term) => {
    if (!term || term.trim().length < 2) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery: updateSearchQuery,
      filters,
      setFilters: updateFilters,
      resetFilters,
      results,
      setResults,
      loading,
      setLoading,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
    }),
    [
      searchQuery,
      updateSearchQuery,
      filters,
      updateFilters,
      resetFilters,
      results,
      loading,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
    ]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default SearchContext;
