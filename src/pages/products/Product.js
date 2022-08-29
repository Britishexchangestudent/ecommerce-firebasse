import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Product({ products }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden cursor-pointer"
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
            >
              <div className="aspect-w-3 aspect-h-4 bg-transparent group-hover:opacity-75 duration-300 sm:aspect-none sm:h-96 cursor-pointer border-b border-gray-100">
                <img
                  src={product.imageURL}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-contain sm:w-full sm:h-full px-2"
                />
              </div>
              <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900  line-clamp-1">
                  <a href={product.href} className="group-hover:underline ">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {product.desc}
                </p>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-sm italic text-gray-500">
                    {product.category}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
