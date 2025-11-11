import { z } from "zod";

export const GoalSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  totalAmount: z.number().positive("El monto debe ser un número positivo"),
  currentAmount: z.number().nonnegative("El monto actual no puede ser negativo").optional(),
  deadline: z.string()
    .min(1, "La fecha es requerida")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
    }, {
      message: "La fecha debe ser en el futuro",
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
