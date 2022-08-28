import React, { useState, useEffect } from "react";
import { db, storage } from "../../../firebase/config";
import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";

import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";
import AddProductInput from "./AddProductInput";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { selectProducts } from "../../../redux/slice/productSlice";

import { useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Desktop" },
  { id: 3, name: "Accessories" },
  { id: 4, name: "Fashion" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

function AddProducts() {
  // find id from url to see if form is add or edit
  const { id } = useParams();

  // fetch products from state
  const products = useSelector(selectProducts);

  // find the product being edited via its id
  const productToEdit = products.find((item) => item.id === id);

  const [loading, setLoading] = useState(false);

  const [uploadLoader, setUploadLoader] = useState(false);

  const navigate = useNavigate();

  // if id === add, set the products to initial state --> this helps clear form when going from editing to adding
  useEffect(() => {
    if (id === "ADD") {
      setProduct({ ...initialState });
    }
  }, [id, productToEdit]);

  // detect whether form is add or edit and return function based on outcome
  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }

    return f2;
  }

  // product inital state dependant on if its add or edit form.
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productToEdit);
    return newState;
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `shopp/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          setLoading(false);
          toast.success("Image upload successful");
        });
      }
    );
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadLoader(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setTimeout(() => {
        setUploadLoader(false);
        toast.success("Product upload successful");
        setProduct({
          ...initialState,
        });
        navigate("/admin/view-products");
      }, 2000);
    } catch (error) {
      setUploadLoader(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setUploadLoader(true);

    if (product.imageURL !== productToEdit.imageURL) {
      const storageRef = ref(storage, productToEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productToEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });

      setTimeout(() => {
        setUploadLoader(false);
        toast.success("Product successfully edited");
        setProduct({
          ...initialState,
        });
        navigate("/admin/view-products");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      setUploadLoader(false);
    }
  };

  return (
    <>
      {uploadLoader && <Loader />}
      <div className="flex-1 xl:overflow-y-auto">
        <div className="max-w-3xl mx-auto pb-10 px-4 sm:px-6 lg:pb-12 lg:px-8">
          <h1 className="text-3xl font-extrabold text-blue-gray-900">
            {detectForm(id, "Add Product", "Edit Product")}
          </h1>

          <form
            className="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
            onSubmit={detectForm(id, handleSubmit, editProduct)}
          >
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <AddProductInput
                title="Product name"
                type="text"
                name="name"
                value={product?.name}
                onChange={(e) => handleInput(e)}
              />
              <AddProductInput
                title="Company / Brand"
                type="text"
                name="brand"
                value={product?.brand}
                onChange={(e) => handleInput(e)}
              />
              <AddProductInput
                title="Product price"
                type="number"
                name="price"
                value={product?.price}
                onChange={(e) => handleInput(e)}
              />

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Product Image
                </label>
                <div className="mt-1 flex items-center">
                  {!product?.imageURL && loading === false ? (
                    <div className="relative h-24 w-24 sm:h-36 sm:w-36 rounded-sm flex bg-[#E8F0FE] items-center justify-center cursor-pointer">
                      <input
                        accept="image/*"
                        onChange={(e) => handleImage(e)}
                        name="image"
                        type="file"
                        required
                        className="absolute inset-0 w-full h-full opacity-0  border-gray-300 rounded-md"
                      />
                      <AiOutlineCloudUpload className="w-8 h-8" />
                    </div>
                  ) : loading ? (
                    <Skeleton
                      height="144px"
                      width="144px"
                      containerClassName="avatar-skeleton"
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    <img
                      className="inline-block h-24 w-24 sm:h-36 sm:w-36 rounded-sm object-contain"
                      src={product?.imageURL}
                      alt=""
                    />
                  )}

                  <div
                    className={`flex cursor-pointer ${
                      loading && "cursor-not-allowed"
                    }`}
                  >
                    {product?.imageURL && (
                      <>
                        <div className="ml-4 flex">
                          <div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center  hover:bg-blue-gray-50 ">
                            <span className=" text-sm font-medium">Change</span>

                            <input
                              accept="image/*"
                              onChange={(e) => handleImage(e)}
                              name="image"
                              type="file"
                              className="absolute inset-0 w-full h-full opacity-0  border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-3 cursor-pointer bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
                          onClick={() =>
                            setProduct({ ...product, imageURL: "" })
                          }
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    name="desc"
                    rows={4}
                    value={product?.desc}
                    required
                    onChange={(e) => handleInput(e)}
                    className="block w-full px-3 py-2 border bg-[#E8F0FE] rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="mt-3 text-sm text-blue-gray-500">
                  Brief description of the product.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Category
                </label>
                <select
                  name="category"
                  required
                  value={product?.category}
                  onChange={(e) => handleInput(e)}
                  className="add-product-input"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryPurple hover:bg-primaryPurpleHover duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {detectForm(id, "Add", "Update")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
