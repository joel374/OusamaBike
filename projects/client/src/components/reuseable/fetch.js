import { axiosInstance } from "../../api"

export const fetchCategory = async () => {
  try {
    const response = await axiosInstance.get("/category/get")

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchProduct = async () => {
  try {
    const response = await axiosInstance.get("/product/get")

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
