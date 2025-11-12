import { z } from "zod";

/**
 * Schema básico para validación de presupuestos
 * Incluye validaciones básicas de estructura y lógica
 */
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

export const BudgetSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  totalAmount: z.number().positive("El monto debe ser un número positivo"),
  currentAmount: z.number().nonnegative("El monto actual no puede ser negativo").optional(),
  period: DateRangeSchema.refine((range) => {
    if (range.start && range.end) {
      const now = new Date();
      return range.end > now;
    }
    return true;
  }, {
    message: "El período debe ser en el futuro",
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

export const BudgetValidationSchema = z.object({
  currentAmount: z.number()
    .nonnegative("El monto actual no puede ser negativo")
    .optional(),
  period: DateRangeSchema
    .refine((range) => {
      if (range.start && range.end) {
        const now = new Date();
        const maxFutureDate = new Date();
        maxFutureDate.setFullYear(now.getFullYear() + 2);
        return range.end <= maxFutureDate;
      }
      return true;
    }, {
      message: "El período no puede exceder 2 años en el futuro",
    })
    .refine((range) => {
      if (range.start && range.end) {
        const diffTime = Math.abs(range.end.getTime() - range.start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 7; // Mínimo 1 semana
      }
      return true;
    }, {
      message: "El período mínimo debe ser de 1 semana",
    }),
  category: z.object({
    name: z.string()
      .min(1, "La categoría es requerida")
      .max(30, "El nombre de categoría no puede exceder 30 caracteres"),
    icon: z.string()
      .min(1, "El ícono es requerido"),
  }),
});