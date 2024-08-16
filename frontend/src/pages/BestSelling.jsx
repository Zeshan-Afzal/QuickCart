import React, { useEffect } from "react";
import BestSellingProducts from "../components/bestSelling/BestSellingProducts";

function BestSelling() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" flex flex-col gap-8 ">
      <BestSellingProducts />
    </div>
  );
}

export default BestSelling;
