/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  EMPTY_CART_ITEMS,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import EmptyCart from "./EmptyCart";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { delay: 1 } },
};
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.5, staggerChildren: 0.1 },
  },
};

export default function CartSlideOver2({ open, setOpen }) {
  const cartItems = useSelector(selectCartItems);

  const totalPrice = cartItems.reduce((initial, obj) => {
    return initial + obj.price * obj?.cartQuantity;
  }, 0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loggedIn = useSelector(selectIsLoggedIn);

  const increaseQuantity = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const decreaseQuantity = (product) => {
    dispatch(DECREASE_CART(product));
  };

  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
  };

  const emptyCart = () => {
    dispatch(EMPTY_CART_ITEMS());
  };

  useEffect(() => {
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);


  const checkout = () => {
    setOpen(false);
    if (loggedIn) {
      navigate("/checkout");
    } else {
      dispatch(SAVE_URL("checkout"));
      navigate("/login");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden  z-50"
        onClose={setOpen}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          exit={{
            opacity: 0.1,
            transition: { delay: 0.6, duration: 0.4 },
          }}
          className="absolute inset-0 overflow-hidden bg-gray-500/50 transition-opacity"
        >
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: 700,
                }}
                transition={{ delay: 0.5, duration: 0.5 }}
                exit={{
                  width: 0,
                  transition: { delay: 0.3, duration: 0.3 },
                }}
                className="w-screen max-w-md"
              >
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto scrollbar-hide  px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Your Cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 ">
                      <div className="flow-root ">
                        {cartItems.length === 0 ? (
                          <EmptyCart />
                        ) : (
                          <motion.ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                            layout
                            variants={cards}
                            initial="hidden"
                            animate="show"
                          >
                            {cartItems.map((product) => (
                              <motion.li
                                key={product.id}
                                layout
                                variants={card}
                                className="py-6 flex"
                              >
                                <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                  <img
                                    src={product?.imageURL}
                                    alt={product?.name}
                                    className="w-full h-full object-center object-contain"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <p className="line-clamp-1">
                                          {product?.name}
                                        </p>
                                      </h3>
                                      <div className="flex-col items-end space-y-1">
                                        <p className="ml-3">
                                          $
                                          {product?.price *
                                            product?.cartQuantity}
                                        </p>
                                        <p className="text-[10px] ml-3 w-14 text-gray-400">
                                          ${product?.price} x{" "}
                                          {product?.cartQuantity}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product?.category}
                                    </p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center justify-center gap-2">
                                      <button
                                        onClick={() =>
                                          decreaseQuantity(product)
                                        }
                                        className="text-white p-3 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-600 shadow-md hover:-translate-y-1 duration-200"
                                      >
                                        -
                                      </button>
                                      <p className="text-gray-500 py-2">
                                        {product?.cartQuantity}
                                      </p>
                                      <button
                                        onClick={() =>
                                          increaseQuantity(product)
                                        }
                                        className="text-white p-3 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-600 shadow-md hover:-translate-y-1 duration-200"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-200 px-3 py-2 rounded-md duration-300 cursor-pointer"
                                        onClick={() => removeFromCart(product)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    {cartItems.length > 0 && (
                      <div className="mt-6 flex justify-around">
                        <p
                          onClick={() => emptyCart()}
                          className="flex cursor-pointer justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-indigo-600 bg-white duration-200 hover:-translate-y-1"
                        >
                          Empty Cart
                        </p>
                        <p
                          onClick={() => checkout()}
                          className="flex cursor-pointer justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 duration-200 hover:-translate-y-1"
                        >
                          Check out
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        {cartItems.length > 0 && <p>or </p>}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </motion.div>
      </Dialog>
    </Transition.Root>
  );
}
