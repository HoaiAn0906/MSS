"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import ProductOptionForm from "@/modules/catalog/components/productOptions/ProductOptionForm";
import { ProductOption } from "@/modules/catalog/models/ProductOption";
import { createProductOption } from "@/modules/catalog/services/ProductOptionService";
import { ProductOptionFormData } from "@/modules/catalog/validations/ProductOptionSchema";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PRODUCT_OPTIONS_URL } from "@/constants/Common";
import { handleCreatingResponse } from "@/components/service/ResponseStatusHandlingService";

export default function CreateProductOptionPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: ProductOptionFormData) => {
    try {
      const productOption: ProductOption = {
        id: null,
        name: data.name,
      };
      const response = await createProductOption(productOption);

      handleCreatingResponse(response);
      router.push(PRODUCT_OPTIONS_URL);
    } catch (error) {
      console.error("Error creating product option:", error);
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
        <CardTitle>Create Product Option</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductOptionForm onSubmit={handleSubmit} formRef={formRef} />
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
