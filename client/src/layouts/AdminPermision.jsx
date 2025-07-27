import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

function AdminPermision({children}) {
    const user=useSelector(state=>state.user)
  return (
    <>
    {
        isAdmin(user.role)?children:<p>don't have AdminPermision</p>
    }
    </>
  )
}

export default AdminPermision