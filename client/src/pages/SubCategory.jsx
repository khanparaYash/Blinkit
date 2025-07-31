import React, { useEffect, useState } from "react";
import UploadSubCategory from "../components/UploadSubCategory";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { createColumnHelper } from "@tanstack/react-table";
import SubCategoryTable from "./../components/SubCategoryTable";
import ViewImage from "../components/ViewImage";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSubCategory } from "../store/ProductSlice";

function SubCategory() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [ImageURl, setImageURl] = useState("");

  const [loading, setLoading] = useState(false);
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      header: "Subcategory Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="subcat"
          onClick={() => setImageURl(info.getValue())}
          className="h-12 w-12 rounded"
        />
      ),
    }),
    columnHelper.accessor(
      (row) => row.category.map((c) => c.name).join(", ") || "N/A",
      {
        id: "categoryNames",
        header: "Parent Categories",
        cell: (info) => info.getValue(),
      }
    ),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: (info) => {
        return (
          <div className="flex gap-1">
            <button
              onClick={() => {
                setEditData(info.row.original), setOpenEdit((prev) => !prev);
              }}
            >
              edit
            </button>
            <button  onClick={() => {
                setEditData(info.row.original), setOpenConfirm((prev) => !prev);
              }}>delete</button>
          </div>
        );
      },
    }),
  ];
const dispatch=useDispatch()
  const fetchSubCAtegory = async () => {
    setLoading(true);
    const response = await Axios({
      ...SummaryApi.get_sub_category,
    });
    if (response.data.success) {
      setData(response.data.data);
      dispatch(setSubCategory(response.data?.data))
    }
    setLoading(false);
  };


  const handleDeleteSubCategory=async()=>{
    const response=await Axios({
      ...SummaryApi.delete_sub_category,
      data:editData
    })
    if(response.data.success){
      toast.success(response.data.message)
      setOpenConfirm(false)
      fetchSubCAtegory();
    }
  }
  useEffect(() => {
    fetchSubCAtegory();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 p-4 ">
      <div className="bg-white rounded-xl shadow mb-3 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Category</h2>
        <button
          onClick={() => setOpenUploadSubCategory((pre) => !pre)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Sub Category
        </button>
      </div>
      {!data[0] && !loading && <p>No data</p>}
      <SubCategoryTable data={data} columns={columns} />

      {openUploadSubCategory && (
        <UploadSubCategory fetchSubCAtegory={fetchSubCAtegory} onclose={() => setOpenUploadSubCategory(false)} />
      )}
      {openEdit && (
        <EditSubCategory
          EditData={editData}
          fetchSubCategory={fetchSubCAtegory}
          onclose={() => setOpenEdit(false)}
        />
      )}
      {openConfirm && <ConfirmBox onclose={() => setOpenConfirm(false)} handleOk={()=>{handleDeleteSubCategory()}}/>}
      {ImageURl && <ViewImage url={ImageURl} close={() => setImageURl("")} />}
    </section>
  );
}

export default SubCategory;
