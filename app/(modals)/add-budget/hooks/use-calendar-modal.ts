import { useCallback, useState } from "react";
import { formatDateRange } from "../utils/format-date-range";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export const useCalendarModal = (
  // cargar la fecha seleccionada
  onChangeDate: (date: DateRange) => void
) => {
  // cambiar de estado visible al modal de calendario
  const [visible, setVisible] = useState(false);
  // controlar cuando el contenido del modal esta listo para mostrarse
  const [displayText, setDisplayText] = useState(formatDateRange(null, null));

  // aplicar la fecha seleccionada y actualizar el texto mostrado
  const applyDate = useCallback( //
    (start: Date | null, end: Date | null) => {
      onChangeDate({ start, end });
      setDisplayText(formatDateRange(start, end));
      setVisible(false);
    },
    [onChangeDate]
  );

  const syncDisplay = useCallback((date: DateRange) => {
    setDisplayText(formatDateRange(date.start, date.end));
  }, []);

  return {
    visible,
    setVisible,
    displayText,
    applyDate,
    syncDisplay,
  };
};
