import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'
import { Axios } from '../utils/Axios'
import { SummaryApi } from '../common/SummaryApi'

function ProductCardAdmin({data,fetchProductData}) {
  const [editData,setEditData]=useState(false)
  const [deleteData,setdeleteData]=useState(false)
  const handleDelete=async()=>{
    const responce=await Axios({
      ...SummaryApi.delete_product,
      data:{_id:data._id}
    })
    if(responce.data.success){
      setdeleteData(false)
    }
  }
  return (
    <div>
        <div>
            <img src={data.image[0]} alt="" />
            <div>{data.name}</div>
        </div>
        <div>
          <button onClick={()=>setEditData(true)}>edit</button>
          <button onClick={()=>{setdeleteData(true)}}>Delete</button>
        </div>
        {
          editData&&(
            <EditProductAdmin onclose={()=>setEditData(false)} fetchProductData={fetchProductData} oldData={data}/>
          )
        }
        {
          deleteData&&(
            <ConfirmBox onclose={()=>{setdeleteData(false)}}  handleOk={()=>handleDelete()}/>
          )
        }
    </div>

  )
}

export default ProductCardAdmin