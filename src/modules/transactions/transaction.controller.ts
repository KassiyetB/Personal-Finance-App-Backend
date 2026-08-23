import type { Request, Response } from "express";
import { 
    createTransaction, 
    getTransactions, 
    getTransactionById, 
    updateTransaction, 
    deleteTransaction }
from "./transaction.service.js";

import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionIdSchema,
  transactionQuerySchema,
} from "./transaction.schema.js";
import { pick } from "zod/mini";

export async function createTransactionController(
    req: Request, 
    res: Response
) {
    try{
        const result = createTransactionSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid transaction data",
                errors: result.error.issues,
            });
        }
        const transaction = await createTransaction(result.data);
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
        const result = transactionQuerySchema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid transaction query",
                errors: result.error.issues,
            });
        }

        const { userId, month } = result.data;

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

export async function getTransactionByIdController(
    req: Request,
    res: Response
) {
    try {
        const idResult = transactionIdSchema.safeParse(req.params);

        if (!idResult.success) {
            return res.status(400).json({
                message: "Invalid transaction ID",
                errors: idResult.error.issues,
            });
        }

        const queryResult = transactionQuerySchema
            .pick({
                userId: true,
            })
            .safeParse(req.query);

        if (!queryResult.success) {
            return res.status(400).json({
                message: "Invalid userId",
                errors: queryResult.error.issues,
            });
        }

        const transaction = await getTransactionById(
            idResult.data.id,
            queryResult.data.userId,
        )
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }
        res.status(200).json(transaction);
    } catch(error){
        res.status(500).json({
            message: "Failed to find transaction",
        });
    }
}

export async function updateTransactionController(
    req: Request,
    res: Response
) {
    try{
        const idResult = transactionIdSchema.safeParse(req.params);

        if (!idResult.success) {
            return res.status(400).json({
                message: "Invalid transaction ID",
                errors: idResult.error.issues,
            });
        }

        const queryResult = transactionQuerySchema
            .pick({
                userId: true,
            })
            .safeParse(req.query);

        if (!queryResult.success) {
            return res.status(400).json({
                message: "Invalid userId",
                errors: queryResult.error.issues,
            });
        }

        const bodyResult = updateTransactionSchema.safeParse(
            req.body,
        );

        if (!bodyResult.success) {
            return res.status(400).json({
                message: "Invalid transaction data",
                errors: bodyResult.error.issues,
            });
        }

        const transaction = await updateTransaction(
            idResult.data.id,
            queryResult.data.userId,
            bodyResult.data
        )
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }
        res.status(200).json(transaction);
    } catch(error){
        res.status(500).json({
            message: "Failed to update transaction",
        });
    }
}

export async function deleteTransactionController(
    req: Request,
    res: Response
) {
    try{
        const idResult = transactionIdSchema.safeParse(req.params);

        if (!idResult.success) {
            return res.status(400).json({
                message: "Invalid transaction ID",
                errors: idResult.error.issues,
            });
        }

        const queryResult = transactionQuerySchema
            .pick({
                userId: true,
            })
            .safeParse(req.query);

        if (!queryResult.success) {
            return res.status(400).json({
                message: "Invalid userId",
                errors: queryResult.error.issues,
            });
        }

        const transaction = await deleteTransaction(
            idResult.data.id,
            queryResult.data.userId,
        );

        if (!transaction) {
        return res.status(404).json({
            message: "Transaction not found",
        });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);

        res.status(500).json({
        message: "Failed to delete transaction",
        });
    }
    
    
}