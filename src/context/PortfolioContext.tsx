import React, { createContext, useContext, useState } from 'react';
import { PortfolioData } from '../types';
import { initialData } from '../data/initialData';

interface PortfolioContextType {
  data: PortfolioData;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data] = useState<PortfolioData>(initialData);

  return (
    <PortfolioContext.Provider value={{ data }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
