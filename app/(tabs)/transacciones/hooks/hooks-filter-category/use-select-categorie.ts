import { useState } from "react";
import categories from "../../mackups/categories-filter";

export const useSelectCategorie = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryTitle: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryTitle)

      ? selectedCategories.filter((item) => item !== categoryTitle) // Remover

      : [...selectedCategories, categoryTitle]; // Agregar
      
    setSelectedCategories(newSelectedCategories);
    console.log("Categorías seleccionadas:", newSelectedCategories);
  };

  return {
    selectedCategories,
    toggleCategory,
    categories,
    setSelectedCategories,
  };
};
