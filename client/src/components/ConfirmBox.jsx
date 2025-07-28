/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Axios } from '../utils/Axios'
import { SummaryApi } from '../common/SummaryApi'
import toast from 'react-hot-toast'

function ConfirmBox({  onclose,handleOk}) {
    
    const handelDelete=async ()=>{
      
       handleOk()
      
        // const deleteData=await Axios({
        //     ...SummaryApi.delete_category,
        //     data:deleteId
        // })
        
        // if(deleteData.data.success){
        //     toast.success(deleteData.data.message)
            
        //     onclose()
        // }
    }
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Delete Category</h3>

        <div className="flex justify-end">
          <button
            onClick={handelDelete}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            delete
          </button>
          <button
            onClick={onclose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox