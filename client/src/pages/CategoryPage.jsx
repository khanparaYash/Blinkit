import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AxiosTostError } from "../utils/AxiosToastError";
import {
  removeCategory,
  setAllCategory,
  setLoadingCategory,
} from "../store/ProductSlice";

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
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state?.product?.allCategory);

  useEffect(() => {
    setLoading(true);
    setData(allCategory);
    setLoading(false);
  }, [allCategory]);

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.get_Category,
      });
      const { data: responseData } = response;

      if (responseData?.success) dispatch(setAllCategory(responseData?.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
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
      AxiosTostError(error);
      setOpenConfirm(false);
    }
  };
  return (
    <section className="">
      <div className="p-2   bg-white shadow-md flex items-center justify-between">
        <h2 className=" font-semibold">Category</h2>
        <button
          onClick={() => setUploadCategory((pre) => !pre)}
          className="text-sm border border-amber-300 hover:bg-amber-300 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>

      {!data[0] && !loading && <p>No data</p>}

      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {data.map((element, index) => {
          return (
            <div className="w-32 h-56 rounded shadow-md  " key={index}>
              <img src={element.image} className="w-full object-scale-down " alt="" />
              
              <div className="items-center h-9 flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit((prev) => !prev), setEditData(element);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirm((prev) => !prev), setEditData(element);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
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
        <EditCategory dataEdit={editData} onclose={() => setOpenEdit(false)} />
      )}
      {openConfirm && (
        <ConfirmBox
          handleOk={() => handleDeleteCategory()}
          onclose={() => setOpenConfirm(false)}
        />
      )}
    </section>
  );
}

export default CategoryPage;
