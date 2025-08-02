import React, { useState } from "react";
import uploadImage from "../utils/Uploadimage";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function EditCategory({ dataEdit: edit, onclose }) {
  const [data, setData] = useState({
    _id: edit._id,
    name: edit.name,
    image: edit.image,
  });
  const [loading, setLoding] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoding(true);
      console.log(data);

      const response = await Axios({
        ...SummaryApi.update_category,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(response.data.message);
        onclose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  const handleUploadCategory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoding(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
    setLoding(false);
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Update Category</h1>
          <button onClick={()=>{onclose()}} className="cursor-pointer w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                        ${
                          !data.name
                            ? "bg-gray-300"
                            : "border-amber-300 hover:bg-amber-200"
                        }  
                            px-4 py-2 rounded cursor-pointer border font-medium
                        `}
                >
                  {loading ? "Loading" : "upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategory}
                  type="file"
                  className="hidden"
                  id="uploadCategoryImage"
                />
              </label>
            </div>
          </div>
          <button
            className={`
                ${
                  data.name && data.image
                    ? "bg-amber-300 hover:bg-amber-200"
                    : "bg-gray-300 "
                }
                py-2    
                font-semibold 
                `}
          >
            {loading ? "Loading" : "Update Category"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditCategory;
