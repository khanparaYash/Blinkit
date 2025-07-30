import React, { useState } from "react";
import uploadImage from "../utils/Uploadimage";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import AddFieldComponent from "../components/AddFieldComponent";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
// import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

function EditProductAdmin({ onclose, oldData,fetchProductData }) {
  const [data, setData] = useState({
    name: oldData.name || "",
    image: oldData.image || [],
    category: oldData.category || [],
    subCategory: oldData.subCategory || [],
    unit: oldData.unit || "",
    stock: oldData.stock || "",
    price: oldData.price || "",
    discount: oldData.discount || "",
    description: oldData.description || "",
    more_details: oldData.more_details || {},
  });
  const [viewImage, setViewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.subCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    if (!file) return;
    const response = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, response.data.data.url],
      };
    });
    setLoading(false);
  };
  const handleDelete = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.update_product,
        data: {_id:oldData._id,data},
      });
      if (response.data.success) {
        successAlert(response.data.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
        if(!onclose){
            onclose()
        }
        fetchProductData()
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  return (
    <section className="fixed flex justify-center top-30 right-0  left-0 z-10 bottom-0 bg-black/40 ">
      <div className="bg-white   w-ful overflow-scroll max-h-[70vh] p-4 rounded-2xl max-w-3xl">
        <div className="bg-white rounded-xl shadow mb-3 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Product{" "}
            <h1 onClick={onclose} className="border p-2">
              close
            </h1>
          </h2>
        </div>
        <div >
          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="w-full">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                className="border-none bg-blue-50 p-3 w-full"
              />
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="w-full">
                description
              </label>
              <textarea
                id="description"
                type="text"
                placeholder="Enter description"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
                rows={3}
                className="border-none bg-blue-50 p-3 w-full"
              />
            </div>
            {/* image */}
            <div className="mt-2 bg-blue-50">
              <p>Image</p>
              <label
                htmlFor="productImage"
                className="border bg-blue-500 min-h-4 cursor-pointer"
              >
                <div className="text-center flex justify-center h-full items-center">
                  {loading ? "Loading" : <p>upload Image</p>}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </label>
              <div className="flex gap-1 ">
                {data.image.map((img, index) => {
                  return (
                    <div
                      onClick={() => setViewImage(img)}
                      key={index}
                      className="cursor-pointer relative group"
                    >
                      <img src={img} alt="" className="max-h-4 " />
                      <div
                        onClick={() => handleDelete(index)}
                        className="absolute bottom-0 right-0 bg-red-400 rounded hidden group-hover:block cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* category */}
            <div className="flex flex-col">
              <p>Category</p>
              <div className="mt-2 bg-blue-50">
                <select
                  value={selectCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    const category = allCategory.find((el) => el._id === value);
                    setData((prev) => {
                      return {
                        ...prev,
                        category: [...prev.category, category],
                      };
                    });
                    setSelectCategory("");
                  }}
                >
                  <option value="">select</option>
                  {allCategory.map((c, index) => {
                    return (
                      <option key={index} value={c?._id}>
                        {c.name}
                      </option>
                    );
                  })}
                </select>
                <div className="flex gap-3">
                  {data.category.map((c, index) => {
                    return (
                      <div
                        key={c._id + index}
                        className="flex  items-center gap-1"
                      >
                        <p>{c.name}</p>{" "}
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            handleRemoveCategory(index);
                          }}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* subcategory */}
            <div className="flex flex-col">
              <p>sub Category</p>
              <div className="mt-2 bg-blue-50">
                <select
                  value={selectSubCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    const subcategory = allSubCategory.find(
                      (el) => el._id === value
                    );
                    setData((prev) => {
                      return {
                        ...prev,
                        subCategory: [...prev.subCategory, subcategory],
                      };
                    });
                    setSelectSubCategory("");
                  }}
                >
                  <option value="">select</option>
                  {allSubCategory.map((c, index) => {
                    return (
                      <option key={index} value={c?._id}>
                        {c.name}
                      </option>
                    );
                  })}
                </select>

                <div className="flex gap-3">
                  {data.subCategory.map((c, index) => {
                    return (
                      <div
                        key={c._id + index}
                        className="flex  items-center gap-1"
                      >
                        <p>{c.name}</p>{" "}
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            handleRemoveSubCategory(index);
                          }}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* unit */}
            <div className="flex flex-col">
              <label htmlFor="unit" className="w-full">
                Unit
              </label>
              <input
                id="unit"
                type="text"
                placeholder="Enter unit"
                name="unit"
                value={data.unit}
                onChange={handleChange}
                required
                className="border-none bg-blue-50 p-3 w-full"
              />
            </div>
            {/* stock */}
            <div className="flex flex-col">
              <label htmlFor="stock" className="w-full">
                stock
              </label>
              <input
                id="stock"
                type="Number"
                placeholder="Enter stock"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                required
                className="border-none bg-blue-50 p-3 w-full"
              />
            </div>
            {/* price */}
            <div className="flex flex-col">
              <label htmlFor="price" className="w-full">
                price
              </label>
              <input
                id="price"
                type="Number"
                placeholder="Enter price"
                name="price"
                value={data.price}
                onChange={handleChange}
                required
                className="border-none bg-blue-50 p-3 w-full"
              />
            </div>
            {/* discount */}
            <div className="flex flex-col">
              <label htmlFor="discount" className="w-full">
                discount
              </label>
              <input
                id="discount"
                type="Number"
                placeholder="Enter discount"
                name="discount"
                value={data.discount}
                onChange={handleChange}
                required
                className="border-none bg-blue-50 p-3 w-full"
              />
            </div>
            {/* add more field */}
            <div>
              {Object?.keys(data?.more_details)?.map((k) => {
                return (
                  <div className="flex flex-col">
                    <label htmlFor={k} className="w-full">
                      {k}
                    </label>
                    <input
                      id={k}
                      type="text"
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        return {
                          ...e,
                          more_details: {
                            ...e.more_details,
                            [k]: value,
                          },
                        };
                      }}
                      required
                      className="border-none bg-blue-50 p-3 w-full"
                    />
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => setOpenAddField(true)}
              className="bg-amber-300 mt-2 cursor-pointer py-2 px-3"
            >
              Add Fields
            </div>
            <button>Edit Product</button>
          </form>
        </div>
        {viewImage && (
          <ViewImage
            url={viewImage}
            close={() => {
              setViewImage("");
            }}
          />
        )}
        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onchange={(e) => {
              setFieldName(e.target.value);
            }}
            close={() => setOpenAddField(false)}
            submit={handleAddField}
          />
        )}
      </div>
    </section>
  );
}

export default EditProductAdmin;
