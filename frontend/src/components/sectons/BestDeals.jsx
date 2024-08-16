import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import { productData } from "../../static/data";
import { useSelector } from "react-redux";

function BestDeals() {
  const [dealsData, setDealsData] = useState([]);
  const { AllProducts } = useSelector((state) => state.shop);

  useEffect(() => {
    if (AllProducts && AllProducts.length > 0) {
      const sortedProducts = [...AllProducts].sort((a, b) => b.sold - a.sold);

      // Limit to top 5 products
      const limitData = sortedProducts.slice(0, 6);

      // Fallback to first 6 products if limitData is empty
      setDealsData(limitData.length > 0 ? limitData : AllProducts.slice(0, 6));
    } else {
      setDealsData([]);
    }
  }, [AllProducts]);

  return (
    <div className="  w-[90%] p-4 shadow-sm mx-auto rounded-md">
      <h1 className=" font-semibold md:font-bold font-serif text-xl md:text-3xl mb-7">
        Best Deals
      </h1>
      {AllProducts && AllProducts.length > 0 && (
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
          {dealsData &&
            dealsData.length > 0 &&
            dealsData.map((item, i) => <ProductCard key={i} product={item} />)}
        </div>
      )}
    </div>
  );
}

export default BestDeals;
