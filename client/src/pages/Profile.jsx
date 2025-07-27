import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
function Profile() {
  const user = useSelector((state) => state.user);
  const [openAvatarEdit,setOpenAvatarEdit]=useState(false);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div >
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-20 min-h-20 rounded-full border object-cover"
            />
          ) : (
            <CgProfile className="w-24 h-24 rounded-full  object-cover" />
          )}
          <button onClick={()=>{setOpenAvatarEdit(prev=>!prev)}} className="px-4  w-full rounded-2xl py-1  my-3 bg-blue-600 text-white rounded hover:bg-blue-700">
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
              {user?.last_login_date || "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {user?.status || "Active"}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <Link
              to="/dashboard/profile/edit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </Link>
            <Link
              to="/dashboard/profile/change-password"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Change Password
            </Link>
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
