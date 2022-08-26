import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineEnter } from "react-icons/ai";
import EmptySearch from "./EmptySearch";
import { useMediaQuery } from "react-responsive";

function Search2({ showSearch, setShowSearch, products }) {
  const [tmpProducts, setTmpProducts] = useState([]);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(min-width: 455px)",
  });

  useEffect(() => {
    setTmpProducts(products);
  }, [products]);

  const filteredProducts = query
    ? tmpProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Transition.Root
      show={showSearch}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={setShowSearch}
        className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto"
      >
        <Transition.Child
          enter="ease-out duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/50 transition-opacity" />
        </Transition.Child>
        <Transition.Child
          enter="ease-out duration-1000"
          enterFrom="opacity-0 scale-0"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="bg-gray-100 max-w-2xl mx-auto shadow-lg relative rounded-lg ring-1 ring-black/5"
            onChange={(product) => {
              navigate(`/admin/product/${product.id}`);
            }}
          >
            <div className="flex items-center px-4">
              <SearchIcon className="w-6 h-6 text-gray-500" />

              <Combobox.Input
                className="w-full bg-transparent border-0 outline-none py-3 px-4"
                placeholder="Search..."
                onChange={(e) => {
                  setTimeout(() => setQuery(e.target.value), 1000);
                  // search logic
                }}
              />
            </div>
            {filteredProducts.length > 0 && (
              <Combobox.Options className="max-h-72 py-4 text-sm overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Combobox.Option key={product.id} value={product}>
                    {({ active }) => (
                      <li
                        key={product.id}
                        className={`py-6 px-4 flex duration-200 cursor-pointer mx-1 rounded-lg ${
                          active ? "bg-white" : "bg-gray-100"
                        }`}
                      >
                        <div className=" w-24 h-24 border border-gray-200 rounded-md">
                          <img
                            src={product.imageURL}
                            alt="product"
                            className="w-full h-full object-center object-contain"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex flex-col space-y-2 text-base font-medium text-gray-900">
                              <div className="flex w-full">
                                <p>{product.name}</p>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <p className="ml-auto">${product.price}</p>
                                </div>
                              </div>

                              <p className="text-gray-500">ID: {product.id}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredProducts.length === 0 && (
              <EmptySearch query={query} />
            )}

            {isMobile && (
              <div className="flex flex-wrap items-center bg-gray-100 py-2.5 px-4 text-xs text-gray-700 rounded-lg">
                Hit{" "}
                <kbd
                  className={
                    "mx-1 flex h-7 w-7 items-center justify-center rounded border bg-white font-semibold sm:mx-2 border-indigo-600 text-indigo-600"
                  }
                >
                  esc
                </kbd>{" "}
                <span class="sm:hidden">
                  to {query === "" ? "close" : "clear"} search,
                </span>
                <span class="hidden sm:inline">
                  to {query === "" ? "close" : "clear"} search,
                </span>
                <kbd
                  className={
                    "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 border-indigo-600 text-indigo-600"
                  }
                >
                  <IoMdArrowDropdown className="h-4 w-5" />
                </kbd>{" "}
                <kbd
                  className={
                    "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 border-indigo-600 text-indigo-600"
                  }
                >
                  <IoMdArrowDropup className="h-4 w-5" />
                </kbd>{" "}
                to navigate, and{" "}
                <kbd
                  className={
                    "mx-1 flex h-5 w-8 items-center justify-center rounded border bg-white font-semibold sm:mx-2 border-indigo-600 text-indigo-600"
                  }
                >
                  <AiOutlineEnter className="h-4 w-5" />
                </kbd>{" "}
                to search.
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default Search2;
