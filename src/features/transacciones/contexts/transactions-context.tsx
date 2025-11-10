import { categories } from "@/app/mockups/categories-filter";
import transaccionesMockup from "@/app/mockups/transactionsMockup";
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useFilter } from "./context-filter-transaction/FilterContext";
import { useRangeContext } from "./context-range/RangeContext";
import { useCategoryContext } from "@/src/features/transacciones/contexts/contexts-category/CategoryContext";

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  descripcion?: string;
  type: string;
  imagen: string;
  imageUri?: string; 
}

interface NewTransaction {
  categoria?: string;
  monto: number;
  fecha: Date;
  descripcion?: string;
  imagen?: string;
  imageUri?: string;
  type: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: NewTransaction) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  filteredTransactions: Transaction[]; // Add filteredTransactions to the context type
}


const TransactionsContext = createContext<TransactionsContextType | null>(null);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    (transaccionesMockup as any[]).map((t) => ({
      ...t,
      imagen: (t.imagen as string) ?? (t.imageUri as string) ?? "default",
      imageUri: (t.imageUri as string) ?? (t.imagen as string) ?? "default",
      fecha: new Date(t.fecha),
    })) as Transaction[]
  );

  const addTransaction = (transaction: NewTransaction) => {
    const maxId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) : 0;
    
    // Find the imageUri for the selected category
    const categoryData = categories.find(cat => cat.title === transaction.categoria);
    const categoryImageUri = categoryData?.imageUri || "package";
    
    setTransactions([
      {
        ...transaction,
        id: maxId + 1,
        // Preserve the user-selected image, or use category imageUri if no image was selected
        imagen: transaction.imagen || categoryImageUri,
        imageUri: transaction.imageUri || categoryImageUri,
        categoria: transaction.categoria || "Otros",
        descripcion: transaction.descripcion || "",
      },
      ...transactions,
    ]);
  };

  // Filtering logic
  const { appliedFilters } = useFilter();
  const { minValue, maxValue } = useRangeContext();
  const { selectedCategories } = useCategoryContext();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Filter by type
      if (appliedFilters.type !== "all" && transaction.type !== appliedFilters.type) {
        return false;
      }

      // Filter by date range
      if (appliedFilters.dates) {
        const [startDate, endDate] = appliedFilters.dates;
        const transactionDate = new Date(transaction.fecha);

        const filterStartDate = new Date(startDate);
        filterStartDate.setHours(0, 0, 0, 0);

        const filterEndDate = new Date(endDate);
        filterEndDate.setHours(23, 59, 59, 999);

        if (transactionDate < filterStartDate || transactionDate > filterEndDate) {
          return false;
        }
      }

      // Filter by min/max value
      if (minValue !== null && transaction.monto < minValue) {
        return false;
      }
      if (maxValue !== null && transaction.monto > maxValue) {
        return false;
      }

      // Filter by categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(transaction.categoria)) {
        return false;
      }

      return true;
    });
  }, [transactions, appliedFilters, minValue, maxValue, selectedCategories]);

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, setTransactions, filteredTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
};