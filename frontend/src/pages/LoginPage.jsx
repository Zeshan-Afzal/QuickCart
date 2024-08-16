import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/Header";

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, []);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
        { withCredentials: true }
      );
      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      dispatch(loadUser());
      navigate("/");
    } catch (error) {
      console.log(error);
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
          <h1 className=" font-bold text-2xl ">Login to your account</h1>
        </div>
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

        <div className=" flex justify-between self-start w-full px-5 md:px-12">
          <div className="flex gap-2 ">
            <input type="checkbox" name="" id="remember" />
            <span className=" text-gray-500 text-sm ">Remember me</span>
          </div>
          <p className=" text-blue-700  hover:underline cursor-pointer text-sm">
            Forget password?
          </p>
        </div>
        <button className=" p-2 bg-blue-600 font-semibold text-white rounded-lg  w-4/5">
          Login
        </button>

        <div className=" w-4/5 flex mb-12">
          <span className=" text-gray-500 ">
            Dont have any account?{" "}
            <Link className=" text-blue-700" to="/sign-up">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
