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
import {
  getProductAttributeGroup,
  updateProductAttributeGroup,
} from "@/modules/catalog/services/ProductAttributeGroupService";
import { useEffect, useRef, useState } from "react";
import { ProductAttributeGroupFormData } from "@/modules/catalog/validations/ProductAttributeGroupSchema";
import { ProductAttributeGroup } from "@/modules/catalog/models/ProductAttributeGroup";
import { useParams, useRouter } from "next/navigation";
import { toastError } from "@/components/service/ToastService";
import { handleUpdatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { PRODUCT_ATTRIBUTE_GROUPS_URL } from "@/constants/Common";
export default function EditProductAttributeGroupPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams();
  const [productAttributeGroup, setProductAttributeGroup] =
    useState<ProductAttributeGroup>();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: ProductAttributeGroupFormData) => {
    try {
      const updatedProductAttributeGroup: ProductAttributeGroup = {
        id: id ? +id : 0,
        name: data.name,
      };
      const response = await updateProductAttributeGroup(
        id ? +id : 0,
        updatedProductAttributeGroup
      );

      handleUpdatingResponse(response);
      router.push(PRODUCT_ATTRIBUTE_GROUPS_URL);
    } catch (error) {
      console.error("Error updating product attribute group:", error);
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
      getProductAttributeGroup(+id)
        .then((data) => {
          if (data.id) {
            const productAttributeGroup: ProductAttributeGroup = {
              id: data.id,
              name: data.name,
            };
            setProductAttributeGroup(productAttributeGroup);
            setLoading(false);
          } else {
            toastError(data?.detail || "Product attribute group not found");
            setLoading(false);
            router.push("/catalog/product-attribute-groups");
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
        <CardTitle>Edit Product Attribute Group</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <ProductAttributeGroupForm
          onSubmit={handleSubmit}
          formRef={formRef}
          initialData={productAttributeGroup}
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
