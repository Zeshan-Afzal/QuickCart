import React from "react";

const CheckoutSteps = ({ setStep, step }) => {
  return (
    <div className=" flex items-center justify-center  w-full  mt-6 ">
      <div className=" w-full flex items-center   justify-center">
        <span className={`  bg-red-600   w-10 md:w-32  h-1 `}></span>
        <button
         
          className={`p-1 md:p-3 md:w-32 rounded-3xl bg-red-600  w-24    text-white font-semibold`}
        >
          Shipping
        </button>
        <span
          className={`  ${
            step === "payment" ? "bg-red-600 " : "bg-red-400 "
          }  w-10 md:w-24 h-1 `}
        ></span>
        <button
          
          className={`p-1 md:p-3 rounded-3xl  ${
            step === "payment" || step === "order" ? "bg-red-600 " : "bg-red-400 "
          }  w-24  md:w-32  text-white font-semibold`}
        >
          Payment
        </button>
        <span
          className={`  ${
            step === "order" ? "bg-red-600 " : "bg-red-400 "
          }   w-10 md:w-24  h-1 `}
        ></span>
        <button
          
          className={`p-1 md:p-3 rounded-3xl md:w-32 ${
            step === "order" ? "bg-red-600 " : "bg-red-400 "
          }  w-24    text-white font-semibold`}
        >
          Success
        </button>

        <span
          className={`  ${
            step === "order" ? "bg-red-600 " : "bg-red-400 "
          }   w-10 md:w-32  h-1 `}
        ></span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
