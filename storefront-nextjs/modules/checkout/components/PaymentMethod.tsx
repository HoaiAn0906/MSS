import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentProvider } from "@/modules/payment/models/PaymentProvider";
import { getEnabledPaymentProviders } from "@/modules/payment/services/PaymentProviderService";
import { useEffect, useState } from "react";

type Props = {
  setPaymentMethod: (paymentMethod: string) => void;
  onProcessPayment: () => Promise<void>;
};

const PaymentMethod = ({ setPaymentMethod, onProcessPayment }: Props) => {
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
    setPaymentMethod(selectedPayment === id ? "" : id);
  };

  const handleAgreeTerms = (checked: boolean) => {
    if (checked) {
      console.log("Agree terms");
      setDisableCheckout(false);
    } else {
      console.log("Disagree terms");
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
          {paymentProviders.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center space-x-2 border p-4 rounded-md"
            >
              <RadioGroupItem value={provider.id} id={provider.id} />
              <Label htmlFor={provider.id} className="flex items-center">
                {provider.name}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox id="terms" onCheckedChange={handleAgreeTerms} />
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
          onClick={onProcessPayment}
        >
          PROCESS TO PAYMENT
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
