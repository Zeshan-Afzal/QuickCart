import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function UserProtectedRoutes({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  if (!isAuthenticated) {
    return navigate("/login");
  }

  return children;
}

export default UserProtectedRoutes;
