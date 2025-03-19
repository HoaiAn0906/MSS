import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef } from "react";
import { AutoComplete } from "@/components/common/AutoComplete";
import { Option } from "@/components/common/AutoComplete";
import { getCountries } from "@/modules/country/services/CountryService";
import { StateOrProvince } from "@/modules/stateAndProvince/models/StateOrProvince";
import { District } from "@/modules/district/models/District";
import { getStatesOrProvinces } from "@/modules/stateAndProvince/services/StatesOrProvicesService";
import { getDistricts } from "@/modules/district/services/DistrictService";
import {
  ShippingAddressFormSchema,
  shippingAddressFormSchema,
} from "../validations/ShippingAddressFormSchema";
import { SubmitHandler } from "react-hook-form";
import { Address } from "@/modules/address/models/AddressModel";
import CheckOutAddress from "./CheckOutAddress";

interface ShippingAddressFormProps {
  onSubmit: SubmitHandler<ShippingAddressFormSchema>;
  address?: Address;
  isDisplay: boolean;
  clickHandleChangeAddress: () => void;
  clickAddNewAddress: () => void;
}

const ShippingAddressForm = ({
  onSubmit,
  address,
  isDisplay,
  clickHandleChangeAddress,
  clickAddNewAddress,
}: ShippingAddressFormProps) => {
  // Create form ref
  const formRef = useRef<HTMLFormElement>(null);
  const [countries, setCountries] = useState<Option[]>([]);
  const [valueCountry, setValueCountry] = useState<Option>();
  const [statesOrProvinces, setStatesOrProvinces] = useState<Option[]>([]);
  const [valueState, setValueState] = useState<Option>();
  const [districts, setDistricts] = useState<Option[]>([]);
  const [valueDistrict, setValueDistrict] = useState<Option>();

  // Initialize form
  const form = useForm<ShippingAddressFormSchema>({
    resolver: zodResolver(shippingAddressFormSchema),
    defaultValues: {
      contactName: "",
      phone: "",
      countryId: "",
      stateOrProvinceId: "",
      city: "",
      districtId: "",
      addressLine1: "",
      zipCode: "",
    },
  });

  const handleCountryChange = (option: Option) => {
    setValueCountry(option);
    form.setValue("countryId", option.value);

    getStatesOrProvinces(+option.value).then((data) => {
      const statesOrProvinces = data.map(
        (stateOrProvince: StateOrProvince) => ({
          value: String(stateOrProvince.id) ?? "",
          label: stateOrProvince.name,
        })
      );
      setStatesOrProvinces(statesOrProvinces);
      getDistricts(+option.value).then((data) => {
        const districts = data.map((district: District) => ({
          value: String(district.id) ?? "",
          label: district.name,
        }));
        setDistricts(districts);
      });
    });
  };

  const handleStateChange = (option: Option) => {
    setValueState(option);
    form.setValue("stateOrProvinceId", option.value);

    getDistricts(+option.value).then((data) => {
      const districts = data.map((district: District) => ({
        value: String(district.id) ?? "",
        label: district.name,
      }));
      setDistricts(districts);
    });
  };

  const handleDistrictChange = (option: Option) => {
    setValueDistrict(option);
    form.setValue("districtId", option.value);
  };

  useEffect(() => {
    getCountries().then((data) => {
      const countries = data.map((country) => ({
        value: String(country.id) ?? "",
        label: country.name,
      }));
      setCountries([
        {
          value: "0",
          label: "Empty",
        },
        ...countries,
      ]);
    });
  }, []);

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <Button
          variant="outline"
          className="mb-4"
          onClick={() => {
            clickHandleChangeAddress();
          }}
        >
          Change address
        </Button>

        <Button
          variant="outline"
          className="ml-4"
          onClick={() => {
            clickAddNewAddress();
          }}
        >
          Add new address
        </Button>

        {!isDisplay && (
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <FormField
                    control={form.control}
                    name="countryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <FormControl>
                          <AutoComplete
                            options={countries}
                            emptyMessage="No countries found"
                            value={valueCountry}
                            onValueChange={(option) => {
                              handleCountryChange(option);
                              field.onChange(option.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="stateOrProvinceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province *</FormLabel>
                        <FormControl>
                          <AutoComplete
                            options={statesOrProvinces}
                            emptyMessage="No states or provinces found"
                            value={valueState}
                            onValueChange={(option) => {
                              handleStateChange(option);
                              field.onChange(option.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Please skip this field if you are not in a city"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="districtId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District *</FormLabel>
                        <FormControl>
                          <AutoComplete
                            options={districts}
                            emptyMessage="No districts found"
                            value={valueDistrict}
                            onValueChange={(option) => {
                              handleDistrictChange(option);
                              field.onChange(option.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip code *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-end justify-end">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Use this address
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
        {isDisplay && (
          <CheckOutAddress address={address ?? null} isDisplay={isDisplay} />
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
