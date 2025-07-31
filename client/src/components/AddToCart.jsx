import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";

function AddToCart({ data }) {
  const { fetchCartItem, updateCartItem,deleteCartItem } = useGlobalContext();
  const cartItem = useSelector((state) => state.cart.cart);
  const [isAvailable, setIsAvailable] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails,setCartItemDetails]=useState()

  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailable(checkingItem);
    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity);
    setCartItemDetails(product)
  });

  const handleAddToCard = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
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
      console.log(error);
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
    <div>
      {isAvailable ? (
        <div>
          <button onClick={decreaseQty}>
            {" "}
            <FaMinus />
          </button>
          <p>{qty} </p>
          <button onClick={increaseQty}>
            {" "}
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCard} className="cursor-pointer border">
          add
        </button>
      )}
    </div>
  );
}

export default AddToCart;
