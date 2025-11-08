import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Definir tipos de filtro
export type FilterType = "all" | "income" | "expense";

export interface AppliedFilters {
  type: FilterType; // Tipo de transaccion
  range: string; // Rango amigable con date-fns
  dates: [Date, Date] | null; // Rango de fechas especifico
}

// Crear interfaz del contexto
interface FilterContextType {
  appliedFilters: AppliedFilters; // Filtros actualmente aplicados
  applyFilters: (filters: AppliedFilters) => void; // Funcion para aplicar filtros
  clearFilters: () => void; // Funcion para limpiar filtros
}

// crear contexto
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Estado inicial de los filtros
const initialState: AppliedFilters = {
  type: "all",
  range: "all",
  dates: null,
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {


  // Estado de los filtros
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialState);

  // Funciones para aplicar
  const applyFilters = useCallback((filters: AppliedFilters) => {
    setAppliedFilters(filters);
  }, []);

  // Funciones para limpiar
  const clearFilters = useCallback(() => {
    setAppliedFilters(initialState);
  }, []);

  // Crear valor del contexto
  const value = useMemo(
    () => ({ appliedFilters, applyFilters, clearFilters }),
    [appliedFilters, applyFilters, clearFilters]
  );

  return (
    <FilterContext.Provider value={value}>
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
