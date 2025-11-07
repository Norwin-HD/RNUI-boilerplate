
import { useMemo, useState } from 'react';

interface Item {
  name?: string;
  title?: string;
  [key: string]: any;
}

const useNameFilter = (initialData: Item[] = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Item[]>(initialData);

  // Filtrar datos por nombre
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const term = searchTerm.toLowerCase().trim();
    return data.filter(item =>
      item.name?.toLowerCase().includes(term) ||
      item.title?.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  // Estadísticas de búsqueda
  const searchInfo = useMemo(() => {
    return {
      total: data.length,
      filtered: filteredData.length,
      hasSearch: searchTerm.length > 0,
      isEmpty: filteredData.length === 0
    };
  }, [data.length, filteredData.length, searchTerm]);

  // Buscar
  const search = (term: string) => {
    setSearchTerm(term);
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    data: filteredData,
    allData: data,
    searchTerm,
    searchInfo,
    search,
    clearSearch,
    setData
  };
};

export default useNameFilter;