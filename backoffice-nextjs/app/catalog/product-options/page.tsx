import { ProductOptionDataTable } from "@/modules/catalog/components/productOptions/ProductOptionDataTable";
import { productOptionColumns } from "@/modules/catalog/components/productOptions/ProductOptionColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Product Options List</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductOptionDataTable columns={productOptionColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
