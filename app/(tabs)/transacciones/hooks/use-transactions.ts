import { useMemo } from "react";
import transaccionesMackup from "../../../mackups/transactionsMockup";

export type TabKind = "Todas" | "Ingresos" | "Gastos";

export const useTransactions = (activeTab: TabKind) => {
  const filteredTransactions = useMemo(() => {
    switch (activeTab) {
      case "Ingresos":
        return transaccionesMackup.filter((t) => t.monto > 0);
      case "Gastos":
        return transaccionesMackup.filter((t) => t.monto < 0);
      default:
        return transaccionesMackup;
    }
  }, [activeTab]);

  return { filteredTransactions };
};
