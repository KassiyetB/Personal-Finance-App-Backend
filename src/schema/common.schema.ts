import { z } from "zod";

export const userQuerySchema = z.object({
  userId: z.uuid(),
});

export const idParamsSchema = z.object({
  id: z.uuid(),
});