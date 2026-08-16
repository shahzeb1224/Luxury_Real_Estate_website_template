import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { SearchProvider } from '@/context/SearchContext';
import { PropertyProvider } from '@/context/PropertyContext';
import { UIProvider } from '@/context/UIContext';

const providers = [ThemeProvider, SearchProvider, PropertyProvider, UIProvider];

export const Providers = ({ children }) => {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};

export default Providers;
