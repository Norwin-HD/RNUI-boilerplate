import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define la "forma" de tus filtros
interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  category: string;
  tipoDeTransaccion?: string;
  minimoMonto?: number;
  maximoMonto?: number;
}

// 2. Define la "forma" del contexto que compartirás
interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
}

// 3. Crea el Context con un valor inicial
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// 4. Crea el "Provider" que envolverá tus pantallas
// Este componente contendrá la lógica y el estado.
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<FilterState>({
    startDate: null,
    endDate: null,
    category: "all",
    tipoDeTransaccion: undefined,
    minimoMonto: undefined,
    maximoMonto: undefined,
  });

  // Función para actualizar los filtros de forma segura
  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// 5. Crea un Hook personalizado para usar el contexto fácilmente
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
