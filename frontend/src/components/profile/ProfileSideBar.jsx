import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../../store/actions/userActions";
function ProfileSideBar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {headers:{'ngrok-skip-browser-warning': 'any-value'}});
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      dispatch(loadUser());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" h-full bg-white shadow-md rounded-md flex flex-col gap-4 items-center md:items-start w-full">
      <SideBarComponent
        icon={<RxPerson size={25} color={`${activeTab === 1 ? "red" : ""}`} />}
        text="Prodile"
        tab={1}
        setActiveTab={setActiveTab}
        color={activeTab === 1 ? "text-red-600" : ""}
      />
      <SideBarComponent
        icon={
          <HiOutlineShoppingBag
            size={25}
            color={`${activeTab === 2 ? "red" : ""}`}
          />
        }
        text="Order"
        tab={2}
        setActiveTab={setActiveTab}
        color={activeTab === 2 ? "text-red-600" : ""}
      />
      <SideBarComponent
        icon={
          <HiOutlineReceiptRefund
            size={25}
            color={`${activeTab === 3 ? "red" : ""}`}
          />
        }
        text="Refunds"
        tab={3}
        setActiveTab={setActiveTab}
        color={activeTab === 3 ? "text-red-600" : ""}
      />
      <SideBarComponent
        icon={
          <MdOutlineTrackChanges
            size={25}
            color={`${activeTab === 4 ? "red" : ""}`}
          />
        }
        text="Track Order"
        tab={4}
        setActiveTab={setActiveTab}
        color={activeTab === 4 ? "text-red-600" : ""}
      />
      <SideBarComponent
        icon={
          <AiOutlineMessage
            size={25}
            color={`${activeTab === 5 ? "red" : ""}`}
          />
        }
        text="Inbox"
        tab={5}
        setActiveTab={setActiveTab}
        color={activeTab === 5 ? "text-red-600" : ""}
      />
      <SideBarComponent
        icon={
          <TbAddressBook size={25} color={`${activeTab === 6 ? "red" : ""}`} />
        }
        text="Address"
        tab={6}
        setActiveTab={setActiveTab}
        color={activeTab === 6 ? "text-red-600" : ""}
      />
      <SideBarComponent
        icon={
          <AiOutlineLogin
            onClick={handleLogout}
            size={25}
            color={`${activeTab === 7 ? "red" : ""}`}
          />
        }
        text="Logout"
        tab={7}
        setActiveTab={setActiveTab}
        color={activeTab === 7 ? "text-red-600" : ""}
        handleLogout={handleLogout}
      />
    </div>
  );
}

const SideBarComponent = ({
  icon,
  text,
  tab,
  setActiveTab,
  color,
  handleLogout,
}) => {
  return (
    <>
      <div
        onClick={() =>
          setActiveTab(Number(tab)) || (handleLogout && handleLogout())
        }
        className=" w-full flex items-center lg:gap-3 md:gap-1 lg:p-4 cursor-pointer hover:bg-gray-100 p-2 "
      >
        {icon}
        <span
          className={` ${color} font-semibold lg:text-xl hidden md:block md:line-clamp-1`}
        >
          {text}{" "}
        </span>
      </div>
    </>
  );
};

export default ProfileSideBar;
