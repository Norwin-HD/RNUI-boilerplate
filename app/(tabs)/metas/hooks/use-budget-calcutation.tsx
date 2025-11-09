import { useMemo } from 'react';
import { presupuestosMockup } from '../../../mockups/presupuestos-mockup';

export const useBudgetCalculations = () => {
  const { budgets } = presupuestosMockup;

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