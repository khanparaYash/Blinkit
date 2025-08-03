import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import toast from "react-hot-toast";

function ProductCardAdmin({ data, fetchProductData }) {
  const [editData, setEditData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);

  const handleDelete = async () => {
    try {

      const response = await Axios({
        ...SummaryApi.delete_product,
        data: { _id: data._id },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setDeleteData(false);
        if (fetchProductData) {
          fetchProductData();
        }
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  return (
    <div className="w-36 p-4 justify-self-center bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt=""
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-400">{data?.unit}</p>
      <div className="grid grid-cols-2  gap-3 py-2">
        <button
          onClick={() => setEditData(true)}
          className="border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
        >
          Edit
        </button>
        <button
          className="border px-1 py-1 text-sm  border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded"
          onClick={() => {
            setDeleteData(true);
          }}
        >
          Delete
        </button>
      </div>
      {editData && (
        <EditProductAdmin
          onclose={() => setEditData(false)}
          fetchProductData={fetchProductData}
          oldData={data}
        />
      )}
      {deleteData && (
        <ConfirmBox
          onclose={() => {
            setDeleteData(false);
          }}
          handleOk={() => handleDelete()}
        />
      )}
    </div>
  );
}

export default ProductCardAdmin;
