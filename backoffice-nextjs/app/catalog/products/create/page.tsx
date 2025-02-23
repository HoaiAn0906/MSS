"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import ProductForm from "@/modules/catalog/components/products/ProductForm";
import { useRef } from "react";
import { ProductFormData } from "@/modules/catalog/validations/ProductFormSchema";
import { PRODUCT_URL } from "@/constants/Common";
import { useRouter } from "next/navigation";
import { createProduct } from "@/modules/catalog/services/ProductService";
import { handleCreatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { mapProductFormDataToProductPayload } from "@/modules/catalog/models/ProductPayload";
export default function CreateProductPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const productData = mapProductFormDataToProductPayload(data);
      const response = await createProduct(productData);

      handleCreatingResponse(response);
      router.push(PRODUCT_URL);
    } catch (error) {
      console.error("Error creating product:", error);
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
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductForm onSubmit={handleSubmit} formRef={formRef} />
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
