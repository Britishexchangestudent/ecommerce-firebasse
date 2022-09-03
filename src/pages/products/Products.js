import React from "react";
import { Footer } from "../../components";
import ProductFilter from "./ProductFilter";

function Products() {
  return (
    <>
      <main>
        <ProductFilter />
      </main>
      <Footer />
    </>
  );
}

export default Products;
