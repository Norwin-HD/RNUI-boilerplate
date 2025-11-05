import { useState } from "react";
import categories from "../../../../mackups/categories-filter";

// Hook para buscar
export const useCategories = () => {

  // Estado para la consulta de busqueda
  const [query, setQuery] = useState("");

  // Filtrar categorias basado en la consulta
  const filteredData = categories.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return { filteredCategories: filteredData, setQuery };
};
