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
import {
  getTaxClass,
  editTaxClass,
} from "@/modules/tax/services/TaxClassService";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTaxClassPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams();
  const [taxClass, setTaxClass] = useState<{ id: number; name: string }>();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: { name: string }) => {
    try {
      const response = await editTaxClass(id ? +id : 0, {
        id: id ? +id : 0,
        name: data.name,
      });

      if (response.ok) {
        router.push("/tax/tax-classes");
      } else {
        console.error("Error updating tax class:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating tax class:", error);
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
      getTaxClass(+id)
        .then((data) => {
          if (data.id) {
            setTaxClass(data);
            setLoading(false);
          } else {
            console.error("Tax class not found");
            setLoading(false);
            router.push("/tax/tax-classes");
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
        <CardTitle>Edit Tax Class</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-2">
        <TaxClassForm
          onSubmit={handleSubmit}
          formRef={formRef}
          initialData={taxClass}
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
