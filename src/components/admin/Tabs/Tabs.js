import React, { useEffect } from "react";

import { CreditCardIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const tabs = [
  { name: "Home", href: "#", icon: AiFillHome, current: false },
  {
    name: "View Products",
    href: "#",
    icon: OfficeBuildingIcon,
    current: false,
  },
  { name: "Add Product", href: "#", icon: AiFillPlusCircle, current: true },
  { name: "View Orders", href: "#", icon: CreditCardIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Tabs() {
  const [active, setActive] = useState("Home");
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const path = window.location.pathname;

  const nav = path.slice(7);

  useEffect(() => {
    if (nav === "view-products") {
      setValue("view-products");
      setActive("View Products");
    } else if (nav === "home") {
      setValue("home");
      setActive("Home");
    } else if (nav === "add-product") {
      setValue("add-product");
      setActive("Add Product");
    } else if (nav === "view-orders") {
      setValue("view-orders");
      setActive("View Orders");
    }
  }, [nav]);

  const navigateTo = (navType) => {
    if (navType === "Home") {
      setValue("home");
      navigate("home");
    } else if (navType === "View Products") {
      setValue("view-products");
      navigate("view-products");
    } else if (navType === "Add Product") {
      setValue("add-product");
      navigate("add-product/ADD");
    } else if (navType === "View Orders") {
      setValue("view-orders");
      navigate("view-orders");
    }
  };

  return (
    <div>
      <div className="sm:hidden pb-12 sm:pb-0">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full outline-none border-gray-300 rounded-md"
          defaultValue={value}
          onChange={(e) => {
            setActive(e.target.value);
            navigateTo(e.target.value);
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="mt-48 ml-12">
          <nav className="flex flex-col w-max" aria-label="Tabs">
            <p
              onClick={() => {
                setActive("Home");
                navigate("home");
              }}
              className={classNames(
                active === "Home"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm duration-200 font-poppins cursor-pointer"
              )}
            >
              <AiFillHome
                className={classNames(
                  active === "Home"
                    ? "text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "-ml-0.5 mr-2 h-5 w-5"
                )}
                aria-hidden="true"
              />
              <span>Home</span>
            </p>
            <p
              onClick={() => {
                setActive("View Products");
                navigate("view-products");
              }}
              className={classNames(
                active === "View Products"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm duration-200 font-poppins cursor-pointer"
              )}
            >
              <OfficeBuildingIcon
                className={classNames(
                  active === "View Products"
                    ? "text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "-ml-0.5 mr-2 h-5 w-5"
                )}
                aria-hidden="true"
              />
              <span>View Products</span>
            </p>
            <Link to="/admin/add-product/ADD">
              <p
                onClick={() => {
                  setActive("Add Product");
                  // navigate("add-product/ADD");
                }}
                className={classNames(
                  active === "Add Product"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm duration-200 font-poppins cursor-pointer"
                )}
              >
                <AiFillPlusCircle
                  className={classNames(
                    active === "Add Product"
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>Add Product</span>
              </p>
            </Link>
            <p
              onClick={() => {
                setActive("View Orders");
                navigate("view-orders");
              }}
              className={classNames(
                active === "View Orders"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm duration-200 font-poppins cursor-pointer"
              )}
            >
              <CreditCardIcon
                className={classNames(
                  active === "View Orders"
                    ? "text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "-ml-0.5 mr-2 h-5 w-5"
                )}
                aria-hidden="true"
              />
              <span>View Orders</span>
            </p>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
