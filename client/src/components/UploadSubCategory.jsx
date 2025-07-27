import React, { useState } from "react";
import uploadImage from "../utils/Uploadimage";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";

function UploadSubCategory({ onclose }) {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleloadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setLoading(true);
    const response = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        image: response.data.data.url,
      };
    });
    setLoading(false);
  };
  const handleRemoveCategorySelected = (categoryId) => {

    setData((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el._id != categoryId),
    }));
  };
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.add_sub_category,
        data,
      });
      console.log(response);
      
      if (response.data.success) {
        toast.success(response.data.message);
        if (onclose) onclose();
      }
    } catch (error) {
        AxiosTostError(error)
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Sub Category</h3>

        <form onSubmit={handleSubmitSubCategory}>
          <div>
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              onChange={handleChange}
              name="name"
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
            <label htmlFor="uploadSubCategoryImage">
              <div
                className={`${
                  !data.name ? "bg-gray-100" : "bg-blue-500"
                } px-4 w-fit py-2 my-1 rounded-2xl cursor-pointer`}
              >
                upload Image
              </div>
              <input
                disabled={!data.name}
                onChange={handleloadSubCategoryImage}
                type="file"
                className="hidden"
                id="uploadSubCategoryImage"
              />
            </label>
          </div>
          <div>
            <div className="flex">
              {/* display category */}
              {data.category.map((e) => {
                return (
                  <div className="flex ">
                    <p key={e._id}>{e.name}</p>
                    <div
                      className="text-center cursor-pointer"
                      onClick={() => handleRemoveCategorySelected(e._id)}
                    >
                      <IoMdClose />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* select category */}
            <label>Select Category</label>
            <select
              className="bg-blue-50 border p-2"
              onChange={(e) => {
                const value = e.target.value;
                const categoryDetails = allCategory.find(
                  (el) => el._id == value
                );
                setData((prev) => {
                  // if(prev.category.find((el)=>el._id==categoryDetails?._id))return
                  return {
                    ...prev,
                    category: [...prev.category, categoryDetails],
                  };
                });
              }}
            >
              <option value="" disabled selected>
                Select Category
              </option>

              {allCategory.map((category, index) => {
                return (
                  <option value={category._id} key={category._id + index}>
                    {category?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className={`${
              data.name && data.image && data.category[0]
                ? "bg-amber-400"
                : "bg-gray-500"
            }`}
          >
            {loading ? "Loading" : "Add Sub Category"}
          </button>
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

export default UploadSubCategory;
