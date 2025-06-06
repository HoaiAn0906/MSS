import apiClientService from "@/components/service/ApiClientService";
import { ProductFeature } from "../models/ProductFeature";
import { ProductThumbnail } from "../models/ProductThumbnail";
import { MssError } from "@/components/service/MssError";

const baseUrl = "/api/product/storefront";

export async function getFeaturedProducts(
  pageNo: number,
  pageSize: number
): Promise<ProductFeature> {
  const response = await apiClientService.get(
    `${baseUrl}/products/featured?pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return response.json();
}

export async function getProductsByIds(
  ids: number[]
): Promise<ProductThumbnail[]> {
  const response = await apiClientService.get(
    `${baseUrl}/products/list-featured?productId=${ids}`
  );
  const jsonResponse = await response.json();
  if (!response.ok) {
    throw new MssError(jsonResponse);
  }
  return jsonResponse;
}
