import React, { createContext, useContext } from "react";
import { useSelectCategorie } from "./use-select-categorie";

export interface SharedCategoryContextValue {
  categories: any[];
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  toggleCategory: (title: string) => void;
  selectCategory: (title: string) => void;
  isSelected: (title: string) => boolean;
  clear: () => void;
}

const CategoryContext = createContext<SharedCategoryContextValue | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{
  children: React.ReactNode;
  /** When true, toggleCategory will behave as single-select (selectCategory) */
  singleSelect?: boolean;
}> = ({ children, singleSelect = false }) => {
  const hook = useSelectCategorie();

  const toggle = singleSelect
    ? ((hook as any).selectCategory as (title: string) => void)
    : hook.toggleCategory;

  return (
    <CategoryContext.Provider
      value={{
        categories: hook.categories,
        selectedCategories: hook.selectedCategories,
        setSelectedCategories: hook.setSelectedCategories,
        toggleCategory: toggle,
        selectCategory: (hook as any).selectCategory,
        isSelected: hook.isSelected,
        clear: hook.clear,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategoryContext must be used within CategoryProvider");
  return ctx;
};

export default CategoryContext;
