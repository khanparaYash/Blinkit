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
  const navigate=useNavigate();

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

  const valideValue=()=>Object.values(data).every(el=>el)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(data.password!==data.confirmPassword){
      toast.error("Password and conform Password must be same")
      return
    }
    try {
      const response=await Axios({
        ...SummaryApi.register,
        data:data
      });
      
      if(response.data.success){
        toast.success(response.data.message)
        setData({
          name:"",
          email:"",
          password:"",
          confirmPassword:""
        })
        navigate("/login")
      }
    } catch (error) {
      AxiosTostError(error)
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label  className="block mb-1 text-sm font-medium text-gray-700">
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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordshow ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <div
                onClick={() => setPasswordshow((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
              >
                {passwordshow ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              confirm Password
            </label>
            <div className="relative">
              <input
                type={passwordshow ? "text" : "password"}
                placeholder="enter conform password"
                className="w-full px-4 py-2 border rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => setPasswordshow((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
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
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
