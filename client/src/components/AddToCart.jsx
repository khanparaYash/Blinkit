import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AxiosTostError } from "../utils/AxiosToastError";

function AddToCart({ data }) {
  const { fetchCartItem, updateCartItem,deleteCartItem } = useGlobalContext();
  const cartItem = useSelector((state) => state.cart.cart);
  const [isAvailable, setIsAvailable] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails,setCartItemDetails]=useState()
 const [loading,setLoading]=useState(false)
  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailable(checkingItem);
    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity);
    setCartItemDetails(product)
  },[]);

  const handleAddToCard = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.add_to_cart,
        data: { productId: data._id },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosTostError(error)
    }finally{
      setLoading(false)
    }
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(qty==1){
        return deleteCartItem(cartItemDetails?._id)
    }
    updateCartItem(cartItemDetails?._id,qty-1)
  };
  const increaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateCartItem(cartItemDetails?._id,qty+1)
  };
  return (
    <div className='w-full max-w-[150px]'>
      {isAvailable ? (
        <div>
          <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'>
            {" "}
            <FaMinus />
          </button>
          <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty} </p>
          <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'>
            {" "}
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCard} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
          {loading?("loading.."):("Add")}
        </button>
      )}
    </div>
  );
}

export default AddToCart;
