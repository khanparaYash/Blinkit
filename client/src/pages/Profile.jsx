import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
function Profile() {
  const user = useSelector((state) => state.user);
  const [openAvatarEdit,setOpenAvatarEdit]=useState(false);
  return (
    <div className="max-w-4xl mx-auto mt-5 p-6 bg-white rounded-xl shadow-md ">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className=" w-full h-full rounded-full border object-cover"
            />
          ) : (
            <CgProfile className="rounded-full  object-cover" />
          )}
          <button onClick={()=>{setOpenAvatarEdit(prev=>!prev)}} className="px-4  w-full rounded-2xl py-1  my-3 bg-green-700 text-white rounded hover:bg-green-800">
            edit
          </button>
        </div>
        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-600">📱 {user?.mobile}</p>

          {/* Status & role */}
          <div className="mt-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Email Verified:</span>{" "}
              {user?.verify_email ? (
                <span className="text-green-600">Yes</span>
              ) : (
                <span className="text-red-600">No</span>
              )}
            </p>
            <p>
              <span className="font-medium">Last Login:</span>{" "}
              { new Date(user?.last_login_date).toLocaleString() || "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {user?.status || "Active"}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <div
              onClick={()=>{""}}
              
              className="cursor-not-allowed  px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              >
              Edit Profile
            </div>
            <div
              onClick={()=>{""}}
              
              className="cursor-not-allowed px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Change Password
            </div>
          </div>
        </div>
      </div>
      {
        openAvatarEdit&&(
          <UserProfileAvatarEdit close={()=>setOpenAvatarEdit(false)}/>
        )
      }
    </div>
  );
}

export default Profile;
