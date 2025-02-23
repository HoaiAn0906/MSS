import { z } from "zod";

export const productVariationSchema = z.object({
  id: z.number().optional(),
  optionName: z.string(),
  optionSku: z.string(),
  optionGTin: z.string(),
  optionPrice: z.number(),
  optionThumbnail: z
    .object({
      id: z.number(),
      url: z.string(),
    })
    .optional(),
  optionImages: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
      })
    )
    .optional(),
  optionValuesByOptionId: z.record(z.string(), z.string()),
});

export type ProductVariation = z.infer<typeof productVariationSchema>;
