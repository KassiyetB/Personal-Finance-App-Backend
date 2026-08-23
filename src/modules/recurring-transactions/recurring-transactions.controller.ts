import type { Request, Response } from "express";
import { createRecurringTransaction } from "./recurring-transactions.service.js";

export async function createRecurringTransactionController (
    req: Request,
    res: Response
) {
    try{
        const recurringTransaction = await createRecurringTransaction(req.body);
        res.status(201).json(recurringTransaction);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create recurring transaction"
        });
    }
}