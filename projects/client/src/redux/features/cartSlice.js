import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCart: [],
  totalCart: 0,
  totalPrice: 0,
  totalQuantity: 0,
  product: {
    product_name: "",
    stock: "",
    CategoryId: "",
    BrandCategoryId: "",
    price: "",
    description: "",
    sku: "",
    is_active: "",
    Images: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMyCart: (state, action) => {
      state.myCart = action.payload;
    },
    addToCart: (state, action) => {
      state.myCart.push(action.payload);
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
  },
});

export const { setTotalCart, setMyCart, setTotalPrice, setTotalQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
