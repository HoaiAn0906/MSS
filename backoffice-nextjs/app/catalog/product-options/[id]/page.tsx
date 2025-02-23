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
import {
  getProductOption,
  updateProductOption,
} from "@/modules/catalog/services/ProductOptionService";
import { useEffect, useRef, useState } from "react";
import { ProductOptionFormData } from "@/modules/catalog/validations/ProductOptionSchema";
import { ProductOption } from "@/modules/catalog/models/ProductOption";
import { useParams, useRouter } from "next/navigation";
import { toastError } from "@/components/service/ToastService";
import { handleUpdatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { PRODUCT_OPTIONS_URL } from "@/constants/Common";

export default function EditProductOptionPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams();
  const [productOption, setProductOption] = useState<ProductOption>();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: ProductOptionFormData) => {
    try {
      const updatedProductOption: ProductOption = {
        id: id ? +id : 0,
        name: data.name,
      };
      const response = await updateProductOption(
        id ? +id : 0,
        updatedProductOption
      );

      handleUpdatingResponse(response);
      router.push(PRODUCT_OPTIONS_URL);
    } catch (error) {
      console.error("Error updating product option:", error);
    }
  };

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductOption(+id)
        .then((data) => {
          if (data.id) {
            const productOption: ProductOption = {
              id: data.id,
              name: data.name,
            };
            setProductOption(productOption);
            setLoading(false);
          } else {
            toastError(data?.detail || "Product option not found");
            setLoading(false);
            router.push(PRODUCT_OPTIONS_URL);
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
        <CardTitle>Edit Product Option</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductOptionForm
          onSubmit={handleSubmit}
          formRef={formRef}
          initialData={productOption}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end space-x-4">
        <Button type="button" variant="default" onClick={handleSaveClick}>
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
