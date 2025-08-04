import React  from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { AxiosTostError } from "../utils/AxiosToastError";
import { SummaryApi } from "../common/SummaryApi";
import { Axios } from "./../utils/Axios";
import { updateAvatar } from "../store/userSlice";
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../provider/GlobalProvider";

function UserProfileAvatarEdit({ close }) {
  const user = useSelector((state) => state?.user);
  
  const {setLoading}=useGlobalContext()
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventdefault();
  };
  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.upload_avatar,
        data: formData,
      });

      dispatch(updateAvatar(response.data.data.avatar));
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-neutral-900/60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={() => close()}
          className="text-neutral-800 cursor-pointer w-fit block ml-auto"
        >
          <IoMdClose size={20} />
        </button>
        <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className='w-full h-full'
            />
          ) : (
            <CgProfile size={65}/>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-200 cursor-pointer hover:bg-primary-200 px-4 py-1 rounded text-sm my-3">
              upload
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
