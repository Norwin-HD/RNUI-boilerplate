export const getRangeTime = (range: string): [Date, Date] | null => {
  const today = new Date();
  switch (range) {
    case "Hoy":
      today.setHours(0, 0, 0, 0);
      return [today, today];
    case "Ultima semana": {
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      return [lastWeek, today];
    }
    case "Este mes": {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      return [firstDayOfMonth, today];
    }
    case "all":
    default:
      return null;
  }
};
