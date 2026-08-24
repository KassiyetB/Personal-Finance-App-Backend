import { Router } from "express";
import { 
    createRecurringTransactionController 
} from "./recurring-transactions.controller.js";

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
// router.get("/", );
// router.get("/:id", );
// router.patch("/:id", );
// router.delete("/:id", );

export default router;