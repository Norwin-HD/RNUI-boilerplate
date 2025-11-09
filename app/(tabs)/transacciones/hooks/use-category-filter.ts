import { useCallback, useMemo, useState } from "react";

export interface NameFilterMetrics {
  total: number;
  filtered: number;
  hasSearch: boolean;
  isEmpty: boolean;
}

export interface NameFilterItem {
  name?: string;
  title?: string;
  [key: string]: any; // permitir campos adicionales sin romper tipado
}

export interface UseNameFilterResult<T extends NameFilterItem> {
  data: T[]; // datos filtrados
  all: T[]; // datos originales
  term: string; // termino actual
  metrics: NameFilterMetrics;
  setTerm: (term: string) => void;
  clear: () => void;
  setData: (data: T[]) => void;
}

export const useNameFilter = <T extends NameFilterItem>(
  initialData: T[] = []
): UseNameFilterResult<T> => {
  const [term, setTerm] = useState("");
  const [all, setAll] = useState<T[]>(initialData);

  const data = useMemo(() => {
    const trimmed = term.trim();
    if (!trimmed) return all;
    const lower = trimmed.toLowerCase();
    return all.filter(
      (item) =>
        item.name?.toLowerCase().includes(lower) ||
        item.title?.toLowerCase().includes(lower)
    );
  }, [all, term]);

  const metrics = useMemo<NameFilterMetrics>(
    () => ({
      total: all.length,
      filtered: data.length,
      hasSearch: term.length > 0,
      isEmpty: data.length === 0,
    }),
    [all.length, data.length, term.length]
  );

  const setData = useCallback((next: T[]) => setAll(next), []);
  const clear = useCallback(() => setTerm(""), []);

  return {
    data,
    all,
    term,
    metrics,
    setTerm,
    clear,
    setData,
  };
};

export default useNameFilter;
