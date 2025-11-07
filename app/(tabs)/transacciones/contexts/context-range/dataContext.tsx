import React, { createContext, ReactNode, useContext, useState } from 'react';

interface RangeContextType {
  minValue: number | null;
  maxValue: number | null;
  setMinValue: (value: number | null) => void;
  setMaxValue: (value: number | null) => void;
  clearRange: () => void;
}

const RangeContext = createContext<RangeContextType | undefined>(undefined);

interface RangeProviderProps {
  children: ReactNode;
}

export const RangeProvider: React.FC<RangeProviderProps> = ({ children }) => {
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);

  const clearRange = () => {
    setMinValue(null);
    setMaxValue(null);
  };

  return (
    <RangeContext.Provider value={{ minValue, maxValue, setMinValue, setMaxValue, clearRange }}>
      {children}
    </RangeContext.Provider>
  );
};

export const useRangeContext = () => {
  const context = useContext(RangeContext);
  if (!context) {
    throw new Error('useRangeContext must be used within a RangeProvider');
  }
  return context;
};