import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartSlice";
import { AxiosTostError } from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { handleAddAddress } from "../store/addressSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state?.cart?.cart);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_cart,
      });
      const { data: responseData } = response;

      if (responseData?.success)
        dispatch(handleAddItemCart(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.update_qty_cart,
        data: { _id: id, qty: qty },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_item_cart,
        data: { _id: cartId },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  const user=useSelector(state=>state.user.user)

  const fetchAddress=async()=>{
    try {
      const response=await Axios({
        ...SummaryApi.get_address
      })
      if(response.data.success)
        dispatch(handleAddAddress(response.data.data))
    } catch (error) {
      AxiosTostError(error)
    }
  }

  useEffect(() => {
    const Qty = cartItem?.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(Qty);

    const tPrice = cartItem.reduce((prev, curr) => {
      return prev + curr.productId?.price * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);
  }, [cartItem]);
  
  useEffect(() => {
    fetchCartItem();
    fetchAddress();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
