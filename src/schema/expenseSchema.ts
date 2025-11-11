import { z } from "zod";

export const ExpenseSchema = z.object({
  monto: z.number({
    required_error: "El monto es requerido",
    invalid_type_error: "El monto debe ser un número válido"
  })
  .positive("El monto debe ser mayor a cero")
  .max(999999.99, "El monto no puede ser mayor a $999,999.99")
  .refine((val) => val >= 0.01, "El monto mínimo es $0.01"),
  fecha: z.date({
    required_error: "La fecha es requerida",
    invalid_type_error: "Fecha inválida",
  })
  .refine((date) => {
    const today = new Date();
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return date <= endOfToday;
  }, "La fecha no puede ser futura")
  .refine((date) => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    return date >= minDate;
  }, "La fecha no puede ser anterior a un año"),
  categoria: z.string().optional(),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
});