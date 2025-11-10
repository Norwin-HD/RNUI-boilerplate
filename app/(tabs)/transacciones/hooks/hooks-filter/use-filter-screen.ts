import { useCategoryContext } from "@/src/features/shared/categories/CategoryContext";
import {
  FilterType,
  useFilter,
} from "@/src/features/transacciones/contexts/context-filter-transaction/FilterContext";
import { useRangeContext } from "@/src/features/transacciones/contexts/context-range/RangeContext";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { getRangeTime } from "./use-range-time";

//mantiene tipo y rango como estado local, deriva fechas automaticamente.
export const useFilterScreen = () => {
  const router = useRouter();
  const { appliedFilters, applyFilters } = useFilter();
  const { clear: clearCategories } = useCategoryContext();
  const { clearRange } = useRangeContext();

  // Estado local inicial desde filtros aplicados
  const [activeTypeTab, setActiveTypeTab] = useState<FilterType>(
    appliedFilters.type
  );
  const [activeRangeTimeTab, setActiveRangeTimeTab] = useState<string>(
    appliedFilters.range
  );

  // Rango de fechas editable por el calendario, inicializado desde el rango activo
  const [rangeDate, setRangeDate] = useState<[Date, Date] | null>( // si no hay rango, es null
    getRangeTime(activeRangeTimeTab)
  ); 

  // Cuando cambia el rango temporal, recalcular fechas automaticamente
  useEffect(() => {
    setRangeDate(getRangeTime(activeRangeTimeTab));
  }, [activeRangeTimeTab]);

  // Aplicar filtros y volver
  const handleApplyFilters = useCallback(() => {
    applyFilters({
      type: activeTypeTab,
      range: activeRangeTimeTab,
      dates: rangeDate,
    });
    router.back();
  }, [activeTypeTab, activeRangeTimeTab, rangeDate, applyFilters, router]);

  // Limpiar filtros a valores por defecto
  const handleClearFilters = useCallback(() => {
    setActiveTypeTab("all");
    setActiveRangeTimeTab("all");
    clearCategories();
    clearRange();
    applyFilters({ type: "all", range: "all", dates: null });
  }, [applyFilters, clearCategories, clearRange]);

  return {
    activeTypeTab,
    setActiveTypeTab,
    activeRangeTimeTab,
    setActiveRangeTimeTab,
    rangeDate,
    setRangeDate,
    handleApplyFilters,
    handleClearFilters,
  };
};
