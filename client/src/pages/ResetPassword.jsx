import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";

import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [passwordshow, setPasswordshow] = useState(false);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const valideValue = () => Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(data.newPassword!==data.confirmPassword){
            toast.error("new Password and confirm password must be same")
            return
        }
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login", { state: data });
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={passwordshow ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="newPassword"
              value={data.newPassword}
              onChange={handleChange}
            />
            <div
              onClick={() => setPasswordshow((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
            >
              {passwordshow ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </div>
          </div>

          <div className="relative">
            <input
              type={passwordshow ? "text" : "password"}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
            <div
              onClick={() => setPasswordshow((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
            >
              {passwordshow ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </div>
          </div>

          <button
            disabled={!valideValue()}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Generate OTP
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Remembed password?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
