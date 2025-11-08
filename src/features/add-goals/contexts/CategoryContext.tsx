import React, { createContext, useCallback, useContext, useState } from "react";

interface CategoryContextType {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  toggleCategory: (title: string) => void;
  isSelected: (title: string) => boolean;
  clear: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = useCallback((title: string) => {
    setSelectedCategories((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  }, []);

  const isSelected = useCallback(
    (title: string) => selectedCategories.includes(title),
    [selectedCategories]
  );

  const clear = useCallback(() => setSelectedCategories([]), []);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        toggleCategory,
        isSelected,
        clear,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
};