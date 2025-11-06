import { useMemo } from 'react';

interface Transaction {
  id: number;
  categoria: string;
  monto: number;
  fecha: Date;
  imagen: string;
}

export const useTransactionTotals = (transactions: Transaction[]) => {
  return useMemo(() => {
    const totalIncome = transactions
      .filter(transaction => transaction.monto > 0)
      .reduce((sum, transaction) => sum + transaction.monto, 0);

    const totalExpenses = transactions
      .filter(transaction => transaction.monto < 0)
      .reduce((sum, transaction) => sum + Math.abs(transaction.monto), 0);

    return { totalIncome, totalExpenses };
  }, [transactions]);
};