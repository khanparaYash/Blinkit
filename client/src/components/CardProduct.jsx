import React from "react";
import { validURLConverter } from "../utils/validURlConvert";
import { Link } from "react-router-dom";

import AddToCart from "./AddToCart";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/pricewithDiscount";

function CardProduct({ data }) {
  const url = `/product/${validURLConverter(data.name)}-${data._id}`;
  return (
    <Link
  to={url}
  className="bg-white my-2 shadow-md hover:shadow-xl transition-shadow duration-200 rounded-xl p-3  lg:p-4 w-full max-w-52 min-w-52 flex flex-col gap-2"
>
  {/* Product Image */}
  <div className="h-24 lg:h-32 w-full rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
    <img
      src={data?.image[0]}
      alt={data?.name || 'Product'}
      className="w-full h-full object-contain"
    />
  </div>

  {/* Tags: Time + Discount */}
  <div className="flex flex-wrap items-center gap-2 text-xs px-1">
    <span className="text-green-600 bg-green-50 rounded-full px-2 py-0.5">
      10 min
    </span>
    {data.discount > 0 && (
      <span className="text-green-700 bg-green-100 rounded-full px-2 py-0.5">
        {data.discount}% OFF
      </span>
    )}
  </div>

  {/* Product Name */}
  <div className="px-1 font-medium text-sm lg:text-base text-gray-800 line-clamp-2">
    {data.name}
  </div>

  {/* Unit */}
  <div className="px-1 text-xs text-gray-500">{data.unit}</div>

  {/* Price and Action */}
  <div className="flex items-center justify-between px-1 mt-auto">
    <div className="text-sm">
      {data.discount ? (
        <>
          <p className="font-semibold text-green-600">
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </p>
          <p className="line-through text-xs text-gray-400">
            {DisplayPriceInRupees(data.price)}
          </p>
        </>
      ) : (
        <p className="font-semibold text-gray-800">
          {DisplayPriceInRupees(data.price)}
        </p>
      )}
    </div>

    <div className="text-sm">
      {data.stock === 0 ? (
        <p className="text-red-500 text-xs">Out of stock</p>
      ) : (
        <AddToCart data={data} />
      )}
    </div>
  </div>
</Link>

  );
}

export default CardProduct;
