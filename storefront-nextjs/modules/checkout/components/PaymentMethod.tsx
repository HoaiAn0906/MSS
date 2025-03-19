import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { PaymentProvider } from "@/modules/payment/models/PaymentProvider";
import { getEnabledPaymentProviders } from "@/modules/payment/services/PaymentProviderService";

type Props = {
  setPaymentMethod: (paymentMethod: string) => void;
};

const PaymentMethod = ({ setPaymentMethod }: Props) => {
  const [paymentProviders, setPaymentProviders] = useState<PaymentProvider[]>(
    []
  );
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [disableCheckout, setDisableCheckout] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentProviders = async () => {
      try {
        const providers = await getEnabledPaymentProviders();
        setPaymentProviders(providers);
      } catch (error) {
        console.error("Error fetching payment providers:", error);
      }
    };

    fetchPaymentProviders();
  }, []);

  useEffect(() => {
    if (paymentProviders.length > 0 && selectedPayment === null) {
      setSelectedPayment(paymentProviders[0].id);
      setPaymentMethod(paymentProviders[0].id);
    }
  }, [paymentProviders]);

  const paymentProviderChange = (id: string) => {
    setSelectedPayment(selectedPayment === id ? null : id);
    setPaymentMethod(selectedPayment === id ? null : id);
  };

  const handleAgreeTerms = (e: any) => {
    if (e.target.checked) {
      setDisableCheckout(false);
    } else {
      setDisableCheckout(true);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>

        <RadioGroup
          value={selectedPayment ?? ""}
          onValueChange={paymentProviderChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center">
              <Image
                src="/paypal.png"
                alt="PayPal"
                width={20}
                height={20}
                className="mr-2"
              />
              Paypal
            </Label>
          </div>

          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center">
              <Image
                src="/cash.png"
                alt="Cash"
                width={20}
                height={20}
                className="mr-2"
              />
              Cash On Delivery
            </Label>
          </div>
        </RadioGroup>

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox id="terms" onChange={handleAgreeTerms} />
          <Label htmlFor="terms" className="text-sm">
            Agree to Terms and Conditions
          </Label>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          "I agree to the terms and conditions as set out by the user agreement.{" "}
          <a href="#" className="text-blue-500">
            Learn more
          </a>
          "
        </p>

        <Button
          className="w-full mt-6 bg-gray-500 hover:bg-gray-600"
          disabled={disableCheckout}
        >
          PROCESS TO PAYMENT
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
