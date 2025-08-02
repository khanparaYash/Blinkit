import React, { useState } from "react";
import uploadImage from "../utils/Uploadimage";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

function EditSubCategory({ onclose, EditData, fetchSubCategory }) {
  const [data, setData] = useState({
    _id: EditData._id,
    name: EditData.name,
    image: EditData.image,
    category: EditData.category,
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
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.update_sub_category,
        data,
      });
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategory();
        if (onclose) onclose();
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button onClick={onclose} className="cursor-pointer">
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              onChange={handleChange}
              name="name"
              className="p-3 bg-blue-50 border outline-none focus-within:border-amber-200 rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-400">No Image</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="px-4 py-1 border border-amber-400 text-amber-400 rounded hover:bg-amber-300 hover:text-neutral-900 cursor-pointer  ">
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
          </div>
          <div>
            <div className="grid gap-1">
              {/* display category */}
              <label>Select Category</label>
              <div className="border focus-within:border-amber-200 rounded">
                <div className="flex flex-wrap gap-2">
                  {data.category.map((e) => {
                    return (
                      <div className="flex ">
                        <p
                          className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                          key={e._id}
                        >
                          {e.name}
                        </p>
                        <div
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => handleRemoveCategorySelected(e._id)}
                        >
                          <IoMdClose />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* select category */}

              <select
                className="w-full p-2 bg-transparent outline-none border"
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
          </div>
          <button
            type="submit"
            className={`px-4 py-2 border
                            ${
                              data?.name && data?.image && data?.category[0]
                                ? "bg-amber-300 hover:bg-amber-400"
                                : "bg-gray-200"
                            }    
                            font-semibold
                        `}
          >
            {loading ? "Loading" : "Add Sub Category"}
          </button>
        </form>

        
      </div>
    </section>
  );
}

export default EditSubCategory;
