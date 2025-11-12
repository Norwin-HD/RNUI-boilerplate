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

export const formatDateRange = (start: Date | null, end: Date | null): string => {
  if (!start && !end) {
    return "Seleccionar período";
  }
  if (start && end) {
    return `${start.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} - ${end.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  }
  if (start) {
    return `Desde ${start.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`;
  }
  return `Hasta ${end!.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;
};
