import { z } from "zod";

export const productAttributeGroupSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1, "Name is required"),
});

export type ProductAttributeGroupFormData = z.infer<
  typeof productAttributeGroupSchema
>;
