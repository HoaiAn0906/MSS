import { z } from "zod";

export const productAttributeSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1, "Name is required"),
  productAttributeGroupId: z.number().nullable().optional(),
});

export type ProductAttributeFormData = z.infer<typeof productAttributeSchema>;
