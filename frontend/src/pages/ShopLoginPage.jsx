import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/Header";
import { loadShop } from "../store/actions/shopAction";

function ShopLoginPage() {
  const { isSeller, shopData } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isSeller) return navigate(`/shop/${shopData.shop._id}`);
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/shop/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             'ngrok-skip-browser-warning': 'any-value'
          },

          body: JSON.stringify(formData),
        },
        { withCredentials: true }
      );
      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      dispatch(loadShop());
      navigate(`/shop-dash/${data.shop._id}`);
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
        className="w-full md:max-w-[830px]  mx-auto flex flex-col items-center gap-4 bg-white  shadow-md  border-gray-200 border rounded-lg mt-10 pt-12"
      >
        <div className=" text-center">
          <h1 className=" font-bold text-3xl">Login to your shop</h1>
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

        <div className=" flex justify-between self-start w-full px-5 md:px-20">
          <div className="flex gap-2 ">
            <input type="checkbox" name="" id="remember" />
            <span className=" text-gray-500 text-sm  md:text-lg">
              Remember me
            </span>
          </div>
          <p className=" text-blue-700  hover:underline cursor-pointer text-sm  md:text-lg">
            Forget password?
          </p>
        </div>
        <button className=" p-2 md:p-4 bg-blue-600 font-semibold text-white rounded-lg  w-4/5">
          Login
        </button>

        <div className=" w-4/5 flex mb-12">
          <span className=" text-gray-500 ">
            Dont have shop?{" "}
            <Link className=" text-blue-700" to="/sign-up">
              create shop
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default ShopLoginPage;
