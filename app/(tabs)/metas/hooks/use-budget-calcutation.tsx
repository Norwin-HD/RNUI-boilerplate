import { useMemo } from 'react';
import { useBudgetsContext } from '../../../../src/stores/budgets/index';
import { useTransactions } from '../../../../src/stores/transactions/transactions-context';

export const useBudgetCalculations = () => {
  const { budgets } = useBudgetsContext();
  const { transactions } = useTransactions();

  // Calcula el presupuesto total (suma de todos los currentAmount como límites)
  const totalBudget = useMemo(() => {
    return budgets.reduce((sum, budget) => sum + budget.currentAmount, 0);
  }, [budgets]);

  // Calcula el gasto total basado en transacciones reales
  const totalExpenses = useMemo(() => {
    let total = 0;

    // Para cada presupuesto, calcular gastos en su categoría y período
    budgets.forEach(budget => {
      const budgetCategory = budget.category.name;
      const budgetStart = budget.period.start;
      const budgetEnd = budget.period.end;

      // Filtrar transacciones que sean gastos en esta categoría
      const categoryExpenses = transactions.filter(transaction =>
        transaction.type === 'expense' &&
        transaction.categoria === budgetCategory
      );

      // Filtrar por período del presupuesto si está definido
      const periodExpenses = categoryExpenses.filter(transaction => {
        if (!budgetStart || !budgetEnd) return true; // Si no hay período definido, incluir todas

        const transactionDate = new Date(transaction.fecha);
        return transactionDate >= budgetStart && transactionDate <= budgetEnd;
      });

      // Sumar los montos absolutos de los gastos en este período
      const categoryTotal = periodExpenses.reduce((sum, transaction) =>
        sum + Math.abs(transaction.monto), 0
      );

      total += categoryTotal;
    });

    return total;
  }, [budgets, transactions]);

  // Calcula el progreso general (porcentaje gastado del presupuesto total)
  const overallProgress = useMemo(() => {
    if (totalBudget === 0) return 0;
    return (totalExpenses / totalBudget) * 100;
  }, [totalBudget, totalExpenses]);

  return {
    totalBudget,
    totalExpenses,
    overallProgress,
  };
};