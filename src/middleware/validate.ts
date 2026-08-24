import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type RequestPart = "body" | "query" | "params";

export function validate(part: RequestPart, schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[part]);

        if(!result.success){
            return res.status(400).json({
                message: "Validation failed",
                error: result.error.issues,
            })
        }
        next();
    }
}