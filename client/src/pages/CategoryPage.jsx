import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";
import { removeCategory, setAllCategory, setLoadingCategory } from "../store/ProductSlice";

function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openUploadCategory, setUploadCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
const dispatch=useDispatch()
  const allCategory = useSelector((state) => state?.product?.allCategory);

  useEffect(() => {
    setLoading(true);
    setData(allCategory);
    setLoading(false);
  }, [allCategory]);

  const fetchCategory = async () => {
      try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
          ...SummaryApi.get_Category,
        });
        const { data: responseData } = response;
        
        if (responseData?.success) dispatch(setAllCategory(responseData?.data));
  
      } catch (error) {
        console.log(error);
      }finally{
        dispatch(setLoadingCategory(false))
      }
    };

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
      ...SummaryApi.delete_category,
      data: editData,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(removeCategory(editData._id));
      setOpenConfirm(false);
    }
  } catch (error) {
    AxiosTostError(error)
    setOpenConfirm(false);
    }
  };
  return (
    <section className="min-h-screen bg-gray-100 p-4 ">
      <div className="bg-white rounded-xl shadow mb-3 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Category</h2>
        <button
          onClick={() => setUploadCategory((pre) => !pre)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Category
        </button>
      </div>
      {!data[0] && !loading && <p>No data</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {data.map((element, index) => {
          return (
            <div className="w-40 group h-56  " key={index}>
              <img src={element.image} className="w-52 " alt="" />
              <h1>{element.name}</h1>
              <div className="flex items-center h-9">
                <button
                  onClick={() => {
                    setOpenEdit((prev) => !prev), setEditData(element);
                  }}
                  className="flex-1 hidden border group-hover:flex  bg-green-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirm((prev) => !prev), setEditData(element);
                  }}
                  className="flex-1 border hidden group-hover:flex "
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {openUploadCategory && (
        <UploadCategoryModel
          fetchCategory={fetchCategory}
          onclose={() => setUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          
          dataEdit={editData}
          onclose={() => setOpenEdit(false)}
        />
      )}
      {openConfirm && (
        <ConfirmBox
          
          
          handleOk={()=>handleDeleteCategory()}
          onclose={() => setOpenConfirm(false)}
        />
      )}
    </section>
  );
}

export default CategoryPage;
