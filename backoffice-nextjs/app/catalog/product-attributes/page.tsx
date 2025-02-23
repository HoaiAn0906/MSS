import { ProductAttributeDataTable } from "@/modules/catalog/components/productAttributes/ProductAttributeDataTable";
import { productAttributeColumns } from "@/modules/catalog/components/productAttributes/ProductAttributeColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Product Attributes List</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductAttributeDataTable columns={productAttributeColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
