import React from "react";
import { productData } from "../../static/data";
import ProductCard from "../productCard/ProductCard";
import { useSelector } from "react-redux";

function AllProducts() {
  const { AllProducts } = useSelector((state) => state.shop);

  return (
    <div className="  w-[90%] p-4 shadow-sm mx-auto rounded-md">
      <h1 className=" font-semibold md:font-bold font-serif text-xl md:text-3xl mb-7">
        All Products
      </h1>
      {AllProducts && AllProducts.length > 0 && (
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
          {AllProducts &&
            AllProducts.length > 0 &&
            AllProducts.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
