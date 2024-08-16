import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import {
  deleteShopEvent,
  deletehopItem,
  getAllShopEvents,
} from "../../../store/actions/shopAction.js";
function DashAllEvents({ active, setActive }) {
  const {
    shopData,
    allShopEvents,
    isAllShopEventsloading,
    isDeleteShopEventloading,
  } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const handleProductDelete = async (id) => {
    dispatch(deleteShopEvent(id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "price", headerName: "Product Price", minWidth: 150, flex: 0.7 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.7 },
    { field: "sold", headerName: "Sold Out", minWidth: 150, flex: 0.7 },
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
            <Link to={`/event/${params.id}`}>
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
            <button onClick={() => handleProductDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];
  allShopEvents &&
    allShopEvents.length > 0 &&
    allShopEvents.forEach((pro) => {
      rows.push({
        id: pro._id,
        price: "$" + pro.discountedPrice,
        stock: pro.sold ? pro.sold : 0,
        sold: pro.sold,
      });
    });

  useEffect(() => {
    const Id = shopData && shopData.shop._id;
    dispatch(getAllShopEvents(Id));
  }, [dispatch, deleteShopEvent, isDeleteShopEventloading]);

  return isAllShopEventsloading || isDeleteShopEventloading ? (
    <Loader />
  ) : (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={2} checkboxSelection />
    </div>
  );
}

export default DashAllEvents;
