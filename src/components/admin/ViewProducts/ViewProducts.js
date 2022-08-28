import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import ClipLoader from "react-spinners/ClipLoader";
import { doc, deleteDoc } from "firebase/firestore";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Search2 from "../Search/Search2";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import { Link } from "react-router-dom";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Loader from "../../loader/Loader";

function ViewProducts() {
  const { data, loading } = useFetchCollection("products");

  const [showSearch, setShowSearch] = useState(false);

  const [productImg, setProductImg] = useState("");
  const [productId, setProductId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [deleteLoader, setDeleteLoader] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data, dispatch]);

  const storage = getStorage();

  const deleteProduct = async (id, image) => {
    setDeleteLoader(true);
    try {
      setTimeout(() => {
        deleteDoc(doc(db, "products", id));

        const storageRef = ref(storage, image);

        deleteObject(storageRef);
        setDeleteLoader(false);
        setShowModal(false);
        toast.success("Product successfully deleted");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      setDeleteLoader(false);
    }
  };

  useEffect(() => {
    function onKeydown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setShowSearch(true);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [showSearch]);

  return (
    <>
      {showSearch && (
        <Search2
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          products={products}
        />
      )}

      {loading && <Loader />}

      {showModal && (
        <Modal title="Delete Product">
          <div className="flex justify-around px-4 mb-3 mt-10">
            <button
              className="bg-black hover:bg-gray-800 duration-200 cursor-pointer py-2 px-6 rounded-lg text-white text-semibold"
              onClick={() => {
                setShowModal(false);
                setProductId("");
                setProductImg("");
              }}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 duration-200 cursor-pointer py-2 px-6 rounded-lg text-white text-semibold flex items-center justify-center"
              onClick={() => {
                deleteProduct(productId, productImg);
              }}
            >
              {deleteLoader ? (
                <ClipLoader color="#fff" loading={deleteLoader} size={20} />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </Modal>
      )}

      <div className="flex-1 xl:overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:pb-12 lg:px-8">
          <h1 className="text-3xl font-extrabold text-blue-gray-900">
            View Products
          </h1>

          <div className="py-3 mt-6 space-y-2">
            <input
              type="text"
              className="py-2 px-2 border w-64 cursor-pointer outline-none"
              readOnly
              placeholder="Search (⌘ + k)..."
              onClick={() => {
                setShowSearch((prev) => !prev);
              }}
            />
          </div>

          <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products &&
                        products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex items-center h-10 w-10 md:h-20 md:w-20 lg:h-32 lg:w-32">
                                  <img
                                    className="h-30 w-30 rounded-sm"
                                    src={product.imageURL}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 cursor-pointer hover:underline">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ID: {product.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 w-64">
                              <div className="text-sm text-gray-900 line-clamp-4">
                                {product.desc}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                In Stock
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${product.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className=" flex items-center gap-3">
                                <Link to={`/admin/add-product/${product.id}`}>
                                  <AiFillEdit className="text-gray-600 hover:text-gray-900 h-6 w-6 cursor-pointer duration-200" />
                                </Link>
                                <AiFillDelete
                                  className="text-red-400 hover:text-red-600 h-6 w-6 cursor-pointer duration-200"
                                  onClick={() => {
                                    setProductId(product.id);
                                    setProductImg(product.imageURL);
                                    setShowModal(true);
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProducts;
