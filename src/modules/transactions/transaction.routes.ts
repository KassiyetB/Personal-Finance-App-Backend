import { Router } from "express";

import { 
    createTransactionController, 
    getTransactionsController, 
    getTransactionByIdController, 
    updateTransactionController, 
    deleteTransactionController 
} from "./transaction.controller.js";

import { userQuerySchema, idParamsSchema } from "#/schema/common.schema.js";

import {
  createTransactionBodySchema,
  updateTransactionBodySchema,
  transactionQuerySchema,
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
    validate("params", idParamsSchema),
    validate("query", userQuerySchema),     
    getTransactionByIdController
);

router.patch(
    "/:id",
    validate("params", idParamsSchema),
    validate("query", userQuerySchema),
    validate("body", updateTransactionBodySchema),
    updateTransactionController
);

router.delete(
    "/:id",
    validate("params", idParamsSchema),
    validate("query", userQuerySchema),
    deleteTransactionController
);

export default router;