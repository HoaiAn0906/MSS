import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase and only contain letters, numbers, and dashes",
    })
    .min(1, "Slug is required"),
  parentId: z.number().optional(),
  metaKeywords: z.string().optional(),
  metaDescription: z.string().optional(),
  displayOrder: z.number().optional(),
  isPublish: z.boolean(),
  categoryImage: z
    .object({
      id: z.number(),
      url: z.string(),
    })
    .optional()
    .nullable(),
  imageId: z.number().nullable(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
