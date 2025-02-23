"use client";

import BrandForm from "@/modules/catalog/components/brands/BrandForm";
import { createBrand } from "@/modules/catalog/services/BrandService";
import { useRouter } from "next/navigation";
import { Brand } from "@/modules/catalog/models/Brand";
import { BRAND_URL } from "@/constants/Common";
import { handleCreatingResponse } from "@/components/service/ResponseStatusHandlingService";
import { BrandFormData } from "@/modules/catalog/validations/BrandSchema";
import { SubmitHandler } from "react-hook-form";

export default function CreateBrandPage() {
  const router = useRouter();

  const handleSubmitCreate: SubmitHandler<BrandFormData> = async (data) => {
    const brand: Brand = {
      id: 0,
      name: data.name,
      slug: data.slug,
      isPublish: data.isPublish,
    };

    const response = await createBrand(brand);
    if (response.status === 201) {
      router.replace(BRAND_URL);
    }
    handleCreatingResponse(response);
  };

  return (
    <div className="container mx-auto px-4">
      <BrandForm mode="create" onSubmit={handleSubmitCreate} />
    </div>
  );
}
