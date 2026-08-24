import type { Request, Response } from "express";
import { 
    createRecurringTransaction,
    getRecurringTransactions,
    getRecurringTransactionById,
    updateRecurringTransaction 
} from "./recurring-transactions.service.js";

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

export async function getRecurringTransactionsController(
    req: Request,
    res: Response
) {
    try{
        const { userId } = req.query;
        const recurringTransactions = await getRecurringTransactions(userId as string);
        res.status(200).json(recurringTransactions);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get recurring transactions"
        });
    }
}

export async function getRecurringTransactionByIdController(
    req: Request,
    res: Response
) {
    try{
        const { id } = req.params;
        const { userId } = req.query;
        const recurringTransaction = await getRecurringTransactionById(id as string, userId as string);
        res.status(200).json(recurringTransaction);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Recurring transaction not found"
        });
    }
}

export async function updateRecurringTransactionController(
    req: Request,
    res: Response
) {
    try {
    
        const { id } = req.params;
        const { userId } = req.query;

        const recurringTransaction = await updateRecurringTransaction(
            id as string,
            userId as string,
            req.body
        )
        if (!recurringTransaction) {
            return res.status(404).json({
                message: "Recurring Transaction not found",
            });
        }
        res.status(200).json(recurringTransaction);
    } catch(error){
        res.status(500).json({
            message: "Failed to update recurring transaction",
        });
    }
}