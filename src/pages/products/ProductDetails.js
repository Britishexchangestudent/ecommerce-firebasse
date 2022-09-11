import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { ShieldCheckIcon } from "@heroicons/react/outline";
import Reviews from "./Reviews";
import { selectEmail } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/slice/cartSlice";

const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetails() {
  const email = useSelector(selectEmail);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAdmin = email === "danialahmed.dev@gmail.com" ? true : false;

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProduct(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      toast.error("Product doesn't exist");
      navigate("/products");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="flex gap-2 items-center justify-between mb-9">
            <Link to="/products">
              <div className="cursor-pointer group flex w-20 justify-center py-2 px-2 pr-3 rounded-lg gap-2 items-center bg-indigo-600 text-white hover:bg-indigo-700 duration-300">
                <BiArrowBack className="w-4 h-4" />
                <p className="group-hover:underline">Back</p>
              </div>
            </Link>
            {isAdmin && (
              <Link to={`/admin/add-product/${id}`}>
                <div className="cursor-pointer group flex w-20 justify-center py-2 px-2 rounded-lg gap-2 items-center bg-indigo-300 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-400 duration-300">
                  <p className="group-hover:underline">Edit</p>
                </div>
              </Link>
            )}
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product?.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                ${product?.price}
              </p>

              <div className="ml-4 pl-4 border-l border-gray-300">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-purple-600"
                              : "text-purple-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews?.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews?.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product?.desc}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="flex-shrink-0 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product?.imageURL}
              alt="something"
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <div className="mt-10">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="group inline-flex text-base font-medium">
                <ShieldCheckIcon
                  className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="text-gray-500 hover:text-gray-700">
                  Lifetime Guarantee
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-5xl">
        <Reviews />
      </div>
    </div>
  );
}

export default ProductDetails;
