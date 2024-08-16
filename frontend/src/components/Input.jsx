import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
function Input({ type, label, id, placeholder, handleOnChange,clas, value, min,clasp }) {
  const [showHidePassword, setShowHidePassword] = useState("password");

  return (
    <div className=" flex flex-col  w-11/12 md:w-4/5 relative gap-1">
      {label && (
        <label className={` ${clas? clas:"text-sm md:text-lg"}  md:font-semibold text-gray-500`}>
          {label}
        </label>
      )}
      <input
        className={`  p-1 md:p-[3px] rounded-lg border border-gray-300 focus:outline-none bg-slate-100 ${clasp?clasp:" p-1 md:p-2"}`}
        type={type === "password" ? showHidePassword : type}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        id={id}
        min={min}
      />
      {type === "password" && showHidePassword === "password" && (
        <FaEyeSlash
          onClick={() => setShowHidePassword("text")}
          className=" absolute top-8 right-3 md:right-4 md:top-12 cursor-pointer"
        />
      )}
      {showHidePassword === "text" && (
        <FaEye
          onClick={() => setShowHidePassword("password")}
          className=" absolute top-8 right-3 md:right-4 md:top-12 cursor-pointer"
        />
      )}
    </div>
  );
}

export default Input;
