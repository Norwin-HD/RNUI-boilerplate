import React, { createContext, useContext, useState } from "react";
import { metasMockup } from "../../../../app/mockups/metas-mockup";
import { IGoals } from "../types";

interface GoalsContextType {
  goals: IGoals[];
  addGoal: (goal: IGoals) => void;
  updateGoal: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
  editGoal: (id: string, data: Partial<IGoals>) => void;
}

export const GoalsContext = createContext<GoalsContextType | undefined>(
  undefined
);

// Transform the mockup data to match the IGoals interface
const initialGoals: IGoals[] = metasMockup.goals.map((goal) => ({
  ...goal,
  id: goal.id.toString(),
  deadline: goal.deadline.toISOString(),
  category: {
    name: "Otros",
    icon: "package", 
  },
}));

export const useGoalsContext = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoalsContext must be used within GoalsProvider");
  }
  return context;
};

export const GoalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [goals, setGoals] = useState<IGoals[]>(initialGoals);

  const addGoal = (goal: IGoals) => {
    setGoals((prevGoals) => [goal, ...prevGoals]);
  };

  const updateGoal = (id: string, amount: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((g) =>
        g.id === id ? { ...g, currentAmount: Math.max(0, g.currentAmount + amount) } : g
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
  };

  const editGoal = (id: string, data: Partial<IGoals>) => {
    setGoals((prevGoals) =>
      prevGoals.map((g) => (g.id === id ? { ...g, ...data } : g))
    );
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal, editGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
