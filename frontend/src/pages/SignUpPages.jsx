import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import Header from "../components/layout/Header";
import { useSelector } from "react-redux";

function SignUpPages() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [imgurl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
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
 
    
    Object.entries(formData).forEach(([key, value]) => {
    
      formDataToSend.append(key, value);
      
    });
  console.log(file)

    if (file) {
      formDataToSend.append("avatar", file);
    }

    Object.entries(formData).forEach(([key, value]) => {
    
      console.log(key, value);
      
    });


    try {
      const res = await fetch(
        "/api/user/sign-up",
        {
          method: "POST",

          body: formDataToSend,
          headers:{
             'ngrok-skip-browser-warning': 'any-value'
          }
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
        className=" w-[90%] md:max-w-[480px]  mx-auto flex flex-col items-center gap-4 bg-white  shadow-sm  border-gray-200 border rounded-lg mt-10 pt-12"
      >
        <div className=" text-center">
          <h1 className=" font-bold text-2xl ">Sign up</h1>
        </div>
        <Input
          type="text"
          label="name"
          id="fullName"
          placeholder="Enter your username"
          handleOnChange={handleOnChange}
          value={formData.fullName}
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
          type="password"
          label="Password"
          id="password"
          placeholder="Enter your password"
          handleOnChange={handleOnChange}
          value={formData.password}
        />

        <div className="flex self-start pl-12 items-center ">
          {imgurl ? (
            <img
              src={imgurl}
              alt="img"
              className=" rounded-full w-10  h-10 inline"
            />
          ) : (
            <CgProfile className=" text-2xl" />
          )}
          <label
            htmlFor="file"
            className=" border border-gray-300 p-1 rounded-lg inline ml-4 bg-white"
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
        <button className=" p-2 bg-blue-600 font-semibold text-white rounded-lg  w-4/5">
          Sign up
        </button>

        <div className=" w-4/5 flex mb-12">
          <span className=" text-gray-500 ">
            Already have account?{" "}
            <Link className=" text-blue-700" to="/login">
              Login
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default SignUpPages;
