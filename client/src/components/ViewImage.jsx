import React from 'react'

function ViewImage({url,close}) {
  return (
    <div className='fixed top-18  bottom-0 right-0 left-0 w-full  bg-neutral-600/50'>
        <div className='cursor-pointer border w-fit bg-amber-500' onClick={()=>close()}>
            close
        </div>
        <div className='w-full max-w-md p-4'>
            <img src={url} alt="" />
        </div>
    </div>
  )
}

export default ViewImage