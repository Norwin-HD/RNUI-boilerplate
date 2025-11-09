import React, { createContext, ReactNode, useContext, useState } from "react";
import transaccionesMockup from "@/app/mockups/transactionsMockup";

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  descripcion?: string;
  type: string;
  imagen: string;
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
    transaccionesMockup as Transaction[]
  );

  const addTransaction = (transaction: NewTransaction) => {
    setTransactions([
      ...transactions,
      {
        ...transaction,
        id: transactions.length + 1,
  // Use the short key 'default' so the UI resolver can prefer a local
  // require(...) asset if available, falling back to ImageKit otherwise.
  imagen: transaction.imagen || "default",
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