import type { Request, Response } from "express";
import { createTransaction, getTransactions } from "./transaction.service.js";

export async function createTransactionController(
    req: Request, 
    res: Response
) {
    try{
        const transaction = await createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create transaction"
        });
    }
}


export async function getTransactionsController(
    req: Request,
    res: Response
) {
    try {
        const userId = req.query.userId as string;
        const month = req.query.month as string | undefined;
        if (!userId) {
            return res.status(400).json({
                message: "userId is required",
            });
        }

        const transactions = await getTransactions(
            userId,
            month
        );
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get transactions"
        });
    }
}