import React from 'react'

function ProductCardAdmin({data}) {
  return (
    <div>
        <div>
            <img src={data.image[0]} alt="" />
            <div>{data.name}</div>
        </div>
    </div>
  )
}

export default ProductCardAdmin