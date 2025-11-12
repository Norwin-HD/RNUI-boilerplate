import { z } from "zod";

export const GoalSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  totalAmount: z.number().positive("El monto debe ser un número positivo"),
  currentAmount: z.number().nonnegative("El monto actual no puede ser negativo").optional(),
  deadline: z.string().min(1, "La fecha límite es requerida").refine((dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    return date > now;
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
  path: ["currentAmount"],
});
