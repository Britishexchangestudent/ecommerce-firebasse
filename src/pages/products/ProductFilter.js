import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
import Product from "./Product";
import Search2 from "../../components/admin/Search/Search2";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../hooks/useFetchCollection";
import { Loader } from "../../components";
import {
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../redux/slice/filterSlice";
import { motion } from "framer-motion";
import EmptyProduct from "./EmptyProduct";
import SideFilterTabs from "../../components/product/SideFilterTabs";

const sortOptions = [
  { name: "Latest", href: "#", current: true, value: "latest" },
  {
    name: "Price: Low to High",
    href: "#",
    current: false,
    value: "lowest-price",
  },
  {
    name: "Price: High to Low",
    href: "#",
    current: false,
    value: "highest-price",
  },
  { name: "A-Z", href: "#", current: false, value: "a-z" },
  { name: "Z-A", href: "#", current: false, value: "z-a" },
];

const sideFiltersTitle = ["Category", "Brand", "Price"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("All");
  const [showSearch, setShowSearch] = useState(false);

  const filteredProducts = useSelector(selectFilteredProducts);

  const { data, loading } = useFetchCollection("products");

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand: brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price: price }));
  }, [dispatch, products, price]);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

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

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice("All");
  };

  return (
    <>
      {loading && <Loader />}
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {sideFiltersTitle.map((title, i) => (
                      <Disclosure
                        as="div"
                        key={i}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {title}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Transition
                              show={open}
                              enter="transition duration-500 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-500 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {title === "Category" && (
                                    <SideFilterTabs title="Category" />
                                  )}
                                  {title === "Brand" && (
                                    <SideFilterTabs title="Brand" />
                                  )}
                                  {title === "Price" && (
                                    <SideFilterTabs title="Price" />
                                  )}
                                </div>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                  <div className="z-1 space-y-2 mx-auto  sm:hidden">
                    <input
                      type="text"
                      className="py-2 px-2 border w-64 cursor-pointer outline-none"
                      readOnly
                      placeholder="Search (⌘ + k)..."
                      onClick={() => {
                        setMobileFiltersOpen(false);
                        setShowSearch((prev) => !prev);
                      }}
                    />
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-20 bg-white">
            <div className="relative z-10 flex items-baseline justify-between pt-16 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Products
              </h1>

              <div className="z-1 space-y-2 hidden sm:inline-flex">
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
              <Search2
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                products={products}
              />

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    enter="transition duration-500 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-500 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name} value={option.value}>
                            {({ active }) => (
                              <p
                                onClick={() => {
                                  setSort(option.value);
                                }}
                                className={classNames(
                                  option.value === sort
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section
              aria-labelledby="products-heading"
              className="pt-6 sm:pb-24"
            >
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 ">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {sideFiltersTitle.map((title) => (
                    <Disclosure
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {title}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Transition
                            show={open}
                            enter="transition duration-500 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-500 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="pt-6" static>
                              {title === "Category" && (
                                <SideFilterTabs title="Category" />
                              )}
                              {title === "Brand" && (
                                <SideFilterTabs title="Brand" />
                              )}
                              {title === "Price" && (
                                <SideFilterTabs title="Price" />
                              )}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  <>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 shadow-lg border border-transparent rounded-md py-3 px-8 z-10 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 duration-300 cursor-pointer"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </>
                </form>

                {/* Product grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                  className="lg:col-span-3"
                >
                  {loading ? null : filteredProducts.length === 0 ? (
                    <EmptyProduct />
                  ) : (
                    <Product products={filteredProducts} />
                  )}
                </motion.div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
