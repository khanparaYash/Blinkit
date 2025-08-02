import React from 'react'
import UserMenu from "../components/UserMenu.jsx"
import { IoClose } from "react-icons/io5";

function UserMenuMobile() {
  return (
   <section>
     <button onClick={()=>window.history.back()} className='text-neutral-800 cursor-pointer block w-fit ml-auto'>
          <IoClose size={25}/>
        </button>
         <div className='container mx-auto px-3 pb-8'>
           <UserMenu/>
        </div>
   </section>
  )
}

export default UserMenuMobile       