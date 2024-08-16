import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import { productData } from "../../static/data";
import { useSelector } from "react-redux";

function RelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { AllProducts } = useSelector((state) => state.shop);

  useEffect(() => {
    const data =
      AllProducts &&
      AllProducts.filter((pro) => pro.category == product?.category);

    setRelatedProducts(data && data.filter((pro) => pro._id !== product._id));
  }, [product]);

  return (
    <div className="  w-[90%] p-4 shadow-sm mx-auto rounded-md">
      <h1 className=" font-semibold md:font-bold font-serif text-xl md:text-3xl mb-7">
        Related Products
      </h1>
      {AllProducts && AllProducts.length > 0 && (
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
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

export default RelatedProducts;
