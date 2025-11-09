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
  type: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: NewTransaction) => void;
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
    setTransactions([
      ...transactions,
      {
        ...transaction,
        id: transactions.length + 1,
        // Keep both imagen and imageUri in new items to remain compatible
        imagen: (transaction as any).imagen || (transaction as any).imageUri || "default",
        imageUri: (transaction as any).imageUri || (transaction as any).imagen || "default",
        categoria: transaction.categoria || "Otros",
        descripcion: transaction.descripcion || "",
      },
    ]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
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