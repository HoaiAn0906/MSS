"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductAttributeGroup } from "@/modules/catalog/models/ProductAttributeGroup";
import {
  ProductAttributeGroupFormData,
  productAttributeGroupSchema,
} from "@/modules/catalog/validations/ProductAttributeGroupSchema";

interface ProductAttributeGroupFormProps {
  initialData?: ProductAttributeGroup;
  onSubmit: SubmitHandler<ProductAttributeGroupFormData>;
  formRef?: React.Ref<HTMLFormElement>;
}

const ProductAttributeGroupForm: React.FC<ProductAttributeGroupFormProps> = ({
  initialData,
  onSubmit,
  formRef,
}) => {
  const form = useForm<ProductAttributeGroupFormData>({
    resolver: zodResolver(productAttributeGroupSchema),
    defaultValues: initialData || {
      id: null,
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProductAttributeGroupForm;
