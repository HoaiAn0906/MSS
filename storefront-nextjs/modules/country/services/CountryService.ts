import { Country } from "../models/Country";
import apiClientService from "@/components/service/ApiClientService";

export async function getCountries(): Promise<Country[]> {
  const response = await apiClientService.get(
    `/api/location/storefront/countries`
  );
  return await response.json();
}
