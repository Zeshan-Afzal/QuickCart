import React from "react";
import { categoriesData } from "../../static/data";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className=" w-[90%] bg-white p-4 shadow-sm mx-auto mt-7 md:mt-0 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {categoriesData &&
        categoriesData.map((item, i) => (
          <div key={i}>
            <Link
              to={`/category/${item.title}`}
              className=" flex gap-2 items-center justify-between p-3"
            >
              <p className=" font-bold font-serif text-lg">{item.title}</p>
              <img src={item.image_Url} alt="" className=" w-16 h-16 " />
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Categories;
