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
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Forgot Password </p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={!valideValue()}
            type="submit"
            className={` ${
              valideValue() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Generate OTP
          </button>
        </form>

        <p>
          Remember Password?{" "}
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
}

export default ForgotPassword;
