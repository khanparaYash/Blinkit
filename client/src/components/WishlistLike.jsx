import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { setUserDetails } from "../store/userSlice";
import { AxiosTostError } from "../utils/AxiosToastError";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useEffect } from "react";
function WishlistLike({ data }) {
  const wishlist = useSelector((state) => state?.user?.wishlist);

  const [likeLoading, setLikeLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!data?._id) return;

    const inWishlist = wishlist?.some((item) => {
      const pid =
        typeof item.productId === "object"
          ? item.productId._id
          : item.productId;
      return pid === data._id;
    });

    setIsWishlisted(inWishlist);
  }, [wishlist, data?._id]);

  const dispatch = useDispatch();
  
  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLikeLoading(true);
      if (isWishlisted) {
        const responce = await Axios({
          ...SummaryApi.remove_to_wishlist,
          data: { productId: data._id },
        });
        if (responce.data.success) {
          setIsWishlisted(false);
          dispatch(setUserDetails(responce.data.data));
        }
      } else {
        const responce = await Axios({
          ...SummaryApi.add_to_wishlist,
          data: { productId: data._id },
        });
        if (responce.data.success) {
          setIsWishlisted(true);
          dispatch(setUserDetails(responce.data.data));
        }
      }
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLikeLoading(false);
    }
  };
  return (
    <div>
      {likeLoading ? (
        <ImSpinner2 className="w-4 h-4 text-red-500 animate-spin" />
      ) : (
        <button onClick={toggleWishlist} className="cursor-pointer">
          {isWishlisted ? <FaHeart color="red" size={19} /> : <FaRegHeart size={19}/>}
        </button>
      )}
    </div>
  );
}

export default WishlistLike;
