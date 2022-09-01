import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_CATEGORY } from "../../redux/slice/filterSlice";
import { selectProducts } from "../../redux/slice/productSlice";

function CategoryFilter() {
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const onChangeCheckbox = (value) => {
    setCategory(value);
  };
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
}

export default CategoryFilter;
