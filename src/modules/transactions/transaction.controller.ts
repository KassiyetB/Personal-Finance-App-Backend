import type { Request, Response } from "express";
import { createTransaction } from "./transaction.service.js";

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