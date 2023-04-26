import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCart: {},
  totalCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMyCart: (state, action) => {
      state.myCart = action.payload;
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },
  },
});

export const { setTotalCart, setMyCart } = cartSlice.actions;

export default cartSlice.reducer;
