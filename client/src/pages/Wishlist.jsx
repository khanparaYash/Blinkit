import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
function Wishlist() {
    
  const [wishlist, setWishlist] = useState([]);
  
  const fetchWishlist = async () => {
    try {
      const response = await Axios(SummaryApi.get_to_wishlist);
      console.log(response.data.wishlist);
      
      if (response.data.success) {
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  useEffect(()=>{
    fetchWishlist()
  },[])

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-lg font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-4">Start adding items you love.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {wishlist.map((item, index) => (
          <CardProduct key={index} data={item.productId} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
