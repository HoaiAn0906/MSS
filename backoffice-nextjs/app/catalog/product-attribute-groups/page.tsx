import { ProductAttributeGroupDataTable } from "@/modules/catalog/components/productAttributeGroups/ProductAttributeGroupDataTable";
import { productAttributeGroupColumns } from "@/modules/catalog/components/productAttributeGroups/ProductAttributeGroupColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Product Attribute Groups List</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductAttributeGroupDataTable
            columns={productAttributeGroupColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
}
