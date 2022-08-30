import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tmpProducts = [];
      if (sort === "latest") {
        tmpProducts = products;
      }
      if (sort === "a-z") {
        tmpProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tmpProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      if (sort === "lowest-price") {
        tmpProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        tmpProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      state.filteredProducts = tmpProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tmpProducts = [];
      if (category === "All") {
        tmpProducts = products;
      } else {
        tmpProducts = products.filter(
          (product) => product.category === category
        );
      }

      state.filteredProducts = tmpProducts;
    },
  },
});

export const { SORT_PRODUCTS, FILTER_BY_CATEGORY } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
