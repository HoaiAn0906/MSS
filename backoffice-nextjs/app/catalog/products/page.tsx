import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productColumns } from "@/modules/catalog/components/products/ProductColumns";
import { ProductDataTable } from "@/modules/catalog/components/products/ProductDataTable";

export default async function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductDataTable columns={productColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
