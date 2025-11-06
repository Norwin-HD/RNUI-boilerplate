import { useMemo } from "react";
import transaccionesMackup from "../../../mackups/transactionsMockup";

export const useTransactions = (activeTab: string) => {
  const filteredTransactions = useMemo(() => {
    if (activeTab === "Ingresos") {
      return transaccionesMackup.filter(t => t.monto > 0);
    } else if (activeTab === "Gastos") {
      return transaccionesMackup.filter(t => t.monto < 0);
    } else {
      return transaccionesMackup;
    }
  }, [activeTab]);

  return { filteredTransactions };
};
