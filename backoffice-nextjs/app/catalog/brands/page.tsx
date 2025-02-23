"use client";
import { BrandDataTable } from "../../../modules/catalog/components/brands/BrandDataTable";
import { brandColumns } from "@/modules/catalog/components/brands/BrandColumns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Brands List</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandDataTable columns={brandColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
