import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";

function ForgotPassword() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

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
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otp-verification", { state: data });
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Forgot Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
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
}

export default ForgotPassword;
