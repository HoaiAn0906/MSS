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
import {
  getProductAttribute,
  updateProductAttribute,
} from "@/modules/catalog/services/ProductAttributeService";
import { useEffect, useRef, useState } from "react";
import { ProductAttributeFormData } from "@/modules/catalog/validations/ProductAttributeSchema";
import { ProductAttribute } from "@/modules/catalog/models/ProductAttribute";
import { useParams, useRouter } from "next/navigation";
import { toastError } from "@/components/service/ToastService";
import { handleUpdatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { PRODUCT_ATTRIBUTE_URL } from "@/constants/Common";

export default function EditProductAttributePage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams();
  const [productAttribute, setProductAttribute] = useState<ProductAttribute>();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: ProductAttributeFormData) => {
    try {
      const updatedProductAttribute: ProductAttribute = {
        id: id ? +id : 0,
        name: data.name,
        productAttributeGroupId: data.productAttributeGroupId || 0,
      };
      const response = await updateProductAttribute(
        id ? +id : 0,
        updatedProductAttribute
      );

      handleUpdatingResponse(response);
      router.push(PRODUCT_ATTRIBUTE_URL);
    } catch (error) {
      console.error("Error updating product attribute:", error);
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
      getProductAttribute(+id)
        .then((data) => {
          if (data.id) {
            const productAttribute: ProductAttribute = {
              id: data.id,
              name: data.name,
              productAttributeGroupId: data.productAttributeGroupId,
            };
            setProductAttribute(productAttribute);
            setLoading(false);
          } else {
            toastError("Product attribute not found");
            setLoading(false);
            router.push(PRODUCT_ATTRIBUTE_URL);
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
        <CardTitle>Edit Product Attribute</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductAttributeForm
          onSubmit={handleSubmit}
          formRef={formRef}
          initialData={productAttribute}
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
