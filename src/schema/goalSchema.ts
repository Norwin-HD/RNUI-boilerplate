import { z } from "zod";

const DateRangeSchema = z.object({
  start: z.date().nullable(),
  end: z.date().nullable(),
}).refine((range) => {
  if (range.start && range.end) {
    return range.start <= range.end;
  }
  return true;
}, {
  message: "La fecha de inicio debe ser anterior a la fecha de fin",
});

export const GoalSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  totalAmount: z.number().positive("El monto debe ser un número positivo"),
  currentAmount: z.number().nonnegative("El monto actual no puede ser negativo").optional(),
  deadline: DateRangeSchema.refine((range) => {
    if (range.start && range.end) {
      const now = new Date();
      return range.end > now;
    }
    return true;
  }, {
    message: "La fecha límite debe ser en el futuro",
  }),
  category: z.object({
    name: z.string(),
    icon: z.string(),
  }),
}).refine((data) => {
  // Si currentAmount está definido, no puede ser mayor que totalAmount
  if (data.currentAmount !== undefined && data.currentAmount > data.totalAmount) {
    return false;
  }
  return true;
}, {
  message: "El monto actual no puede ser mayor al monto objetivo",
  path: ["currentAmount"], // Esto hará que el error aparezca en el campo currentAmount
});
