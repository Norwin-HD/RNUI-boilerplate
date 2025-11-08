import React, { createContext, useContext, useMemo } from "react";
import { useSelectCategorie } from "../../hooks/hooks-filter-category/use-select-categorie";

interface CategoryContextValue {
  categories: any[]; 
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  toggleCategory: (title: string) => void;
  isSelected: (title: string) => boolean;
  clear: () => void;
}

const CategoryContext = createContext<CategoryContextValue | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const hook = useSelectCategorie();

  const value = useMemo<CategoryContextValue>(
    () => ({
      categories: hook.categories,
      selectedCategories: hook.selectedCategories,
      setSelectedCategories: hook.setSelectedCategories,
      toggleCategory: hook.toggleCategory,
      isSelected: hook.isSelected,
      clear: hook.clear,
    }),
    [
      hook.categories,
      hook.selectedCategories,
      hook.setSelectedCategories,
      hook.toggleCategory,
      hook.isSelected,
      hook.clear,
    ]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx)
    throw new Error("useCategoryContext must be used within CategoryProvider");
  return ctx;
};
