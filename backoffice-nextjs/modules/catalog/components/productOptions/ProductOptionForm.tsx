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
import { ProductOption } from "@/modules/catalog/models/ProductOption";
import { ProductOptionFormData } from "@/modules/catalog/validations/ProductOptionSchema";
import { productOptionSchema } from "@/modules/catalog/validations/ProductOptionSchema";

interface ProductOptionFormProps {
  initialData?: ProductOption;
  onSubmit: SubmitHandler<ProductOptionFormData>;
  formRef?: React.Ref<HTMLFormElement>;
}

const ProductOptionForm: React.FC<ProductOptionFormProps> = ({
  initialData,
  onSubmit,
  formRef,
}) => {
  const form = useForm<ProductOptionFormData>({
    resolver: zodResolver(productOptionSchema),
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

export default ProductOptionForm;
