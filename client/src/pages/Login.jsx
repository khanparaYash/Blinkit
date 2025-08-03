import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";
import Loading from "../components/Loading";

function Login() {
  const [passwordshow, setPasswordshow] = useState(false);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
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
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshtoken", response.data.data.refreshtoken);

        const user = await fetchUserDetails();
        dispatch(setUserDetails(user.data.data));

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosTostError(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      {loading&&(<Loading/>)}
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        {/* <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login Account
        </h2> */}

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
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
                className=" cursor-pointer"
              >
                {passwordshow ? (
                  <IoMdEye size={20} />
                ) : (
                  <IoMdEyeOff size={20} />
                )}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!valideValue()}
            type="submit"
            className={` ${
              valideValue() ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
      
    </section>
  );
}

export default Login;
