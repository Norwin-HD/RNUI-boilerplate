import { useState } from "react";

export const useCalendarModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  } | null>(null);

  const handleApplyDate = (dates: { startDate?: Date; endDate?: Date }) => {
    setDateRange(dates);
    setModalVisible(false);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formattedDateRange =
    dateRange?.startDate && dateRange?.endDate
      ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
      : "Seleccionar una fecha";

  return {
    modalVisible,
    setModalVisible,
    showContent,
    setShowContent,
    handleApplyDate,
    formattedDateRange,
  };
};
