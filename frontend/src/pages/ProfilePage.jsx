import React, { useState } from "react";
import ProfileSideBar from "../components/profile/ProfileSideBar";
import ProfileContent from "../components/profile/ProfileContent";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="  grid grid-cols-6 gap-2   ">
      <div className=" col-span-1   ">
        <ProfileSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="  col-span-5 ">
        <ProfileContent activeTab={activeTab} />
      </div>
    </div>
  );
}

export default ProfilePage;
