"use client";

import React, { useEffect, useState } from "react";
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
import { ProductAttribute } from "@/modules/catalog/models/ProductAttribute";
import { ProductAttributeFormData } from "@/modules/catalog/validations/ProductAttributeSchema";
import { productAttributeSchema } from "@/modules/catalog/validations/ProductAttributeSchema";
import { AutoComplete } from "@/components/common/AutoComplete";
import { Option } from "@/components/common/AutoComplete";
import { getProductAttributeGroups } from "@/modules/catalog/services/ProductAttributeGroupService";
interface ProductAttributeFormProps {
  initialData?: ProductAttribute;
  onSubmit: SubmitHandler<ProductAttributeFormData>;
  formRef?: React.Ref<HTMLFormElement>;
}

const ProductAttributeForm: React.FC<ProductAttributeFormProps> = ({
  initialData,
  onSubmit,
  formRef,
}) => {
  const [productAttributeGroups, setProductAttributeGroups] = useState<
    Option[]
  >([]);
  const [valueProductAttributeGroup, setValueProductAttributeGroup] =
    useState<Option>();

  const form = useForm<ProductAttributeFormData>({
    resolver: zodResolver(productAttributeSchema),
    defaultValues: initialData || {
      id: null,
      name: "",
      productAttributeGroupId: null,
    },
  });

  useEffect(() => {
    getProductAttributeGroups().then((data) => {
      setProductAttributeGroups([
        {
          value: "0",
          label: "Empty",
        },
        ...data.map((group) => ({
          value: group.id?.toString() ?? "",
          label: group.name,
        })),
      ] as Option[]);
    });
  }, []);

  const handleProductAttributeGroupChange = (value: Option) => {
    setValueProductAttributeGroup(value);
    form.setValue("productAttributeGroupId", parseInt(value.value));
  };

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
        {/* Product Attribute Group ID Field */}
        <FormField
          control={form.control}
          name="productAttributeGroupId"
          render={() => (
            <FormItem>
              <FormLabel>Product Attribute Group ID</FormLabel>
              <FormControl>
                <AutoComplete
                  options={productAttributeGroups}
                  emptyMessage="No product attribute groups found"
                  value={valueProductAttributeGroup}
                  onValueChange={handleProductAttributeGroupChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProductAttributeForm;
