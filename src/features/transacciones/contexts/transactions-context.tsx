import { categories } from "@/app/mockups/categories-filter";
import transaccionesMockup from "@/app/mockups/transactionsMockup";
import React, { createContext, ReactNode, useContext, useState } from "react";

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

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, setTransactions }}>
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