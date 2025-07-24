import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {AxiosTostError} from "../utils/AxiosToastError"
import { SummaryApi } from "../common/SummaryApi";
import { Axios } from "./../utils/Axios";
import { updateAvatar } from "../store/userSlice";
import { IoMdClose } from "react-icons/io";

function UserProfileAvatarEdit({close}) {
  const user = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventdefault();
  };
  const handleUploadAvatarImage = async (e) => {
    
    const file = e.target.files[0];
    if(!file)return
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.upload_avatar,
        data: formData,
      });
      console.log(response);
      
      dispatch(updateAvatar(response.data.data.avatar))
    } catch (error) {
      AxiosTostError(error)
    } finally {
      setLoading(false);
    }

  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0  inset-0 bg-black/10 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded-2xl p-4 flex flex-col  items-center justify-center">
        <IoMdClose onClick={()=>close()} size={30} className=" ml-auto cursor-pointer"/>
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-20 min-h-20 rounded-full border object-cover"
          />
        ) : (
          <CgProfile className="w-24 h-24 rounded-full  object-cover" />
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="px-4  min-w-22 rounded-2xl py-1  my-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">
              {loading ? "Loading" : "upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
}

export default UserProfileAvatarEdit;
