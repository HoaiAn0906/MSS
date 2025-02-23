import { z } from "zod";
import { productVariationSchema } from "@/modules/catalog/validations/ProductVariationSchema";
import { productOptionValuePostSchema } from "@/modules/catalog/validations/ProductOptionValuePostSchema";

export const productFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  brandId: z.number(),
  categoryIds: z.array(z.number()).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specification: z.string().optional(),
  sku: z.string().nullable(),
  gtin: z.string().optional(),
  weight: z.number(),
  dimensionUnit: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  price: z.number(),
  isAllowedToOrder: z.boolean().optional().default(true),
  isPublished: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  isVisibleIndividually: z.boolean().optional().default(true),
  stockTrackingEnabled: z.boolean().optional().default(false),
  taxIncluded: z.boolean().optional(),
  thumbnailMedia: z
    .object({
      id: z.number(),
      url: z.string(),
    })
    .optional()
    .nullable(),
  productImageMedias: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
      })
    )
    .optional(),
  metaTitle: z.string().optional().nullable(),
  metaKeyword: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  relateProduct: z.array(z.number()).optional(),
  crossSell: z.array(z.number()).optional(),
  productOptionValueDisplays: z
    .array(
      z.object({
        productOptionId: z.number(),
        displayStyle: z.string(),
        displayOrder: z.number(),
        value: z.string(),
      })
    )
    .optional()
    .default([]),
  variations: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        gtin: z.string(),
        price: z.number(),
        thumbnailMediaId: z.number(),
        productImageIds: z.array(z.number()),
      })
    )
    .optional()
    .default([]),
  productOptionValues: z
    .array(
      z.object({
        productOptionId: z.number(),
        value: z.record(z.string(), z.string()),
        displayOrder: z.number(),
      })
    )
    .optional()
    .default([]),
  taxClassId: z.number(),
  relatedProductIds: z.array(z.number()).optional().default([]),
  productVariations: z.array(productVariationSchema).optional().default([]),
  productOptionValuePost: z
    .array(productOptionValuePostSchema)
    .optional()
    .default([]),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
