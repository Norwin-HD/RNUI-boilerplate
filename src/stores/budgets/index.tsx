import { presupuestosMockup } from "@/src/mockups/presupuestos-mockup";
import { IBudget } from "@/src/types/index";
import React, { createContext, useContext, useState } from "react";

interface BudgetsContextType {
  budgets: IBudget[];
  addBudget: (budget: IBudget) => void;
  updateBudget: (id: string, amount: number) => void;
  deleteBudget: (id: string) => void;
  editBudget: (id: string, data: Partial<IBudget>) => void;
}

export const BudgetsContext = createContext<BudgetsContextType | undefined>(
  undefined
);

const initialBudgets: IBudget[] = presupuestosMockup.budgets.map((budget) => ({
  ...budget,
  id: budget.id.toString(),
  period: { start: null, end: null }, 
  category: {
    name: budget.category || "Otros",
    icon: "package",
  },
}));

export const useBudgetsContext = () => {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw new Error("useBudgetsContext must be used within BudgetsProvider");
  }
  return context;
};

export const BudgetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [budgets, setBudgets] = useState<IBudget[]>(initialBudgets);

  const addBudget = (budget: IBudget) => {
    setBudgets((prevBudgets) => [budget, ...prevBudgets]);
  };

  const updateBudget = (id: string, amount: number) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((b) =>
        b.id === id ? { ...b, currentAmount: Math.max(0, b.currentAmount + amount) } : b
      )
    );
  };

  const deleteBudget = (id: string) => {
    setBudgets((prevBudgets) => prevBudgets.filter((b) => b.id !== id));
  };

  const editBudget = (id: string, data: Partial<IBudget>) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
  };

  return (
    <BudgetsContext.Provider value={{ budgets, addBudget, updateBudget, deleteBudget, editBudget }}>
      {children}
    </BudgetsContext.Provider>
  );
};