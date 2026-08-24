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

export type CreateRecurringTransactionInput =
    z.infer<typeof createRecurringTransactionBodySchema>;