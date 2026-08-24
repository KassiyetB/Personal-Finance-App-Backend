import { Router } from "express";
import { 
    createRecurringTransactionController,
    getRecurringTransactionsController,
    getRecurringTransactionByIdController,
    updateRecurringTransactionController 
} from "./recurring-transactions.controller.js";


import { userQuerySchema, idParamsSchema } from "#/schema/common.schema.js";

import { 
    createRecurringTransactionBodySchema,
    updateRecurringTransactionBodySchema
} from "./recurring-transactions.schema.js";

import { validate } from "#/middleware/validate.js";


const router = Router();

router.post(
    "/",
    validate("body", createRecurringTransactionBodySchema), 
    createRecurringTransactionController
);

router.get(
    "/", 
    validate("query", userQuerySchema),
    getRecurringTransactionsController
);

router.get(
    "/:id", 
    validate("params", idParamsSchema),
    validate("query", userQuerySchema),
    getRecurringTransactionByIdController
);

router.patch(
    "/:id",
    validate("params", idParamsSchema),
    validate("query", userQuerySchema),
    validate("body", updateRecurringTransactionBodySchema),
    updateRecurringTransactionController

     
);

export default router;