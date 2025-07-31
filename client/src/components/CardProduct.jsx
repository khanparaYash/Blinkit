import React from "react";
import { validURLConverter } from "../utils/validURlConvert";
import { Link } from "react-router-dom";

import AddToCart from "./AddToCart";

function CardProduct({ data }) {
  const url = `/product/${validURLConverter(data.name)}-${data._id}`;
  

  return (
    <Link to={url}>
      <div>
        <img src={data.image[0]} alt="" />
        <div>{data.name}</div>
        <AddToCart data={data} />
      </div>
    </Link>
  );
}

export default CardProduct;
