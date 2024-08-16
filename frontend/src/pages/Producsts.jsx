import React, { useEffect } from "react";
import AllProducts from "../components/products/AllProducts";

function Producsts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" flex flex-col gap-8 ">
      <AllProducts />
    </div>
  );
}

export default Producsts;
