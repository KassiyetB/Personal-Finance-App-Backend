import type { Request, Response } from "express";
import { 
    createTransaction, 
    getTransactions, 
    getTransactionById, 
    updateTransaction, 
    deleteTransaction }
from "./transaction.service.js";

import { generateTransactionsForMonth } from "./transaction.generator.js";
import { parse } from "node:path";

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
        const { userId, month } = req.query;

        const parsedMonth = month as string | undefined;

        if(parsedMonth){
            const[year, monthNumber] = parsedMonth.split("-").map(Number);

            await generateTransactionsForMonth(
                userId as string,
                year as number,
                monthNumber as number
            )
        }

        const transactions = await getTransactions(
            userId as string,
            parsedMonth
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
        const { id } = req.params;
        const { userId } = req.query;

        const transaction = await getTransactionById(
            id as string,
            userId as string,
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
    try {

        const { id } = req.params;
        const { userId } = req.query;

        const transaction = await updateTransaction(
            id as string,
            userId as string,
            req.body
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
        const { id } = req.params;
        const { userId } = req.query;

        const transaction = await deleteTransaction(
            id as string,
            userId as string,
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