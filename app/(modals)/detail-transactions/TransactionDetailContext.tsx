import React, { createContext, ReactNode, useContext } from "react";

export type TransactionDetail = {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date | string;
  descripcion?: string;
  imagen?: string;
  imageUri?: string;
  type?: string;
};

const TransactionDetailContext = createContext<TransactionDetail | null>(null);

export const TransactionDetailProvider = ({
  transaction,
  children,
}: {
  transaction: TransactionDetail | null;
  children: ReactNode;
}) => {
  return (
    <TransactionDetailContext.Provider value={transaction}>
      {children}
    </TransactionDetailContext.Provider>
  );
};

export const useTransactionDetail = () => {
  return useContext(TransactionDetailContext);
};

export default TransactionDetailContext;
