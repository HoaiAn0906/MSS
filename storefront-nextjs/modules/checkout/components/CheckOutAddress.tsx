import { Input } from "@/components/ui/input";
import { Address } from "@/modules/address/models/AddressModel";
import { Card, CardContent } from "@/components/ui/card";

interface CheckOutAddressProps {
  address: Address | null;
  isDisplay: boolean;
}

const CheckOutAddress = ({ address, isDisplay }: CheckOutAddressProps) => {
  const addressString = address
    ? `${address.addressLine1}, ${address.districtName}, ${address.city}, ${address.countryName}`
    : "Please choose address";

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <div>
          {address ? (
            <>
              <Input value={address.contactName} disabled className="mb-2" />
              <Input value={address.phone} disabled className="mb-2" />
              <Input value={addressString} disabled className="mb-2" />
            </>
          ) : (
            <p className="text-gray-500">Please choose an address</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckOutAddress;
