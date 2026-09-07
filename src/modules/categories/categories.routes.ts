import { Router } from "express";
import { 
    getCategoriesController,
    createCategoryController
 } from "./categories.controller.js";

import { CreateCategoryBodySchema } from "./categories.schema.js";

import { validate } from "#/middleware/validate.js";

const router = Router();

router.get(
    "/", 
    getCategoriesController
);

router.post(
    "/", 
    validate("body", CreateCategoryBodySchema), 
    createCategoryController
);

export default router;