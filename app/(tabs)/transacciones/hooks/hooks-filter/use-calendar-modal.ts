import { useCallback, useState } from "react";

const formatDateRange = (dates: [Date, Date] | null): string => {
  if (!dates) {
    return "Seleccionar una fecha";
  }
  const [startDate, endDate] = dates;

  const start = startDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const end = endDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return start === end ? start : `${start} - ${end}`;
};

export const useCalendarModal = (
  setDates: (dates: [Date, Date] | null) => void
) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(formatDateRange(null));

  const handleApplyDate = useCallback(
    (newDates: [Date, Date] | null) => {
      setDates(newDates);
      setDisplayedDate(formatDateRange(newDates));
      setModalVisible(false);
    },
    [setDates]
  );

  const updateDisplayedDates = useCallback((newDates: [Date, Date] | null) => {
    setDisplayedDate(formatDateRange(newDates));
  }, []);

  return {
    modalVisible,
    setModalVisible,
    showContent,
    setShowContent,
    handleApplyDate,
    displayedDate,
    updateDisplayedDates,
  };
};
