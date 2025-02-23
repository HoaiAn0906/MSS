import { z } from "zod";

export const productOptionSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1, "Name is required"),
});

export type ProductOptionFormData = z.infer<typeof productOptionSchema>;
