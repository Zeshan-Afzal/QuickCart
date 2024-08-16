import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ShopProtectedRoutes({ children }) {
  const { isSeller } = useSelector((state) => state.shop);

  const navigate = useNavigate();
  if (!isSeller) {
    return navigate("/");
  }

  return children;
}

export default ShopProtectedRoutes;
