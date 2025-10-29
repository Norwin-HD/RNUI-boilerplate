import { useEffect, useState } from "react";

const useRangeTime = (activeTab: string) => {
  const [FilteredRangeTime, setFilteredRangeTime] = useState("Hoy");
  const [dates, setDates] = useState<{ startDate?: Date; endDate?: Date }>({});

  useEffect(() => {
    const today = new Date();
    if (activeTab === "Ultima semana") {
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      setDates({ startDate: lastWeek, endDate: today });
      setFilteredRangeTime("Ultima semana");
    } else if (activeTab === "Este mes") {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      setDates({ startDate: firstDayOfMonth, endDate: today });
      setFilteredRangeTime("Este mes");
    } else {
      today.setHours(0, 0, 0, 0);
      setDates({ startDate: today, endDate: today });
      setFilteredRangeTime("Hoy");
    }
  }, [activeTab]);

  return { FilteredRangeTime, dates };
};

export default useRangeTime;
