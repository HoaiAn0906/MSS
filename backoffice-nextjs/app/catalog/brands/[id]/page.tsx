"use client";

import { useEffect, useState } from "react";
import BrandForm from "@/modules/catalog/components/brands/BrandForm";
import { editBrand, getBrand } from "@/modules/catalog/services/BrandService";
import { useParams, useRouter } from "next/navigation";
import { Brand } from "@/modules/catalog/models/Brand";
import { BRAND_URL, ResponseStatus } from "@/constants/Common";
import { handleUpdatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { toastError } from "@/components/service/ToastService";
import { BrandFormData } from "@/modules/catalog/validations/BrandSchema";
import { SubmitHandler } from "react-hook-form";

export default function EditBrandPage() {
  const router = useRouter();

  const { id } = useParams();
  const [brand, setBrand] = useState<Brand>({
    id: 0,
    name: "",
    slug: "",
    isPublish: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBrand(+id)
        .then((data) => {
          if (data.id) {
            setBrand(data);
            setLoading(false);
          } else {
            toastError(data?.detail);
            setLoading(false);
            router.push(BRAND_URL);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleSubmitEdit: SubmitHandler<BrandFormData> = async (data) => {
    if (id) {
      const brand: Brand = {
        id: 0,
        name: data.name,
        slug: data.slug,
        isPublish: data.isPublish,
      };

      const brandResponse = await editBrand(+id, brand);
      if (brandResponse.status === ResponseStatus.SUCCESS) {
        router.replace(BRAND_URL);
      }
      handleUpdatingResponse(brandResponse);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <BrandForm mode="edit" initialData={brand} onSubmit={handleSubmitEdit} />
    </div>
  );
}
