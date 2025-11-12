export interface IGoals {
  id: string;
  title: string;
  deadline: string;
  currentAmount: number;
  totalAmount: number;
  category: {
    name: string;
    icon: string;
  };
}

export interface IBudget {
  id: string;
  period: {
    start: Date | null;
    end: Date | null;
  };
  currentAmount: number;
  category: {
    name: string;
    icon: string;
  };
}
