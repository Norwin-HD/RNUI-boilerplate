import { useCallback, useMemo, useState } from 'react';

export interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  imagen: string;
}

const useRangeFilter = (initialData: Transaction[] = []) => {
  const [minValue, setMinValue] = useState<number | null>(null);
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [data, setData] = useState<Transaction[]>(initialData);

  // Filtrar datos por rango de monto
  const filteredData = useMemo(() => {
    if (minValue === null && maxValue === null) return data;
    const min = minValue ?? -Infinity;
    const max = maxValue ?? Infinity;
    return data.filter(item => {
      const amount = Math.abs(item.monto);
      return amount >= min && amount <= max;
    });
  }, [data, minValue, maxValue]);

  // Estadísticas de filtro
  const filterInfo = useMemo(() => {
    return {
      total: data.length,
      filtered: filteredData.length,
      hasFilter: minValue !== null || maxValue !== null,
      isEmpty: filteredData.length === 0
    };
  }, [data.length, filteredData.length, minValue, maxValue]);

  // Establecer rango
  const setRange = useCallback((min: number | null, max: number | null) => {
    setMinValue(min);
    setMaxValue(max);
  }, []);

  // Limpiar filtro
  const clearFilter = useCallback(() => {
    setMinValue(null);
    setMaxValue(null);
  }, []);

  return {
    data: filteredData,
    allData: data,
    minValue,
    maxValue,
    filterInfo,
    setRange,
    clearFilter,
    setData
  };
};

export default useRangeFilter;