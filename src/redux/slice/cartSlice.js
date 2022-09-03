import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, actions) => {
      console.log(`actions.payload`, actions.payload);
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export const selectCart = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalPrice = (state) => state.cart.cartTotalPrice;

export default cartSlice.reducer;
