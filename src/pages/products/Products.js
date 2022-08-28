import React from "react";
import { Footer, Navbar } from "../../components";
import ProductFilter from "./ProductFilter";

function Products() {
  return (
    <>
      <main>
        <div className="flex justify-center items-center sm:px-16 px-6">
          <div className="xl:max-w-[1280px] w-full">
            <Navbar />
          </div>
        </div>

        <ProductFilter />
        
      </main>
      <Footer />
    </>
  );
}

export default Products;
