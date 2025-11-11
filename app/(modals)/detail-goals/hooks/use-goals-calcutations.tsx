import { GoalsContext } from "@/src/features/add-goals/contexts";
import { useContext, useMemo } from "react";

export const useGoalsCalculations = () => {
  const goalsContext = useContext(GoalsContext);

  if (!goalsContext) {
    throw new Error("useGoalsCalculations must be used within a GoalsProvider");
  }

  const { goals } = goalsContext;

  // Calcula el progreso total (suma de todos los currentAmount)
  const totalProgress = useMemo(() => {
    return goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  }, [goals]);

  // Calcula el objetivo total (suma de todos los totalAmount)
  const totalGoals = useMemo(() => {
    return goals.reduce((sum, goal) => sum + goal.totalAmount, 0);
  }, [goals]);

  return {
    totalProgress,
    totalGoals,
  };
};
