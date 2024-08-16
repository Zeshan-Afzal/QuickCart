import React from "react";
import { Link } from "react-router-dom";

function DropDown({ categoriesData, setDrowDown }) {
  return (
    <div className=" w-full pb-2 max-h-[50vh] absolute top-14  z-20 flex flex-col gap-4 bg-slate-100 right-0 overflow-auto scrollbar-hide">
      {categoriesData &&
        categoriesData.map((item, i) => (
          <Link
            key={i}
            to={`/category/${item.title}`}
            className=" flex items-center gap-4 "
            onClick={() => setDrowDown(false)}
          >
            <img
              src={item.image_Url}
              alt=""
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
            />
            <span className=" text-black font-semibold ">{item.title}</span>
          </Link>
        ))}
    </div>
  );
}

export default DropDown;
