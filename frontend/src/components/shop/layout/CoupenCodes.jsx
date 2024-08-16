import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

import Loader from "../../layout/Loader";

import { Link, useNavigate } from "react-router-dom";
import Input from "../../Input";
import { CgProfile } from "react-icons/cg";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../static/data";
import { toast } from "react-toastify";
import {
  deletehopCoupon,
  deletehopItem,
  getAllShopCoupons,
  getAllShopItems,
} from "../../../store/actions/shopAction.js";
import { RxCross1 } from "react-icons/rx";

function CoupenCodes({ active }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { isSeller, shopData } = useSelector((state) => state.shop);

  const [formData, setFormData] = useState({
    name: "",
    selectProduct: "",
    discount: "",
    minPrice: "",
    maxPrice: "",
  });

  const [popUpFormOpen, setPopUpFormOpen] = useState(false);

  const {
    allShopProducts,
    allShopCoupons,
    isAllShopCouponsLoading,
    isDeleteShopCouponLoading,
  } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const handleCouponDelete = async (id) => {
    dispatch(deletehopCoupon(id));
  };

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "coupon Name", minWidth: 150, flex: 0.7 },
    { field: "discount", headerName: "Coupon Value", minWidth: 150, flex: 0.7 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <button>
                <AiOutlineEye size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button onClick={() => handleCouponDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];
  allShopCoupons &&
    allShopCoupons.length > 0 &&
    allShopCoupons.forEach((pro) => {
      rows.push({
        id: pro._id,
        name: pro.name,
        discount: pro.discount + "%",
      });
    });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") {
        formDataToSend.append(key, value);
      }
    });
    formDataToSend.append("shopId", shopData && shopData.shop._id);

    try {
      setLoading(true);

      const res = await fetch(
        "/api/shop/create-coupon",
        {
          method: "POST",
          headers: { 'ngrok-skip-browser-warning': 'any-value' },
          body: formDataToSend,
        },
        { withCredentials: true }
      );

      const data = await res.json();
      if (!data.success) {
        setLoading(false);
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setLoading(false);
        setPopUpFormOpen(false);
        Object.entries(formData).forEach(([key]) => {
          if (key !== "images") {
            formData[key] = "";
          }
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const Id = shopData && shopData.shop._id;
    dispatch(getAllShopItems(Id));
    dispatch(getAllShopCoupons(Id));
  }, [dispatch, deletehopCoupon, isDeleteShopCouponLoading]);

  return isAllShopCouponsLoading || isDeleteShopCouponLoading ? (
    <Loader />
  ) : (
    <div className=" w-full relative ">
      {popUpFormOpen && (
        <div className=" absolute top-[5%] z-10 w-[90%] left-[5%] h-[70vh%] md:top-[10%] md:left-[20%] md:w-[50%] md:h[70vh] py-10 bg-white rounded-md shadow-sm flex items-center justify-center">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50 cursor-pointer"
            onClick={() => setPopUpFormOpen(false)}
          />

          <form
            onSubmit={handleSubmit}
            className=" w-full flex flex-col items-center gap-4 justify-center overflow-auto scrollbar-hide"
          >
            <div className=" text-center">
              <h1 className=" font-bold text-lg md:text-2xl xl:md:text-3xl">
                Create Product
              </h1>
            </div>
            <Input
              type="text"
              label="Coupon Code Name *"
              id="name"
              placeholder="Enter product discription"
              handleOnChange={handleOnChange}
              value={formData.name}
            />

            <Input
              type="number"
              label="Discount amount"
              id="discount"
              placeholder="Enter your address"
              handleOnChange={handleOnChange}
              value={formData.discount}
            />
            <Input
              type="number"
              label="Min amount *"
              id="minPrice"
              placeholder="Enter your zipcode"
              handleOnChange={handleOnChange}
              value={formData.minPrice}
            />

            <Input
              type="number"
              label="Max amount *"
              id="maxPrice"
              placeholder="Enter your password"
              handleOnChange={handleOnChange}
              value={formData.maxPrice}
            />
            <div className="w-11/12 md:w-4/5 flex flex-col">
              <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
                Select Product *
              </label>
              <select
                type="text"
                rows={5}
                className=" p-1 md:p-2 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
                id="selectProduct"
                placeholder="Enter your email"
                onChange={handleOnChange}
                value={formData.selectProduct}
              >
                <option value="choose">choose a product</option>
                {allShopProducts &&
                  allShopProducts.map((item, i) => (
                    <option
                      className="rounded-md bg-slate-100"
                      key={i}
                      value={item.productName}
                    >
                      {item.productName}
                    </option>
                  ))}
              </select>
            </div>

            <button className=" mb-9 p-1 md:p-4 bg-blue-600 font-semibold text-white rounded-lg w-4/5">
              {loading ? "Creating..." : "Create Code"}
            </button>
          </form>
        </div>
      )}
      <div className="">
        <button
          onClick={() => setPopUpFormOpen(true)}
          className=" p-1 md:p-3 font-semibold bg-white text-black border border-gray-200 rounded-md my-5 ml-5"
        >
          Create Code
        </button>
      </div>
      <div
        style={{
          height: 400,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
    </div>
  );
}

export default CoupenCodes;
