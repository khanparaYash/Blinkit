import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";
function UserMenu({ close }) {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  
  const handelLogOut = async () => {
    try {
      const responce = await Axios({
        ...SummaryApi.logout,
      });
      if (responce?.data?.success) {
        close();
        dispatch(logout());
        localStorage.clear();
        toast.success(responce.data.message);
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4 space-y-4 text-gray-700 text-sm">
      <div className="text-xl font-semibold border-b pb-2">My Account</div>

      <div className="text-base text-gray-800 font-medium">
        {user?.name || user?.mobile}
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Link
          to=""
          className="hover:text-blue-600 transition-colors duration-200"
        >
          My Orders
        </Link>
        <Link
          to=""
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Saved Address
        </Link>
        <button
          onClick={handelLogOut}
          className="text-left text-red-500 hover:text-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
