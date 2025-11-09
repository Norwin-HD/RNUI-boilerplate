import { useContext, useMemo } from "react";
import { GoalsContext } from "@/src/features/add-goals/contexts";

export const useGoalsCalculations = () => {
  const { goals } = useContext(GoalsContext);

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
