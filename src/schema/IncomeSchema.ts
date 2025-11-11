import { z } from "zod";

export const IncomeSchema = z.object({
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
  }),
  categoria: z.string().optional(),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
});