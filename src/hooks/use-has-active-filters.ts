import { useCategoryContext } from "@/src/features/shared/categories/CategoryContext";
import { useFilter } from "@/src/features/transacciones/contexts/context-filter-transaction/FilterContext";
import { useRangeContext } from "@/src/features/transacciones/contexts/context-range/RangeContext";

export const useHasActiveFilters = () => {
  const { appliedFilters } = useFilter();
  const { minValue, maxValue } = useRangeContext();
  const { selectedCategories } = useCategoryContext();

  const hasActiveFilters =
    appliedFilters.type !== "all" ||
    appliedFilters.range !== "all" ||
    appliedFilters.dates !== null ||
    minValue !== null ||
    maxValue !== null ||
    selectedCategories.length > 0;

  return hasActiveFilters;
};
