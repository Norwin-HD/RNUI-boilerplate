import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string(),
  categoria: z.string().optional(),
  monto: z.number().positive(),
  fecha: z.date(),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
  type: z.enum(["income", "expense"]),
});