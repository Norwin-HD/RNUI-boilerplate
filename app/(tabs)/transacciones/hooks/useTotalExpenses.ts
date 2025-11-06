import { useMemo } from 'react';

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  imagen: string;
}

export const useTotalExpenses = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions
      .filter(transaction => transaction.monto < 0)
      .reduce((sum, transaction) => sum + Math.abs(transaction.monto), 0);
  }, [transactions]);
};