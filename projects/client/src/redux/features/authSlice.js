import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  email: "",
  is_verify: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.is_verify = action.payload.is_verify;
    },
    logout: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.is_verify = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
