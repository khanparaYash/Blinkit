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
      console.log(response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        console.log(response.data);
        
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label>OTP</label>
            <div className="flex items-center gap-2 justify-between mt-3">
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
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue()}
            type="submit"
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            verify OTP
          </button>
        </form>

        <div>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OtpVerification;
