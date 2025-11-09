import { z } from "zod";

export const ExpenseSchema = z.object({
  monto: z.number().positive("El monto debe ser un número positivo"),
  fecha: z.date({
    required_error: "La fecha es requerida",
    invalid_type_error: "Fecha inválida",
  }),
  categoria: z.string().optional(),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
});

export const IncomeSchema = z.object({
  monto: z.number().positive("El monto debe ser un número positivo"),
  fecha: z.date({
    required_error: "La fecha es requerida",
    invalid_type_error: "Fecha inválida",
  }),
  categoria: z.string().optional(),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
});

export const TransactionSchema = z.object({
  id: z.string(),
  categoria: z.string().optional(),
  monto: z.number().positive(),
  fecha: z.date(),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
  type: z.enum(["income", "expense"]),
});