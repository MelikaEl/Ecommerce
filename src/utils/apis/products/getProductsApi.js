import apiClient from "../../../constants/axios-interceptor";

export const getProductsApi = async (offset = null, limit = null) => {
  try {
    return await apiClient.get(
      `/products?${
        offset != null && limit != null && `offset=${offset}&limit=${limit}`}`
    ); // (page -1) * limit    : if number of the page is 1 and want to find the offset and limit, 1-1=0   0*10=0  offset=0. If if number of the page is 2 and want to find the offset and limit, 2-1=1   1*10=10 offset=10 and so on...
  } catch (error) {
    return error;
  }
};
export default getProductsApi;
