import { z } from "zod";

export const brandSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
    slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: 'Slug must be lowercase and only contain letters, numbers, and dashes',
        })
        .min(1, 'Slug is required'),
    isPublish: z.boolean(),
});

export type BrandFormData = z.infer<typeof brandSchema>;