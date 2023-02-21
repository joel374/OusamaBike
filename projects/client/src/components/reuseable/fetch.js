import { axiosInstance } from "../../api";

export const fetchCategory = async () => {
  try {
    const response = await axiosInstance.get("/category/get");

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBrandCategory = async () => {
  try {
    const response = await axiosInstance.get("/category/getBrand");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct = async (id, is_active) => {
  try {
    const response = await axiosInstance.get(
      `/product/get?${
        id ? `id=${id}` : "" || is_active ? `is_active=${is_active}` : ""
      }`
    );
    console.log(response);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
