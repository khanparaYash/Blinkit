import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";
import { FiExternalLink } from "react-icons/fi";
import isAdmin from "../utils/isAdmin";
import { useGlobalContext } from "../provider/GlobalProvider";

function UserMenu({ close }) {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {setLoading}=useGlobalContext()
  const handelLogOut = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response?.data?.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosTostError(error);
    }finally{
      setLoading(false)
    }
  };
  const handelCloseUserMenu = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className=" font-semibold  ">My Account</div>
      <div className="max-w-52 text-ellipsis line-clamp-1 flex items-center gap-2 justify-self-start">
        <span className="text-base text-gray-800 pb-2 w-full border-b font-medium">
          {user?.name || user?.mobile} {isAdmin(user.role) ? "(Admin)" : ""}
        </span>
          <Link  className='hover:text-amber-400 ' onClick={handelCloseUserMenu} to={"/dashboard/profile"} size>
            <FiExternalLink size={18} />
          </Link>
      </div>

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <>
            <Link
              onClick={handelCloseUserMenu}
              to="/dashboard/category"
              className="px-2 hover:bg-orange-200 py-1"
            >
              Category
            </Link>
            <Link
              onClick={handelCloseUserMenu}
              to="/dashboard/sub-category"
              className="px-2 hover:bg-orange-200 py-1"
            >
              Sub Category
            </Link>
            <Link
              onClick={handelCloseUserMenu}
              to="/dashboard/upload-product"
              className="px-2 hover:bg-orange-200 py-1"
            >
              Upload Product
            </Link>
            <Link
              onClick={handelCloseUserMenu}
              to="/dashboard/product"
              className="px-2 hover:bg-orange-200 py-1"
            >
              Product
            </Link>
          </>
        )}
        <Link
          onClick={handelCloseUserMenu}
          to="/dashboard/myOrders"
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          onClick={handelCloseUserMenu}
          to="/dashboard/address"
          className="px-2 hover:bg-orange-200 py-1"
        >
          Saved Address
        </Link>
        <button
          onClick={handelLogOut}
          className="text-left  px-2 hover:bg-orange-200 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
