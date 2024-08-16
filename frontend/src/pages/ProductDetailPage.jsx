import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductDetailsCard from "../components/productDetails/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllShopItems } from "../store/actions/shopAction";
import Loader from "../components/layout/Loader";

export default function ProductDetailPage() {
  const dispatch = useDispatch();

  const { AllProducts, isAllProductsLoading } = useSelector(
    (state) => state.shop
  );

  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!AllProducts || AllProducts.Length === 0) {
      dispatch(getAllProducts());
    }
    const data = AllProducts && AllProducts.find((pro) => pro._id === id);
    window.scrollTo(0, 0);
    setProduct(data);
    dispatch(getAllShopItems(data && data.shop._id));
  }, [id, AllProducts]);

  return isAllProductsLoading ? (
    <Loader />
  ) : !isAllProductsLoading ? (
    <ProductDetailsCard product={product}  Id={id} />
  ) : null;
}
