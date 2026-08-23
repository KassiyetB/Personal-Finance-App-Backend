import { Router } from "express";
import { createTransactionController, getTransactionsController } from "./transaction.controller.js";

const router = Router();

router.post("/", createTransactionController);
router.get("/", getTransactionsController);

export default router;