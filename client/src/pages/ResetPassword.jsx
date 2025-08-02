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
      if (data.newPassword !== data.confirmPassword) {
        toast.error("new Password and confirm password must be same");
        return;
      }
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: {data},
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
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter Your Password </p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={passwordshow ? "text" : "password"}
                placeholder="Create a password"
                className="w-full outline-none"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setPasswordshow((prev) => !prev)}
                className="cursor-pointer"
              >
                {passwordshow ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={passwordshow ? "text" : "password"}
                placeholder="Create a password"
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setPasswordshow((prev) => !prev)}
                className="cursor-pointer"
              >
                {passwordshow ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue()}
            className={` ${
              valideValue() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
