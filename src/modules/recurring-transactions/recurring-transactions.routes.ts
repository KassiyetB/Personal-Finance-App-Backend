import { Router } from "express";
import { 
    createRecurringTransactionController,
    getRecurringTransactionsController,
    getRecurringTransactionByIdController 
} from "./recurring-transactions.controller.js";


import { userQuerySchema, idParamsSchema } from "#/schema/common.schema.js";

import { 
    createRecurringTransactionBodySchema
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
// router.patch("/:id", );
// router.delete("/:id", );

export default router;