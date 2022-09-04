import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ADD_TO_CART, selectCart } from "../../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Product({ products }) {
  const navigate = useNavigate();

  const cart = useSelector(selectCart);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  return (
    <motion.div layout className="bg-white">
      <div className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products?.map((product) => (
            <div
              key={product?.id}
              className="relative bg-white border px-3 py-5 border-gray-200 shadow-md rounded-lg flex flex-col overflow-hidden cursor-pointer"
            >
              <div
                className="aspect-w-3 aspect-h-4 bg-transparent hover:opacity-75 duration-300 sm:aspect-none sm:h-96  border-b border-gray-100"
                onClick={() => {
                  navigate(`/product/${product?.id}`);
                }}
              >
                <img
                  src={product?.imageURL}
                  alt="imgg"
                  className="w-full h-full object-center object-contain sm:w-full sm:h-full px-2"
                />
              </div>
              <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3
                  className="text-sm font-medium text-gray-900  line-clamp-1"
                  onClick={() => {
                    navigate(`/product/${product?.id}`);
                  }}
                >
                  <p className="hover:underline">{product?.name}</p>
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {product?.desc}
                </p>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-sm italic text-gray-500">
                    {product?.category}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    ${product?.price}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        addToCart(product);
                      }}
                      className="w-full bg-indigo-600 shadow-lg border border-transparent rounded-md py-3 px-8 z-10 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 duration-300 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
