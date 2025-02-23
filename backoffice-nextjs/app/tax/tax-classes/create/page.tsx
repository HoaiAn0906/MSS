"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import TaxClassForm from "@/modules/tax/component/TaxClassForm";
import { createTaxClass } from "@/modules/tax/services/TaxClassService";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function CreateTaxClassPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: { name: string }) => {
    try {
      const response = await createTaxClass({ id: 0, name: data.name });

      if (response.ok) {
        router.push("/tax/tax-classes");
      } else {
        console.error("Error creating tax class:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating tax class:", error);
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
        <CardTitle>Create Tax Class</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <TaxClassForm onSubmit={handleSubmit} formRef={formRef} />
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
