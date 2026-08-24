import { z } from "zod";

export const createRecurringTransactionBodySchema = z.object({
    userId: z.uuid(),

    categoryId: z.uuid(),

    type: z.enum(["INCOME", "EXPENSE"]),

    name: z.string().min(1).max(100),

    amount: z.number().positive(),

    intervalMonths: z.number().int().min(1),

    startDate: z.coerce.date(),

    endDate: z.coerce.date().optional(),
}).refine(
    (data) => {
        if (!data.endDate) {
            return true;
        }

        return data.endDate >= data.startDate;
    },
    {
        message: "endDate must be after startDate",
        path: ["endDate"],
    }
);

export const updateRecurringTransactionBodySchema = z.object({
  categoryId: z.uuid().optional(),

  type: z.enum(["INCOME", "EXPENSE"]).optional(),

  name: z.string().min(1).max(100).optional(),

  amount: z.number().positive().optional(),

  intervalMonths: z.number().int().min(1).optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  active: z.boolean().optional(),
})
.refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }

      return data.endDate >= data.startDate;
    },
    {
      message: "endDate must be after startDate",
      path: ["endDate"],
    },
  );

export type CreateRecurringTransactionInput =
    z.infer<typeof createRecurringTransactionBodySchema>;

export type UpdateRecurringTransactionInput =
    z.infer<typeof updateRecurringTransactionBodySchema>;