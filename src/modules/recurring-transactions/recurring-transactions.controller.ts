import type { Request, Response } from "express";
import { createRecurringTransaction } from "./recurring-transactions.service.js";
import { createRecurringTransactionSchema } from "./recurring-transactions.schema.js";

export async function createRecurringTransactionController (
    req: Request,
    res: Response
) {
    try{
        const result = createRecurringTransactionSchema.safeParse(
            req.body
        );

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid recurring transaction data",
                errors: result.error.issues,
            });
        }

        const recurringTransaction = await createRecurringTransaction(result.data);
        res.status(201).json(recurringTransaction);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create recurring transaction"
        });
    }
}