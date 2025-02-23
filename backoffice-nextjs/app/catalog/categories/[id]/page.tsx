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
import {
  getCategory,
  updateCategory,
} from "@/modules/catalog/services/CategoryService";
import { useEffect, useRef, useState } from "react";
import { CategoryFormData } from "@/modules/catalog/validations/CategorySchema";
import { Category } from "@/modules/catalog/models/Category";
import { handleUpdatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useParams, useRouter } from "next/navigation";
import { CATEGORIES_URL } from "@/constants/Common";
import { toastError } from "@/components/service/ToastService";

export default function EditCategoryPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams();
  const [category, setCategory] = useState<CategoryFormData>();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      const category: Category = {
        id: id ? +id : 0,
        name: data.name,
        description: data.description || "",
        slug: data.slug,
        parentId: data.parentId == 0 ? null : data.parentId || null,
        metaKeywords: data.metaKeywords || "",
        metaDescription: data.metaDescription || "",
        displayOrder: data.displayOrder || 0,
        isPublish: data.isPublish,
        imageId: data.categoryImage?.id,
        categoryImage: data.categoryImage || undefined,
      };
      const response = await updateCategory(id ? +id : 0, category);

      handleUpdatingResponse(response);
      router.push(CATEGORIES_URL);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (id) {
      setLoading(true);
      getCategory(+id)
        .then((data) => {
          if (data.id) {
            const categoryFormData: CategoryFormData = {
              id: data.id,
              name: data.name,
              slug: data.slug,
              isPublish: data.isPublish,
              description: data.description,
              parentId: data.parentId || undefined,
              metaKeywords: data.metaKeywords,
              metaDescription: data.metaDescription,
              displayOrder: data.displayOrder,
              imageId: data.imageId || null,
              categoryImage: data.categoryImage,
            };
            setCategory(categoryFormData);
            setLoading(false);
          } else {
            toastError(data?.detail || "Category not found");
            setLoading(false);
            router.push(CATEGORIES_URL);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <CategoryForm
          onSubmit={handleSubmit}
          formRef={formRef}
          initialData={category}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end space-x-4">
        <Button type="button" variant="default" onClick={handleCreateClick}>
          Save
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
