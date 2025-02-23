import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxClassDataTable } from "@/modules/tax/component/TaxClassDataTable";
import { taxClassColumns } from "@/modules/tax/component/TaxClassColumns";

export default async function Page() {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Tax Class List</CardTitle>
        </CardHeader>
        <CardContent>
          <TaxClassDataTable columns={taxClassColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
