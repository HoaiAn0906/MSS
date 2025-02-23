import apiClientService from "@/components/service/ApiClientService";
import { ProductAttribute } from "../models/ProductAttribute";

const baseUrl = "/api/product/backoffice/product-attribute";

interface ProductAttributeId {
  name: string;
  productAttributeGroupId: number | null;
}
export async function getProductAttributes(): Promise<ProductAttribute[]> {
  return (await apiClientService.get(baseUrl)).json();
}

export async function getPageableProductAttributes(
  pageNo: number,
  pageSize: number
) {
  const url = `${baseUrl}/paging?pageNo=${pageNo}&pageSize=${pageSize}`;
  return (await apiClientService.get(url)).json();
}

export async function createProductAttribute(
  productAttributePost: ProductAttributeId
) {
  return await apiClientService.post(
    baseUrl,
    JSON.stringify(productAttributePost)
  );
}

export async function updateProductAttribute(
  id: number,
  productAttributeId: ProductAttributeId
) {
  const url = `${baseUrl}/${id}`;
  const response = await apiClientService.put(
    url,
    JSON.stringify(productAttributeId)
  );
  if (response.status === 204) return response;
  else return await response.json();
}

export async function getProductAttribute(
  id: number
): Promise<ProductAttribute> {
  const url = `${baseUrl}/${id}`;
  return (await apiClientService.get(url)).json();
}

export async function deleteProductAttribute(id: number) {
  const url = `${baseUrl}/${id}`;
  const response = await apiClientService.delete(url);
  if (response.status === 204) return response;
  else return await response.json();
}
