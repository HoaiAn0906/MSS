import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";

const AdditionalInformation = () => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Additional Information</h2>

        <div className="mb-4">
          <Label htmlFor="order-notes">Order Notes</Label>
          <textarea
            id="order-notes"
            className="w-full mt-1 p-2 border rounded-md"
            rows={4}
            placeholder="Notes about your order, e.g. special notes for delivery."
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="mt-1"
            defaultValue="admin@gmail.com"
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformation;
