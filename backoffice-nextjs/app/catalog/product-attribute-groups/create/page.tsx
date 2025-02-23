"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import ProductAttributeGroupForm from "@/modules/catalog/components/productAttributeGroups/ProductAttributeGroupForm";
import { ProductAttributeGroup } from "@/modules/catalog/models/ProductAttributeGroup";
import { createProductAttributeGroup } from "@/modules/catalog/services/ProductAttributeGroupService";
import { ProductAttributeGroupFormData } from "@/modules/catalog/validations/ProductAttributeGroupSchema";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PRODUCT_ATTRIBUTE_GROUPS_URL } from "@/constants/Common";

export default function CreateProductAttributeGroupPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: ProductAttributeGroupFormData) => {
    try {
      const productAttributeGroup: ProductAttributeGroup = {
        id: undefined,
        name: data.name,
      };
      const response = await createProductAttributeGroup(productAttributeGroup);

      if (response.ok) {
        router.push(PRODUCT_ATTRIBUTE_GROUPS_URL);
      } else {
        console.error(
          "Error creating product attribute group:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating product attribute group:", error);
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
        <CardTitle>Create Product Attribute Group</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductAttributeGroupForm onSubmit={handleSubmit} formRef={formRef} />
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
