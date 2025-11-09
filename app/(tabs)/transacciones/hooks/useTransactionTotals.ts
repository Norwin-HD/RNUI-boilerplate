import { useMemo } from "react";

export interface Transaction {
  id: number;
  categoria: string;
  monto: number; // positivo = ingreso, negativo = gasto
  fecha: Date;
  imagen: string;
}

export const useTransactionTotals = (transactions: readonly Transaction[]) => {
  return useMemo(() => {
    let income = 0;
    let expenses = 0;
    for (const t of transactions) {
      if (t.monto > 0) income += t.monto;
      else if (t.monto < 0) expenses += Math.abs(t.monto);
    }
    return { totalIncome: income, totalExpenses: expenses };
  }, [transactions]);
};
