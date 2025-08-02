import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";

function Register() {
  const [passwordshow, setPasswordshow] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (data.password !== data.confirmPassword) {
      toast.error("Password and conform Password must be same");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Welcome to Blinkeyit</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label>Name</label>
            <input
              type="text"
              autoFocus
              placeholder="Enter your name"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

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

          <div className="grid gap-1">
            <label>Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={passwordshow ? "text" : "password"}
                placeholder="Create a password"
                className="w-full outline-none"
                name="password"
                value={data.password}
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
            <label>confirm Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={passwordshow ? "text" : "password"}
                placeholder="enter conform password"
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setPasswordshow((prev) => !prev)}
                className=" cursor-pointer"
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
            type="submit"
            className={` ${
              valideValue() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>

        <p>
          Already have account ?{" "}
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

export default Register;
