import { z } from "zod";

export const createTransactionSchema = z.object({
  userId: z.uuid(),

  categoryId: z.uuid(),

  type: z.enum(["INCOME", "EXPENSE"]),

  name: z.string().min(1).max(100),

  amount: z.number().positive(),

  date: z.coerce.date(),
});

export const updateTransactionSchema = z.object({
  categoryId: z.uuid().optional(),

  type: z.enum(["INCOME", "EXPENSE"]).optional(),

  name: z.string().min(1).max(100).optional(),

  amount: z.number().positive().optional(),

  date: z.coerce.date().optional(),
});

export const transactionIdSchema = z.object({
  id: z.uuid(),
});

export const transactionQuerySchema = z.object({
  userId: z.uuid(),

  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .optional(),
});



export type CreateTransactionInput =
    z.infer<typeof createTransactionSchema>;

export type UpdateTransactionInput =
    z.infer<typeof updateTransactionSchema>;