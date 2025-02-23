import { z } from "zod";

export const taxClassSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1, "Name is required"),
});

export type TaxClassFormData = z.infer<typeof taxClassSchema>;
