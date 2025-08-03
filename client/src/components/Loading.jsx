import React from 'react'

function Loading() {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70  z-50 overflow-auto flex items-center justify-center p-4'>
     
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    
    </div>
  )
}

export default Loading