import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { City, Country, State } from "country-state-city";
import { updateUser } from "../../../store/actions/userActions.js";
import Loader from "../../layout/Loader.jsx";

import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

function AddressesContent({ active }) {
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoadng] = useState(false);
const dispatch=useDispatch()
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up function to reset overflow on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [update]);

  const handleDeleteAddress = async (addressType) => {
    try {
      setLoadng(true);

      let res = await fetch(
        "/api/user/delete-address",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "ngrok-skip-browser-warning": "any-value",
          },
          body: addressType,
        },
        { withCredentials: true }
      );

      let resData = await res.json();
      if (!resData.success) {
       
        setLoadng(false);

        return toast.error(resData.message);
      }
       dispatch(updateUser(resData))
      toast.success(resData.message);
      setLoadng(false);
    } catch (error) {
    
      setLoadng(false);
      toast(error.message);
    }
  };

  return (
    <div className=" w-full relative  h-[100vh]  ">
      <div className="">
        <button
          onClick={() => setUpdate(true)}
          className=" p-1 md:p-3 font-semibold bg-white text-black border border-gray-200 rounded-md my-5 ml-5"
        >
          Add Address
        </button>
      </div>
      <div className=" w-full flex items-center justify-center">
        {update && <UpDatePopUp setUpdate={setUpdate} />}
      </div>
      <div className=" flex flex-col justify-center items-center w-full gap-2">
        {loading && (
          <div className="left-0 top-0 absolute w-screen h-screen  bg-[#00000017] flex  justify-center  ">
            <Loader />
          </div>
        )}

        {userData &&
          userData.user.address?.length > 0 &&
          userData.user.address.map((adrs) => (
            <div className=" w-[90%] overflow-auto min-h-[100px] bg-white  shadow-sm border border-gray-200  flex gap-4  justify-between ">
              <div className=" flex flex-col justify-around ml-3">
                <p className=" font-bold text-lg ">Address Type</p>
                <span>{adrs.addressType}</span>
              </div>
              <div className="flex flex-col justify-around">
                <p className=" font-bold text-lg">countery</p>
                <span>{adrs.country}</span>
              </div>
              <div className="flex flex-col justify-around">
                <p className=" font-bold text-lg">City</p>
                <span>{adrs.city}</span>
              </div>
              <div className="flex flex-col justify-around">
                <p className=" font-bold text-lg">Address</p>
                <span>{adrs.address} </span>
              </div>
              <div className="flex flex-col justify-around">
                <p className=" font-bold text-lg">Phone No</p>
                <span>{adrs.phoneNumber} </span>
              </div>
              <div className="flex flex-col justify-around">
                <p className=" font-bold text-lg">ZipCod</p>
                <span>{adrs.zipcod} </span>
              </div>

              <div className=" self-end mt-3 flex gap-1">
                <button
                  onClick={() => handleDeleteAddress(adrs.addressType)}
                  className=" hover:bg-gray-200 shadow-sm border border-gray-200 transition-all duration-300 bg-gray-100 p-1 md:p-1 w-14 md:w-14 text-black  rounded-sm mr-2 text-[12px] font-semibold  self-end md:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const UpDatePopUp = ({ setUpdate }) => {
  const [loading, setLoadng] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    address: "",
    country: "",
    zipcod: "",
    city: "",
    addressType: "",
    phoneNumber: "",
  });
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleOnInputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.country === "" || data.addressType === "" || data.city === "") {
      return toast.error("All Select fileds are required");
    }
    let formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setLoadng(true);

      let res = await fetch(
        "/api/user/add-address",
        {
          method: "POST",

          headers: { "ngrok-skip-browser-warning": "any-value" },
          body: formData,
        },
        { withCredentials: true }
      );

      let resData = await res.json();
      if (!resData.success) {
        setLoadng(false);

        return toast.error(resData.message);
      }
      dispatch(updateUser(resData))

      toast.success(resData.message);
      setLoadng(false);
    } catch (error) {
      setLoadng(false);
      toast(error.message);
    }
  };
  return loading ? (
    <>
      <div className="left-0 top-0 absolute w-screen h-screen  bg-[#00000017] flex  justify-center  ">
        <Loader />
      </div>
    </>
  ) : (
    <div className="flex  justify-center  ">
      <form
        onSubmit={handleSubmit}
        className=" py-1 overflow-auto scrollbar-hide p-1 md:p-1 flex flex-col items-center justify-center w-[60%] md:w-[55%] shadow-lg bg-white  md:h-[60vh] fixed"
      >
        <div className=" gap-2 w-full flex bg-white mt-2 flex-col items-center justify-center  p-1 md:p-2">
          <h1 className=" text-center text-lg md:text-xl font-bold">
            Add Address
          </h1>

          <div className="w-[90%] flex flex-col">
            <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
              Select Country *
            </label>
            <select
              type="text"
              rows={5}
              className=" p-1 md:p-1 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
              id="country"
              placeholder="Enter your email"
              onChange={handleOnInputChange}
              value={data.country}
            >
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option  key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))}
            </select>
          </div>
          <div className="w-[90%] flex flex-col">
            <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
              Select City *
            </label>
            <select
              type="text"
              rows={5}
              className=" p-1 md:p-1 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
              id="city"
              placeholder="Enter your email"
              onChange={handleOnInputChange}
              value={data.city}
            >
              {City &&
                City.getCitiesOfCountry(data.country).map((item) => (
                  <option  key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))}
            </select>
          </div>

          <Input
            label={"Address"}
            type="text"
            value={data.address}
            id="address"
            onChangeHandler={handleOnInputChange}
          />

          <Input
            label={"ZipCod No"}
            type="number"
            value={data.zipcod}
            id="zipcod"
            onChangeHandler={handleOnInputChange}
          />
          <Input
            label={"Phone No"}
            type="number"
            value={data.phoneNumber}
            id="phoneNumber"
            onChangeHandler={handleOnInputChange}
          />

          <div className="w-[90%] flex flex-col">
            <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
              Select Address Type *
            </label>
            <select
              type="text"
              rows={5}
              className=" p-1 md:p-1 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
              id="addressType"
              placeholder="Enter your email"
              onChange={handleOnInputChange}
              value={data.addressType}
            >
              {addressTypeData &&
                addressTypeData.map((item) => (
                  <option  key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>
          </div>
        </div>
        <div className=" self-end mt-3">
          <button
            onClick={() => {
              setUpdate(false);
            }}
            className=" hover:bg-gray-200 shadow-sm border border-gray-200 transition-all duration-300 bg-gray-100 p-1 md:p-1 w-18 md:w-24 text-black  rounded-sm mr-2 text-sm font-semibold  self-end md:text-lg"
          >
            Cencel
          </button>
          <button className=" hover:bg-gray-200 shadow-sm border border-gray-200 transition-all duration-300 bg-gray-100 p-1 md:p-1 w-18 md:w-24 text-black  rounded-sm mr-2 text-sm font-semibold  self-end md:text-lg">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, type, id, onChangeHandler }) => {
  return (
    <div className="  w-full md:w-[90%] flex  flex-col gap-2">
      <label className="  text-sm md:text-lg md:font-semibold text-gray-500">
        {label}
      </label>
      <input
        onChange={onChangeHandler}
        id={id}
        type={type}
        className={`  p-1 md:p-[3px] rounded-lg border border-gray-300 focus:outline-none bg-slate-100 `}
      />
    </div>
  );
};

export default AddressesContent;
