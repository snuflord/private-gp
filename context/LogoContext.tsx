'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getGlobalLogo } from '../src/app/lib/globalData';

interface LogoContextType {
  logoUrl: string;
  loading: boolean;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const logoResponse = await getGlobalLogo();
        setLogoUrl(logoResponse || '');
        console.log('setting logo response from LogoContext')
      } catch (error) {
        console.error("Error fetching logo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return (
    <LogoContext.Provider value={{ logoUrl, loading }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};