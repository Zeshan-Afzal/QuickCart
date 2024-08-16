import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import Header from "../components/layout/Header";
import { useSelector } from "react-redux";

function SellerSignUp() {
  const navigate = useNavigate();
  const { isSeller, shopData } = useSelector((state) => state.shop);

  const [imgurl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    shopName: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (isSeller) {
      return navigate(`/shop/${shopData.shop._id}`);
    }
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("shopName", formData.shopName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("zipCode", formData.zipCode);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("password", formData.password);
    if (file) {
      formDataToSend.append("avatar", file);
    }
    console.log(formData);
    console.log(formDataToSend);

    try {
      const res = await fetch(
        "/api/shop/create-shop",
        {
          method: "POST",

          headers:{ 'ngrok-skip-browser-warning': 'any-value'},
          body: formDataToSend,
        },
        
        { withCredentials: true }
      );
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("somthing went wrong");
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className=" w-full md:max-w-[830px]  mx-auto flex flex-col items-center gap-4 bg-white  shadow-md  border-gray-200 border rounded-lg mt-10 pt-12"
      >
        <div className=" text-center">
          <h1 className=" font-bold text-3xl">Create Shop</h1>
        </div>
        <Input
          type="text"
          label="Shop Name"
          id="shopName"
          placeholder="Enter shop name"
          handleOnChange={handleOnChange}
          value={formData.shopName}
        />
        <Input
          type="email"
          label="Email"
          id="email"
          placeholder="Enter your email"
          handleOnChange={handleOnChange}
          value={formData.email}
        />
        <Input
          type="number"
          label="Phone Number"
          id="phoneNumber"
          placeholder="Enter your phone number"
          handleOnChange={handleOnChange}
          value={formData.phoneNumber}
        />
        <Input
          type="text"
          label="Address"
          id="address"
          placeholder="Enter your address"
          handleOnChange={handleOnChange}
          value={formData.address}
        />
        <Input
          type="text"
          label="Zipcode"
          id="zipCode"
          placeholder="Enter your zipcode"
          handleOnChange={handleOnChange}
          value={formData.zipCode}
        />

        <Input
          type="password"
          label="Password"
          id="password"
          placeholder="Enter your password"
          handleOnChange={handleOnChange}
          value={formData.password}
        />

        <div className="flex self-start pl-9 md:pl-20 items-center ">
          {imgurl ? (
            <img
              src={imgurl}
              alt="img"
              className=" rounded-full w-10  h-10 inline"
            />
          ) : (
            <CgProfile className=" text-2xl md:text-3xl" />
          )}
          <label
            htmlFor="file"
            className=" border border-gray-300 p-1 md:p-3 rounded-lg inline ml-4 bg-white cursor-pointer"
          >
            <input
              type="file"
              name=""
              id="file"
              hidden
              accept="jpg, png, jpeg"
              onChange={(e) => setFile(e.target.files[0])}
            />
            uploade file
          </label>
        </div>
        <button className=" p-2 md:p-4 bg-blue-600 font-semibold text-white rounded-lg  w-4/5">
          Create
        </button>

        <div className=" w-4/5 flex mb-12">
          <span className=" text-gray-500 ">
            Already have a shop?{" "}
            <Link className=" text-blue-700" to="/shop-sign-in">
              Login
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default SellerSignUp;
