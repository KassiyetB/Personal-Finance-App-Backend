import type { Request, Response } from "express";
import { getCategories } from "./categories.service.js";

export async function getCategoriesController(
    req: Request,
    res: Response
) {
    try {
        const { userId } = req.query;

        const categories = await getCategories(
            userId as string,
        );
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get categories"
        });
    }
}