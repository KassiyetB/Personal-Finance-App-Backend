import { Router } from "express";
import { createTransactionController } from "./transaction.controller.js";

const router = Router();

router.post("/", createTransactionController);

export default router;