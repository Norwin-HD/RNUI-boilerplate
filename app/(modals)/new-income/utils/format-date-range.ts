export const formatDate = (date: Date | null): string => {
  if (!date) {
    return "Seleccionar una fecha";
  }

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
