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
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let tmpProducts = [];
      if (brand === "All") {
        tmpProducts = products;
      } else {
        tmpProducts = products.filter((product) => product.brand === brand);
      }

      state.filteredProducts = tmpProducts;
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let tmpProducts = [];
      if (price === "All") {
        tmpProducts = products;
      } else if (price === "under $50") {
        tmpProducts = products.filter((product) => product.price < 50);
      } else if (price === "Between $50 and $100") {
        tmpProducts = products.filter(
          (product) => product.price >= 50 && product.price <= 100
        );
      } else if (price === "Between $100 and $500") {
        tmpProducts = products.filter(
          (product) => product.price >= 101 && product.price <= 500
        );
      } else if (price === "Between $500 and $1000") {
        tmpProducts = products.filter(
          (product) => product.price >= 501 && product.price <= 1000
        );
      } else {
        tmpProducts = products.filter((product) => product.price > 1000);
      }

      state.filteredProducts = tmpProducts;
    },
  },
});

export const {
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
