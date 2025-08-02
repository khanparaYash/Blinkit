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

function UploadProduct() {
  const [data, setData] = useState({
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
        image: [...prev.image, response?.data?.data?.url],
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
        ...SummaryApi.add_product,
        data: data,
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
        // toast.success(response.data.message)
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  return (
    <section className="md:w-2xl lg:w-2xl">
      <div className="p-2   bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4 " onSubmit={handleSubmit}>
          {/* name */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
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
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded"
            />
          </div>
          {/* description */}
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
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
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded resize-none"
            />
          </div>
          {/* image */}
          <div>
            <p className="font-medium">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
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
            </div>

            <div className="flex flex-wrap gap-4 ">
              {data.image.map((img, index) => {
                return (
                  <div
                    onClick={() => setViewImage(img)}
                    key={index}
                    className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-scale-down cursor-pointer"
                    />
                    <div
                      onClick={() => handleDelete(index)}
                      className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* category */}
          <div className="grid gap-1">
              <label className='font-medium'>Category</label>
            <div className="mt-2 bg-blue-50">
              <select
              className='bg-blue-50 border w-full p-2 rounded'
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
              <div className='flex flex-wrap gap-3'>
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>{" "}
                      <div
                        className="hover:text-red-500 cursor-pointer"
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
          <div className="grid gap-1">
             <label className='font-medium'>Sub Category</label>
            <div >
              <select
              className="bg-blue-50 border w-full p-2 rounded"
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
                <option value="" className="text-neutral-600">select</option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>{" "}
                      <div
                        className="hover:text-red-500 cursor-pointer"
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
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
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
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded"
            />
          </div>
          {/* stock */}
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              stock
            </label>
            <input
              id="stock"
              type="Number"
              placeholder="Enter stock"
              name="stock"
               onWheel={(e) => e.target.blur()}
              inputMode="numeric"
             
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded"
            />
          </div>
          {/* price */}
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              price
            </label>
            <input
              id="price"
              type="number"
              onWheel={(e) => e.target.blur()}
              inputMode="numeric"
              placeholder="Enter price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-300 rounded"
            />
          </div>
          {/* discount */}
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              discount
            </label>
            <input
              id="discount"
              type="Number"
               onWheel={(e) => e.target.blur()}
              inputMode="numeric"
             
              placeholder="Enter discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded"
            />
          </div>
          {/* add more field */}
          <div>
            {Object?.keys(data?.more_details)?.map((k) => {
              return (
                <div className="flex flex-col">
                  <label htmlFor={k} className="font-medium">
                    {k}
                  </label>
                  <input
                    id={k}
                    type="text"
                    name={k}
                    value={data?.more_details[k]}
                    className="bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded"
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((prev) => ({
                        ...prev,
                        more_details: {
                          ...prev.more_details,
                          [k]: value,
                        },
                      }));
                    }}
                    // onChange={(e) => {
                    // const value = e.target?.value;
                    // setData((e)=>{
                    //   ...e,
                    //   e.more_details: {
                    //     ...e.more_details,
                    //     [k]: value,
                    //   },
                    // })
                    // return {
                    //   ...e,
                    //   more_details: {
                    //     ...e.more_details,
                    //     [k]: value,
                    //   },
                    // };
                    // }}
                    required
                    
                  />
                </div>
              );
            })}
          </div>
          <div
            onClick={() => setOpenAddField(true)}
            className="hover:bg-amber-300 bg-white py-1 px-3 w-32 text-center font-semibold border border-amber-300 hover:text-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>
          <button className="bg-amber-300 hover:bg-amber-400 py-2 rounded font-semibold">submit</button>
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
    </section>
  );
}

export default UploadProduct;
