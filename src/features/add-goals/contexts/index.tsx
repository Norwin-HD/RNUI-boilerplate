import React, { createContext, useContext, useState } from "react";
import { metasMockup } from "../../../../app/mockups/metas-mockup";
import { IGoals } from "../types";

interface GoalsContextType {
  goals: IGoals[];
  addGoal: (goal: IGoals) => void;
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
    icon: "package", // default icon
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

  return (
    <GoalsContext.Provider value={{ goals, addGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
