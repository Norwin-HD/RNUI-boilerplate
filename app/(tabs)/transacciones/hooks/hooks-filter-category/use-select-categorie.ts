import { categories } from "@/src/mockups/categories-filter";
import { useCallback, useState } from "react";

export interface UseSelectCategorieOptions {
  initialSelected?: string[];
}

export const useSelectCategorie = (opts?: UseSelectCategorieOptions) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    opts?.initialSelected ?? []
  );

  // Verificar si una categoria esta seleccionada
  const isSelected = useCallback(
    // Mantener funcion estable (Seleccionada)

    (categoryTitle: string) => {
      return selectedCategories.includes(categoryTitle);
    },
    [selectedCategories]
  );

  // Alternar seleccion de una categoria
  const toggleCategory = useCallback((categoryTitle: string) => {

    // Mantener funcion estable (Alternar)
    setSelectedCategories((prev) =>
      prev.includes(categoryTitle) ? prev.filter((item) => item !== categoryTitle) : [...prev, categoryTitle]
    );
  }, []);

  // Limpiar la categorias seleccionadas
  const clear = useCallback(() => setSelectedCategories([]), []);

  return {
    categories,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    isSelected,
    clear,
  };
};
