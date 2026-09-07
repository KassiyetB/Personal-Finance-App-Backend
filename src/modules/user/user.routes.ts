import { Router } from "express";

import { createUserController } from "./user.controller.js";

import { validate } from "#/middleware/validate.js";

import { createUserBodySchema } from "./user.schema.js";

const router = Router();

router.post("/", 
    validate("body",createUserBodySchema),
    createUserController
);

export default router;