import { useMemo, useState } from "react";
import categories from "../../../../mackups/categories-filter";

// Hook para buscar
export const useCategories = () => {

  // Estado para la consulta de busqueda
  const [query, setQuery] = useState("");

  // Filtrar categorias basado en la consulta
  const filteredData = useMemo(() => {
    return categories.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return { filteredCategories: filteredData, setQuery };
};
