import apiClientService from "@/components/service/ApiClientService";

const baseUrl = "/api/sampledata/storefront/sampledata";

export async function postSampleData(): Promise<any> {
  const response = await apiClientService.post(baseUrl, JSON.stringify({})); 
  return response;
}