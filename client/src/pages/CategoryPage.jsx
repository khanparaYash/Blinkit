import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
function CategoryPage() {
  const [openUploadCategory,setUploadCategory]=useState(false)
  return (
    <section className='min-h-screen bg-gray-100 p-4'>
      <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Category</h2>
        <button onClick={()=>setUploadCategory(pre=>!pre)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Category
        </button>
      </div>
      {
        openUploadCategory &&(<UploadCategoryModel onclose={()=>setUploadCategory(false)}/>)
      }
      
    </section>
  )
}

export default CategoryPage