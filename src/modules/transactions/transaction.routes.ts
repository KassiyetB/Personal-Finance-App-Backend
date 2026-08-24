import { Router } from "express";

import { 
    createTransactionController, 
    getTransactionsController, 
    getTransactionByIdController, 
    updateTransactionController, 
    deleteTransactionController 
} from "./transaction.controller.js";

import {
  createTransactionBodySchema,
  updateTransactionBodySchema,
  transactionParamsSchema,
  transactionQuerySchema,
  transactionUserQuerySchema
} from "./transaction.schema.js";

import { validate } from "#/middleware/validate.js";

const router = Router();

router.post(
    "/", 
    validate("body", createTransactionBodySchema), 
    createTransactionController
);

router.get(
    "/", 
    validate("query", transactionQuerySchema), 
    getTransactionsController
);

router.get(
    "/:id", 
    validate("params", transactionParamsSchema),
    validate("query", transactionUserQuerySchema),     
    getTransactionByIdController
);

router.patch(
    "/:id",
    validate("params", transactionParamsSchema),
    validate("query", transactionUserQuerySchema),
    validate("body", updateTransactionBodySchema),
    updateTransactionController
);

router.delete(
    "/:id",
    validate("params", transactionParamsSchema),
    validate("query", transactionUserQuerySchema),
    deleteTransactionController
);

export default router;