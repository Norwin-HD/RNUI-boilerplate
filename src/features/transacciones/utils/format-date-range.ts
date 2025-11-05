export const formatDateRange = (dates: [Date, Date] | null): string => {
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

export default function _() {
  return null;
}
