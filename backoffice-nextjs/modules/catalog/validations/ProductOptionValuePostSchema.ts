import { z } from "zod";

export const productOptionValuePostSchema = z.object({
  productOptionId: z.number().optional(),
  value: z.record(z.string(), z.string()),
  displayType: z.string().optional(),
  displayOrder: z.number().optional(),
});

export type ProductOptionValuePost = z.infer<
  typeof productOptionValuePostSchema
>;
