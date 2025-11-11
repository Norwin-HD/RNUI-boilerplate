import { categories } from "@/src/mockups/categories-filter";
import { useMemo, useState } from "react";

// Hook para buscar
export const useCategories = () => {

  // Estado para la consulta de busqueda
  const [query, setQuery] = useState(""); 

  // Filtrar categorias basado en la consulta
  const filteredData = useMemo(() => {
    return categories.filter((item) => // Metodo para filtrar el arreglo
      item.title.toLowerCase().includes(query.toLowerCase()) // Verificar si el titulo esta presente
    );
  }, [query]);

  return { filteredCategories: filteredData, setQuery };
};
