"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import CategoryForm from "@/modules/catalog/components/categories/CategoryForm";
import { createCategory } from "@/modules/catalog/services/CategoryService";
import { CategoryFormData } from "@/modules/catalog/validations/CategorySchema";
import { Category } from "@/modules/catalog/models/Category";
import { handleCreatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function CreateCategoryPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      const category: Category = {
        id: null,
        name: data.name,
        description: data.description || "",
        slug: data.slug,
        parentId: data.parentId == 0 ? null : data.parentId || null,
        metaKeywords: data.metaKeywords || "",
        metaDescription: data.metaDescription || "",
        displayOrder: data.displayOrder || 0,
        isPublish: data.isPublish,
        imageId: data.imageId || undefined,
        categoryImage: undefined,
      };
      const response = await createCategory(category);

      handleCreatingResponse(response);
      router.push("/catalog/categories");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <CategoryForm onSubmit={handleSubmit} formRef={formRef} />
      </CardContent>
      <CardFooter className="flex items-center justify-end space-x-4">
        <Button type="button" variant="default" onClick={handleCreateClick}>
          Create
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
