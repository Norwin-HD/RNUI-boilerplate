import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

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

export const RangeProvider = ({ children }: RangeProviderProps) => {
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);

  const clearRange = useCallback(() => {
    setMinValue(null);
    setMaxValue(null);
  }, []);

  const value = useMemo(
    () => ({ minValue, maxValue, setMinValue, setMaxValue, clearRange }),
    [minValue, maxValue, clearRange]
  );

  return (
    <RangeContext.Provider value={value}>
      {children}
    </RangeContext.Provider>
  );
};

export const useRangeContext = () => {
  const context = useContext(RangeContext);
  if (!context) {
    throw new Error("useRangeContext must be used within a RangeProvider");
  }
  return context;
};
