import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";

function Gadgets() {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { AllProducts, isAllProductsLoading } = useSelector(
    (state) => state.shop
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!AllProducts || AllProducts.length === 0) {
    //   dispatch(getAllProducts());
    // }
    const data =
      AllProducts &&
      AllProducts.filter((pro) => pro.category === "Mobile and Tablets");

    setRelatedProducts(data);
  }, [AllProducts]);

  return (
    <div className="  w-[90%] p-4 shadow-sm mx-auto rounded-md">
      <h1 className=" font-semibold md:font-bold font-serif text-xl md:text-3xl mb-7">
        Tech Gadgets & Wearables
      </h1>
      {AllProducts && AllProducts.length > 0 && (
        <div className="  w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
          {relatedProducts &&
            relatedProducts.length > 0 &&
            relatedProducts.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Gadgets;
