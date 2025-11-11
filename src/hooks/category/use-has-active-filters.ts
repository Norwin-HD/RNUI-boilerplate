import { useCategoryContext } from "@/src/stores/categories/CategoryContext";
import { useFilter } from "@/src/stores/categories/FilterContext";
import { useRangeContext } from "@/src/stores/transactions/RangeContext";

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
