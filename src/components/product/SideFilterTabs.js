import React, { useEffect, useState } from "react";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";

function SideFilterTabs({ title }) {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("All");

  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  const allPrice = [
    "All",
    "under $50",
    "Between $50 and $100",
    "Between $100 and $500",
    "Between $500 and $1000",
    "over $1000",
  ];

  const onChangeCheckbox = (value) => {
    setCategory(value);
  };
  const onChangeCheckboxBrand = (value) => {
    setBrand(value);
  };
  const onChangeCheckboxPrice = (value) => {
    setPrice(value);
  };

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };
  const filterBrands = (brands) => {
    setBrand(brands);
  };
  const filterPrice = (priceTitle) => {
    setPrice(priceTitle);
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand: brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price: price }));
  }, [dispatch, products, price]);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice("All");
  };

  if (title === "Category")
    return (
      <div className="space-y-2">
        {allCategories.map((categoryTitle, i) => (
          <div
            key={i}
            className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-3 active:scale-95 duration-200 active:bg-gray-300"
            onClick={() => {
              filterProducts(categoryTitle);
            }}
          >
            <input
              name={categoryTitle}
              onChange={() => onChangeCheckbox(categoryTitle)}
              checked={categoryTitle === category}
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer "
            />
            <label className="ml-3 text-sm text-gray-600 cursor-pointer ">
              {categoryTitle}
            </label>
          </div>
        ))}
      </div>
    );
  if (title === "Brand")
    return (
      <div className="space-y-2">
        {allBrands.map((brandTitle, i) => (
          <div
            key={i}
            className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-3 active:scale-95 duration-200 active:bg-gray-300"
            onClick={() => {
              filterBrands(brandTitle);
            }}
          >
            <input
              name={brandTitle}
              onChange={() => onChangeCheckboxBrand(brandTitle)}
              checked={brandTitle === brand}
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer "
            />
            <label className="ml-3 text-sm text-gray-600 cursor-pointer ">
              {brandTitle}
            </label>
          </div>
        ))}
      </div>
    );
  if (title === "Price") {
    return (
      <div className="space-y-2">
        {allPrice.map((priceTitle, i) => (
          <div
            key={i}
            className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg px-3 py-3 active:scale-95 duration-200 active:bg-gray-300"
            onClick={() => {
              filterPrice(priceTitle);
            }}
          >
            <input
              name={priceTitle}
              checked={priceTitle === price}
              onChange={() => onChangeCheckboxPrice(priceTitle)}
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer "
            />
            <label className="ml-3 text-sm text-gray-600 cursor-pointer ">
              {priceTitle}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default SideFilterTabs;
