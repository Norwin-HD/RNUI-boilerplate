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
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const initialState: AppliedFilters = {
  type: "all",
  range: "all",
  dates: null,
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [appliedFilters, setAppliedFilters] =
    useState<AppliedFilters>(initialState);

  const applyFilters = (filters: AppliedFilters) => {
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setAppliedFilters(initialState);
  };

  return (
    <FilterContext.Provider
      value={{ appliedFilters, applyFilters, clearFilters }}
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
