import { axiosInstance } from "../../api";

export const fetchCategory = async () => {
  try {
    const response = await axiosInstance.get("/category/get");

    return response.data.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchBrandCategory = async () => {
  try {
    const response = await axiosInstance.get("/category/getBrand");

    return response.data.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const fetchProduct = async (id, is_active, CategoryId) => {
  try {
    const response = await axiosInstance.get(
      `/product/get?${
        id
          ? `id=${id}`
          : "" || is_active
          ? `is_active=${is_active}`
          : "" || CategoryId
          ? `CategoryId=${CategoryId}`
          : ""
      }`
    );

    return response.data.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const addToWishlistHandler = async (id) => {
  try {
    const response = await axiosInstance.post(`/favorite/add/${id}`);

    return response.data.message;
  } catch (error) {
    console.log(error.response);
    return error.response.data.message;
  }
};

export const deleteWishlist = async (id) => {
  try {
    const response = await axiosInstance.delete(`/favorite/delete/${id}`);

    return response.data.message;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const fetchWishlist = async () => {
  try {
    const response = await axiosInstance.get(`/favorite/get`);

    return response.data.data;
  } catch (error) {
    console.log(error.response);
  }
};
