import { useMemo } from 'react';
import { presupuestosMackup } from '../../../mackups/presupuestos-mackup'; 

export const useBudgetCalculations = () => {
  const { budgets } = presupuestosMackup;

  // Calcula el presupuesto total (suma de todos los totalAmount)
  const totalBudget = useMemo(() => {
    return budgets.reduce((sum, budget) => sum + budget.totalAmount, 0);
  }, [budgets]);

  // Calcula el gasto total (suma de todos los currentAmount)
  const totalExpenses = useMemo(() => {
    return budgets.reduce((sum, budget) => sum + budget.currentAmount, 0);
  }, [budgets]);

  return {
    totalBudget,
    totalExpenses,
  };
};