import React, { useState } from "react";
import uploadImage from "../utils/Uploadimage";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";

function EditCategory({fetchdata,dataEdit:edit, onclose }) {
  const [data, setData] = useState({
    _id:edit._id,
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
        fetchdata();
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
    setLoding(true)
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
    setLoding(false)
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Update Category</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <p>Image</p>
            <div className="border bg-blue-50 h-36 w-36 flex items-center justify-center">
              {data.image ? (
                <img
                  src={data.image}
                  alt=""
                  className="w-full h-full  object-scale-down"
                />
              ) : (
                <p className="text-sm">No Image</p>
              )}
            </div>
            <label htmlFor="uploadCategoryImage">
              <div
                className={`${
                  !data.name ? "bg-gray-100" : "bg-blue-500"
                } px-4 w-fit py-2 my-1 rounded-2xl cursor-pointer`}
              >
                {
                  loading?("Loading"):("upload Image")
                }
                
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
          <button className="border border-amber-600 p-2 rounded-2xl hover:bg-amber-300">{loading ? "Loading" : "Update Category"}</button>
        </form>

        <div className="flex justify-end">
          <button
            onClick={onclose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
