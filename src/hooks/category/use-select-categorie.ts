import { categories } from "@/src/mockups/categories-filter";
import { useCallback, useState } from "react";

export interface UseSelectCategorieOptions {
  initialSelected?: string[];
}

export const useSelectCategorie = (opts?: UseSelectCategorieOptions) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    opts?.initialSelected ?? []
  );

  const isSelected = useCallback(
    (categoryTitle: string) => selectedCategories.includes(categoryTitle),
    [selectedCategories]
  );

  const toggleCategory = useCallback((categoryTitle: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryTitle)
        ? prev.filter((item) => item !== categoryTitle)
        : [...prev, categoryTitle]
    );
  }, []);

  const selectCategory = useCallback((categoryTitle: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryTitle) ? [] : [categoryTitle]
    );
  }, []);

  const clear = useCallback(() => setSelectedCategories([]), []);

  return {
    categories,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    selectCategory,
    isSelected,
    clear,
  };
};
