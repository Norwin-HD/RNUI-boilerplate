import { z } from "zod";

export const GoalSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  totalAmount: z.number().positive("El monto debe ser un número positivo"),
  currentAmount: z.number().nonnegative("El monto actual no puede ser negativo").optional(),
  deadline: z.string().refine((date) => new Date(date) > new Date(), {
    message: "La fecha debe ser en el futuro",
  }),
  category: z.object({
    name: z.string(),
    icon: z.string(),
  }),
});
