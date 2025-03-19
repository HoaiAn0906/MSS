import apiClientService from "@/components/service/ApiClientService";
import { MssError } from "@/components/service/MssError";
import { UserAddresVm } from "../models/UserAddressVm";
import { ShippingAddressFormSchema } from "@/modules/checkout/validations/ShippingAddressFormSchema";
import { Address } from "@/modules/address/models/AddressModel";

const userAddressUrl = "/api/customer/storefront/user-address";

export async function createUserAddress(
  address: ShippingAddressFormSchema
): Promise<UserAddresVm> {
  const response = await apiClientService.post(
    userAddressUrl,
    JSON.stringify(address)
  );
  const jsonResult = await response.json();
  if (!response.ok) {
    throw new MssError(jsonResult);
  }
  return jsonResult;
}

export async function getUserAddress() {
  const response = await apiClientService.get(userAddressUrl);
  return response.json();
}

export async function getUserAddressDefault(): Promise<Address> {
  const response = await apiClientService.get(
    `${userAddressUrl}/default-address`
  );
  if (response.status >= 200 && response.status < 300) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

export async function deleteUserAddress(id: number) {
  const response = await apiClientService.delete(`${userAddressUrl}/${id}`);
  return await response;
}

export async function chooseDefaultAddress(id: number) {
  const response = await apiClientService.put(`${userAddressUrl}/${id}`, null);
  return await response;
}
