import React, { createContext, ReactNode, useContext, useState } from "react";

export type FilterType = "all" | "income" | "expense";

export interface AppliedFilters {
  type: FilterType;
  range: string;
  dates: [Date, Date] | null;
}

interface FilterContextType {
  appliedFilters: AppliedFilters;
  applyFilters: (filters: AppliedFilters) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    type: "all",
    range: "all",
    dates: null,
  });

  const applyFilters = (filters: AppliedFilters) => {
    setAppliedFilters(filters);
  };

  return (
    <FilterContext.Provider
      value={{ appliedFilters, applyFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
