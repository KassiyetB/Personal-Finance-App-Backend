import { z } from 'zod';

export const CreateCategoryBodySchema = z.object({
    userId: z.string(),
    name: z.string().min(1, 'Name is required'),
});

export type CreateCategoryInput = z.infer<typeof CreateCategoryBodySchema>;