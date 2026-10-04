import { Router } from "express";

import { createUserController } from "./auth.controller.js";

import { validate } from "#/middleware/validate.js";

import { createUserBodySchema } from "./auth.schema.js";

const router = Router();

router.post("/signup", 
    validate("body",createUserBodySchema),
    createUserController
);

export default router;