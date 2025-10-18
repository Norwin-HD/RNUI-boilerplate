import { useEffect, useState } from "react";
import transaccionesMackup from "../mackups/transactionsMockup";

export const useTransactions = (activeTab: string) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transaccionesMackup);

  useEffect(() => {
    if (activeTab === "Ingresos") {
      setFilteredTransactions(transaccionesMackup.filter(t => t.monto > 0));
    } else if (activeTab === "Gastos") {
      setFilteredTransactions(transaccionesMackup.filter(t => t.monto < 0));
    } else {
      setFilteredTransactions(transaccionesMackup);
    }
  }, [activeTab]);

  return { filteredTransactions };
};
