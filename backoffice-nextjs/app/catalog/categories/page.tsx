import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryDataTable } from "@/modules/catalog/components/categories/CategoryDataTable";
import { categoryColumns } from "@/modules/catalog/components/categories/CategoryColumns";

export default async function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryDataTable columns={categoryColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
