import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../components/productCard/ProductCard";
import { getAllProducts } from "../store/actions/shopAction";
import Loader from "../components/layout/Loader";

export default function CategoryPage() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const { AllProducts, isAllProductsLoading } = useSelector(
    (state) => state.shop
  );
  const { cetagory } = useParams();
  const dispatch = useDispatch();

  console.log(cetagory);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    if (!AllProducts || AllProducts.length === 0) {
      dispatch(getAllProducts());
    }
    const data =
      AllProducts && AllProducts.filter((pro) => pro.category == cetagory);

    setRelatedProducts(data);
    setLoader(false);
  }, [cetagory, AllProducts]);

  return (
    <div className=" flex flex-col gap-8  min-h-[70vh]">
      {isAllProductsLoading || (loader && <Loader />)}
      {!isAllProductsLoading && !loader && (
        <div className="  w-[90%] p-4 shadow-sm mx-auto rounded-md">
          {!relatedProducts ||
            (relatedProducts.length === 0 && (
              <div className=" w-[90%] p-4 shadow-sm mx-auto rounded-md  flex items-center justify-center h-[50vh] ">
                <h1 className=" text-2xl font-bold">No product found</h1>
              </div>
            ))}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
              {relatedProducts &&
                relatedProducts.length > 0 &&
                relatedProducts.map((item, i) => (
                  <ProductCard key={i} product={item} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
