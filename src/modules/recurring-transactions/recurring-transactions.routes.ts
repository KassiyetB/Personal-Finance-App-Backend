import { Router } from "express";
import { createRecurringTransactionController } from "./recurring-transactions.controller.js";

const router = Router();

router.post("/", createRecurringTransactionController);
// router.get("/", );
// router.get("/:id", );
// router.patch("/:id", );
// router.delete("/:id", );

export default router;