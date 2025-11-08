import { useCallback, useState } from "react";
import { formatDateRange } from "../utils/format-date-range";

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
