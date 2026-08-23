import { Router } from "express";
import { createTransactionController, getTransactionsController, getTransactionByIdController, updateTransactionsController } from "./transaction.controller.js";

const router = Router();

router.post("/", createTransactionController);
router.get("/", getTransactionsController);
router.get("/:id", getTransactionByIdController);
router.patch("/:id", updateTransactionsController);

export default router;