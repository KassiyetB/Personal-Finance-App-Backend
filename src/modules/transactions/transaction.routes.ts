import { Router } from "express";
import { createTransactionController, getTransactionsController, getTransactionByIdController, updateTransactionController, deleteTransactionController } from "./transaction.controller.js";

const router = Router();

router.post("/", createTransactionController);
router.get("/", getTransactionsController);
router.get("/:id", getTransactionByIdController);
router.patch("/:id", updateTransactionController);
router.delete("/:id", deleteTransactionController);

export default router;