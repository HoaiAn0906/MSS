import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Address } from "@/modules/address/models/AddressModel";
import { getUserAddress } from "@/modules/customer/services/CustomerService";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";

type AddressCardProps = {
  address: Address;
  isSelected: boolean;
  onClick?: () => void;
};

const AddressCard = ({ address, isSelected, onClick }: AddressCardProps) => {
  return (
    <Card
      className={`p-4 cursor-pointer h-full ${
        isSelected ? "border-2 border-primary" : "border"
      }`}
      onClick={onClick}
    >
      <div className="space-y-1">
        <p className="font-medium">{address.contactName}</p>
        <p className="text-sm text-muted-foreground">{address.phone}</p>
        <p className="text-sm text-muted-foreground">
          {address.addressLine1},
          {address.addressLine2 && ` ${address.addressLine2},`}
          {address.districtName && ` ${address.districtName},`}
          {address.city && ` ${address.city},`}
          {address.stateOrProvinceName && ` ${address.stateOrProvinceName},`}
          {address.countryName && ` ${address.countryName}`}
          {address.zipCode && ` - ${address.zipCode}`}
        </p>
      </div>
    </Card>
  );
};

type Props = {
  showModal: boolean;
  handleModalClose: (isSelectionMade?: boolean) => void;
  handleSelectAddress: (address: Address) => any;
  defaultUserAddress?: Address;
  selectedAddressId?: number;
};

const ModalAddressList = ({
  showModal,
  handleModalClose,
  handleSelectAddress,
  defaultUserAddress,
  selectedAddressId,
}: Props) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (!showModal) {
      return;
    }
    getUserAddress()
      .then((res) => {
        setAddresses(res);
      })
      .catch((err) => {
        console.log("Load address fail: ", err.message);
      });
  }, [showModal]);

  const handleAddressClick = (address: Address) => {
    handleSelectAddress(address);
    handleModalClose(true);
  };

  const isAddressSelected = (address: Address) => {
    if (selectedAddressId) {
      return selectedAddressId == address.id;
    }
    if (defaultUserAddress?.id) {
      return defaultUserAddress.id == address.id;
    }
    return false;
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={(open) => !open && handleModalClose()}
    >
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Select address
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          {addresses.length === 0 ? (
            <div className="p-4 text-muted-foreground">
              Please add your address in your profile
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
              {addresses.map((address) => (
                <div key={address.id}>
                  <AddressCard
                    address={address}
                    isSelected={isAddressSelected(address)}
                    onClick={() => handleAddressClick(address)}
                  />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddressList;
