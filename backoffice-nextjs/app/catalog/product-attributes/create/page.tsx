"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import ProductAttributeForm from "@/modules/catalog/components/productAttributes/ProductAttributeForm";
import { createProductAttribute } from "@/modules/catalog/services/ProductAttributeService";
import { ProductAttributeFormData } from "@/modules/catalog/validations/ProductAttributeSchema";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PRODUCT_ATTRIBUTE_URL } from "@/constants/Common";
import { handleCreatingResponse } from "@/components/service/ResponseStatusHandlingService";

export default function CreateProductAttributePage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: ProductAttributeFormData) => {
    try {
      const productAttribute = {
        name: data.name,
        productAttributeGroupId: data.productAttributeGroupId ?? null,
      };
      const response = await createProductAttribute(productAttribute);

      handleCreatingResponse(response);
      router.push(PRODUCT_ATTRIBUTE_URL);
    } catch (error) {
      console.error("Error creating product attribute:", error);
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
        <CardTitle>Create Product Attribute</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductAttributeForm onSubmit={handleSubmit} formRef={formRef} />
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
