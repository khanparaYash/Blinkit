import React from 'react'
import { validURLConverter } from '../utils/validURlConvert'
import { Link } from 'react-router-dom'

function CardProduct({data}) {
    const url=`/product/${validURLConverter(data.name)}-${data._id}`
  return (
    <Link to={url}>
        <img src={data.image[0]} alt="" />
        <div>{data.name}</div>
        <button className='border'>add</button>
    </Link>
  )
}

export default CardProduct