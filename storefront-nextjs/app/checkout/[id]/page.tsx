"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdditionalInformation from "@/modules/checkout/components/AdditionalInformation";
import OrderSummary from "@/modules/checkout/components/OrderSummary";
import PaymentMethod from "@/modules/checkout/components/PaymentMethod";
import ShippingAddressForm from "@/modules/checkout/components/ShippingAddressForm";
import { SubmitHandler } from "react-hook-form";
import { ShippingAddressFormSchema } from "@/modules/checkout/validations/ShippingAddressFormSchema";
import { toast } from "react-toastify";
import {
  createUserAddress,
  getUserAddressDefault,
} from "@/modules/customer/services/CustomerService";
import { getAddress } from "@/modules/address/services/AddressService";
import { Address } from "@/modules/address/models/AddressModel";
import CheckOutAddress from "@/modules/checkout/components/CheckOutAddress";
import ModalAddressList from "@/modules/checkout/components/ModalAddressList";

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [addBillingAddress, setAddBillingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [addShippingAddress, setAddShippingAddress] = useState<boolean>(false);
  const [showModalShipping, setShowModalShipping] = useState<boolean>(false);

  const onSubmitBillingAddressForm: SubmitHandler<
    ShippingAddressFormSchema
  > = async (data: ShippingAddressFormSchema) => {
    try {
      const newAddress = await performCreateUserAddress(data);
      setBillingAddress(newAddress);
      setAddBillingAddress(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const performCreateUserAddress = async (data: ShippingAddressFormSchema) => {
    let createdUserAddress;
    try {
      const createUserAddressData = {
        contactName: data.contactName,
        phone: data.phone,
        countryId: data.countryId,
        stateOrProvinceId: data.stateOrProvinceId,
        city: data.city,
        districtId: data.districtId,
        addressLine1: data.addressLine1,
        zipCode: data.zipCode,
      };
      const { addressGetVm } = await createUserAddress(createUserAddressData);
      createdUserAddress = addressGetVm;
    } catch (error) {
      throw new Error("Failed to create new address");
    }

    let createdAddressDetails: Address = { ...createdUserAddress };
    try {
      createdAddressDetails = await getAddress(
        createdUserAddress.id.toString()
      );
    } catch (error) {
      console.log("Failed to get address details");
    }

    return createdAddressDetails;
  };

  useEffect(() => {
    getUserAddressDefault()
      .then((res) => {
        setShippingAddress(res);
        setBillingAddress(res);
      })
      .catch((e) => {
        setAddShippingAddress(true);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ShippingAddressForm
            onSubmit={onSubmitBillingAddressForm}
            address={shippingAddress}
            isDisplay={!addShippingAddress}
            clickHandleChangeAddress={() => {
              setAddShippingAddress(false);
              setShowModalShipping(true);
            }}
            clickAddNewAddress={() => { 
              setAddShippingAddress(true);
            }}
          />

          {/* Component 2: Payment Method */}
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          {/* Additional Information */}
          <AdditionalInformation />
        </div>

        {/* Component 3: Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
      <ModalAddressList
        showModal={showModalShipping}
        handleModalClose={() => setShowModalShipping(false)}
        handleSelectAddress={(address: Address) => {
          setShippingAddress(address);
          setShowModalShipping(false);
        }}
        defaultUserAddress={shippingAddress}
        selectedAddressId={shippingAddress?.id}
      />
    </div>
  );
}
