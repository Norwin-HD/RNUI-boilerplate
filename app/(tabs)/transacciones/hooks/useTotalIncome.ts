import { useMemo } from 'react';

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  imagen: string;
}

export const useTotalIncome = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions
      .filter(transaction => transaction.monto > 0)
      .reduce((sum, transaction) => sum + transaction.monto, 0);
  }, [transactions]);
};