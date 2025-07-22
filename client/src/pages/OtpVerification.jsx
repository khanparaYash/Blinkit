import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";

function OtpVerification() {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) navigate("/forgot-password");
  }, []);
  const valideValue = () => data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
        navigate("/");
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          OTP Verification
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              OTP
            </label>
            <div className="flex gap-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // remove non-digits

                      const newdata = [...data];
                      newdata[index] = value;
                      setData(newdata);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !data[index] && index > 0) {
                        inputRef.current[index - 1].focus();
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData
                        .getData("text")
                        .trim()
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      if (pasted.length === 6) {
                        const arr = pasted.split("");
                        setData(arr);
                        arr.forEach((_, idx) => {
                          if (inputRef.current[idx])
                            inputRef.current[idx].value = arr[idx];
                        });
                        inputRef.current[5].focus();
                      }
                    }}
                    maxLength={1}
                    inputMode="numeric"
                    className="w-full justify-items-center px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue()}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            verify OTP
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

export default OtpVerification;
