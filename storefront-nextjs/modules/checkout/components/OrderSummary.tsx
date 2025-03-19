import { Card, CardContent } from "@/components/ui/card";

const OrderSummary = () => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Your Order</h2>

        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between font-semibold mb-2">
            <span>Products</span>
            <span>Price</span>
          </div>

          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <span>iPhone 15</span>
              <span className="text-gray-500 text-sm ml-2">× 1</span>
            </div>
            <span className="text-red-500">$799.00</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between border-b pb-2">
            <span>Subtotal</span>
            <span className="text-red-500">$799.00</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Discount</span>
            <span className="text-red-500">$0.00</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Tax</span>
            <span className="text-red-500">$0.00</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-red-500">$799.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
