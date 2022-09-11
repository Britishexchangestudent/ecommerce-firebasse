import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === actions.payload.id
      );

      if (productIndex >= 0) {
        // item already in cart, so increase cartTotalQuantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info("Product added to cart AGAIN?!", { position: "top-left" });
      } else {
        // item doesn't exist in cart, so add to cart
        const tmpProduct = { ...actions.payload, cartQuantity: 1 };
        state.cartItems.push(tmpProduct);
        toast.success("Product added to cart", { position: "top-left" });
      }

      // save cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItems;
        toast.success("Product removed from cart", { position: "top-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItems;

      toast.success("Product removed from cart", { position: "top-left" });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    EMPTY_CART_ITEMS: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success("Your cart has been emptied", { position: "top-left" });
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  EMPTY_CART_ITEMS,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalPrice = (state) => state.cart.cartTotalPrice;

export default cartSlice.reducer;
