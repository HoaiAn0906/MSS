"use client";

import { Card } from "@/components/ui/card";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductForm from "@/modules/catalog/components/products/ProductForm";
import { getProduct } from "@/modules/catalog/services/ProductService";
import { useParams, useRouter } from "next/navigation";
import { toastError } from "@/components/service/ToastService";
import { handleUpdatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { updateProduct } from "@/modules/catalog/services/ProductService";
import { ProductFormData } from "@/modules/catalog/validations/ProductFormSchema";
import { PRODUCT_URL } from "@/constants/Common";
import { mapProductFormDataToProductPayload } from "@/modules/catalog/models/ProductPayload";
export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [product, setProduct] = useState<ProductFormData>();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const productData = mapProductFormDataToProductPayload(data);
      const response = await updateProduct(id ? +id : 0, productData);

      handleUpdatingResponse(response);
      if (response.status === 200) {
        router.push(PRODUCT_URL);
      } else {
        toastError(response.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
      getProduct(+id)
        .then((data) => {
          if (data.id) {
            setProduct(data);
            setLoading(false);
          } else {
            toastError(data?.detail || "Product not found");
            setLoading(false);
            router.push(PRODUCT_URL);
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
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductForm
          onSubmit={handleSubmit}
          formRef={formRef}
          initialData={product}
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
