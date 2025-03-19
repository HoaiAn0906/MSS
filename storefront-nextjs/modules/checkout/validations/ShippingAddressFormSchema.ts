import * as z from "zod";

export const shippingAddressFormSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Phone number must be less than 10 characters")
    .regex(/^\d+$/, "Phone number must be a number"),
  countryId: z.string().min(1, "Country is required"),
  stateOrProvinceId: z.string().min(1, "State/Province is required"),
  city: z.string().optional(),
  districtId: z.string().min(1, "District is required"),
  addressLine1: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

export type ShippingAddressFormSchema = z.infer<
  typeof shippingAddressFormSchema
>;
