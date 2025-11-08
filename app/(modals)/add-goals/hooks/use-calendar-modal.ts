import { useCallback, useState } from "react";
import { formatDateRange } from "../utils/format-date-range";

export const useCalendarModal = (
  // cargar el rango de fechas seleccionado
  onChangeRange: (range: [Date, Date] | null) => void
) => {
  // cambiar de estado visible al modal de calendario
  const [visible, setVisible] = useState(false);
  // controlar cuando el contenido del modal esta listo para mostrarse
  const [displayText, setDisplayText] = useState(formatDateRange(null)); 

  // aplicar el rango seleccionado y actualizar el texto mostrado
  const applyRange = useCallback( //
    (range: [Date, Date] | null) => {
      onChangeRange(range);
      setDisplayText(formatDateRange(range));
      setVisible(false);
    },
    [onChangeRange]
  );

  const syncDisplay = useCallback((range: [Date, Date] | null) => {
    setDisplayText(formatDateRange(range));
  }, []);

  return {
    visible,
    setVisible,
    displayText,
    applyRange,
    syncDisplay,
  };
};
