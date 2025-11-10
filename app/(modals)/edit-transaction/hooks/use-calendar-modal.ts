import { useCallback, useState } from "react";
import { formatDate } from "../utils/format-date-range";

export const useCalendarModal = (
  // cargar la fecha seleccionada
  onChangeDate: (date: Date | null) => void
) => {
  // cambiar de estado visible al modal de calendario
  const [visible, setVisible] = useState(false);
  // controlar cuando el contenido del modal esta listo para mostrarse
  const [displayText, setDisplayText] = useState(formatDate(null)); 

  // aplicar la fecha seleccionada y actualizar el texto mostrado
  const applyDate = useCallback( //
    (date: Date | null) => {
      onChangeDate(date);
      setDisplayText(formatDate(date));
      setVisible(false);
    },
    [onChangeDate]
  );

  const syncDisplay = useCallback((date: Date | null) => {
    setDisplayText(formatDate(date));
  }, []);

  return {
    visible,
    setVisible,
    displayText,
    applyDate,
    syncDisplay,
  };
};
