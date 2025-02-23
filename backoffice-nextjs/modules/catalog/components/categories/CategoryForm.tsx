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
import { Switch } from "@/components/ui/switch";
import slugify from "slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryFormData,
  categorySchema,
} from "@/modules/catalog/validations/CategorySchema";
import { AutoComplete, type Option } from "@/components/common/AutoComplete";
import { getCategories } from "@/modules/catalog/services/CategoryService";
import { Textarea } from "@/components/ui/textarea";
import CategoryImage from "@/modules/catalog/components/categories/CategoryImage";

interface CategoryFormProps {
  initialData?: CategoryFormData;
  onSubmit: SubmitHandler<CategoryFormData>;
  formRef?: React.Ref<HTMLFormElement>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  formRef,
}) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      id: null,
      name: "",
      slug: "",
      parentId: 0,
      description: "",
      isPublish: true,
      metaKeywords: "",
      metaDescription: "",
      displayOrder: 0,
      categoryImage: null,
      imageId: null,
    },
  });

  const [parentCategories, setParentCategories] = useState<Option[]>([]);
  const [valueParentCategory, setValueParentCategory] = useState<Option>();

  const onNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = slugify(event.target.value, { lower: true, strict: true });
    form.setValue("slug", newSlug);
    await form.trigger("slug");
  };

  const handleParentCategoryChange = async (value: Option) => {
    setValueParentCategory(value);
    form.setValue("parentId", +value.value);
    await form.trigger("parentId");
  };

  /*eslint-disable*/
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setParentCategories([
        {
          value: "0",
          label: "Top Level",
        },
        ...categories.map((category) => ({
          value: category.id?.toString() || "",
          label: category.name,
        })),
      ]);
    };
    fetchCategories();
  }, []);

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...form.register("name", {
                    onChange: onNameChange,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug Field */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Category Field */}
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <FormControl>
                <AutoComplete
                  options={parentCategories}
                  emptyMessage="No categories found"
                  value={valueParentCategory}
                  onValueChange={handleParentCategoryChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta Keywords Field */}
        <FormField
          control={form.control}
          name="metaKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta Description Field */}
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display Order Field */}
        <FormField
          control={form.control}
          name="displayOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Image Upload */}
        <FormField
          control={form.control}
          name="categoryImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Image</FormLabel>
              <FormControl>
                <CategoryImage
                  id="categoryImage"
                  image={field.value || null}
                  setValue={form.setValue}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publish Field */}
        <FormField
          control={form.control}
          name="isPublish"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Publish</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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

export default CategoryForm;
