"use client";

import SpinnerComponent from "@/components/common/SpinnerComponent";
import { toastError } from "@/components/service/ToastService";
import { Address } from "@/modules/address/models/AddressModel";
import { getAddress } from "@/modules/address/services/AddressService";
import AdditionalInformation from "@/modules/checkout/components/AdditionalInformation";
import ModalAddressList from "@/modules/checkout/components/ModalAddressList";
import OrderSummary from "@/modules/checkout/components/OrderSummary";
import PaymentMethod from "@/modules/checkout/components/PaymentMethod";
import ShippingAddressForm from "@/modules/checkout/components/ShippingAddressForm";
import { ShippingAddressFormSchema } from "@/modules/checkout/validations/ShippingAddressFormSchema";
import {
  createUserAddress,
  getUserAddressDefault,
} from "@/modules/customer/services/CustomerService";
import { CheckoutItem } from "@/modules/order/models/CheckoutItem";
import { Order } from "@/modules/order/models/Order";
import { OrderItem } from "@/modules/order/models/OrderItem";
import {
  createOrder,
  getCheckoutById,
} from "@/modules/order/services/OrderService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [addBillingAddress, setAddBillingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [addShippingAddress, setAddShippingAddress] = useState<boolean>(false);
  const [showModalShipping, setShowModalShipping] = useState<boolean>(false);
  const { id } = useParams();
  const [checkout, setCheckout] = useState<Order>();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isShowSpinner, setIsShowSpinner] = useState<boolean>(false);
  const router = useRouter();

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

  const handleProcessPayment = async () => {
    if (!shippingAddress) {
      toast.error("Please select a shipping address");
      return;
    }
    if (!billingAddress) {
      toast.error("Please select a billing address");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsShowSpinner(true);

    const order: Order = {
      email: checkout?.email ?? "",
      numberItem: orderItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: orderItems.reduce(
        (result, item) =>
          result +
          item.quantity * item.productPrice -
          (item.discountAmount ?? 0),
        0
      ),
      deliveryMethod: "VIETTEL_POST",
      paymentMethod: paymentMethod,
      paymentStatus: "PENDING",
      checkoutId: id as string,
      shippingAddressPostVm: shippingAddress,
      billingAddressPostVm: billingAddress ?? shippingAddress,
      orderItemPostVms: orderItems,
    };

    createOrder(order)
      .then((res) => {
        toast.success("Place order successfully");
        router.push(`/order/${res?.id ?? 0}`);
      })
      .catch(() => {
        toast.error("Place order failed");
      })
      .finally(() => {
        setIsShowSpinner(false);
      });
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

  useEffect(() => {
    if (id) {
      const fetchCheckout = async () => {
        await getCheckoutById(id as string)
          .then((res) => {
            setCheckout(res);
            const newItems: OrderItem[] = [];
            res.checkoutItemVms.forEach((result: CheckoutItem) => {
              newItems.push({
                productId: result.productId,
                quantity: result.quantity,
                productName: result.productName,
                productPrice: result.productPrice,
                discountAmount: result.discountAmount,
                taxAmount: result.taxAmount,
              });
            });
            setOrderItems(newItems);
          })
          .catch((err) => {
            if (err == 404) {
              toastError("Page not found");
              router.push(`/404`); //NOSONAR
            } else {
              toastError("Please login to continue");
              router.push(`/login`); //NOSONAR
            }
          });
      };

      fetchCheckout(); //NOSONAR
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container mx-auto py-8">
      <SpinnerComponent show={isShowSpinner}></SpinnerComponent>
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
            setPaymentMethod={setPaymentMethod}
            onProcessPayment={handleProcessPayment}
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
