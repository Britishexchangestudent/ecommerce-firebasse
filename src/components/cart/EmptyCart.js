import React from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

function EmptyCart() {
  return (
    <div className="text-center mt-20">
      <MdOutlineRemoveShoppingCart className="w-10 h-10 flex mx-auto" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Empty Cart</h3>
      <p className="mt-1 text-sm text-gray-500">
        Please add something to your cart to proceed
      </p>
      <div className="mt-6"></div>
    </div>
  );
}

export default EmptyCart;
