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
