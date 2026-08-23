import { Router } from "express";
import { createTransactionController, getTransactionsController, updateTransactionsController } from "./transaction.controller.js";

const router = Router();

router.post("/", createTransactionController);
router.get("/", getTransactionsController);
router.patch("/:id", updateTransactionsController);

export default router;