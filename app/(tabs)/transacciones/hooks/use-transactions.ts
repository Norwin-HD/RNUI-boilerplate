import { useMemo } from "react";
import { useTransactions as useGlobalTransactions } from "../../../../src/features/transacciones/contexts/transactions-context";

export type TabKind = "Todas" | "Ingresos" | "Gastos";

export const useTransactions = (activeTab: TabKind) => {
  const { transactions } = useGlobalTransactions();

  const filteredTransactions = useMemo(() => {
    const baseTransactions = transactions;
    switch (activeTab) {
      case "Ingresos":
        return baseTransactions.filter((t) => t.type === "income");
      case "Gastos":
        return baseTransactions.filter((t) => t.type === "expense");
      default:
        return baseTransactions;
    }
  }, [activeTab, transactions]);

  return { filteredTransactions };
};
