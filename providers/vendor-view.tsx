import React, { createContext, useState, useContext, ReactNode } from 'react';

interface VendorViewContextType {
  showVendorView: boolean;
  toggleVendorView: () => void;
}

export const VendorViewContext = createContext<VendorViewContextType | undefined>(undefined);

interface VendorViewProviderProps {
  children: ReactNode;
}

export function VendorViewProvider({ children }: VendorViewProviderProps) {
  const [showVendorView, setShowVendorView] = useState(false);

  const toggleVendorView = () => {
    setShowVendorView(prev => !prev);
  };

  const value = {
    showVendorView,
    toggleVendorView,
  };

  return (
    <VendorViewContext.Provider value={value}>
      {children}
    </VendorViewContext.Provider>
  );
}