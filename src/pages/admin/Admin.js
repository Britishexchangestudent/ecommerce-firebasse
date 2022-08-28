import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddProducts,
  Home,
  Navbar,
  Orders,
  Tabs,
  ViewProducts,
} from "../../components";

function Admin() {
  return (
    <>
      <div className="h-full w-full">
        <div className="flex justify-center items-center sm:px-16 px-6">
          <div className="xl:max-w-[1280px] w-full">
            <Navbar />
          </div>
        </div>

        <div className="  sm:flex sm:px-16 px-6 sm:py-10 py-6 ">
          <Tabs />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="add-product/:id" element={<AddProducts />} />
            <Route path="view-orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Admin;
