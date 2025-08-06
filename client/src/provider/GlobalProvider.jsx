import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";
import { pricewithDiscount } from "../utils/pricewithDiscount";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const cartItem = useSelector((state) => state?.cart?.cart);
  const [loading, setLoading] = useState(false);

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
      console.log(error);
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
      console.log(error);
    }
  };
  const user = useSelector((state) => state.user);

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_address,
      });
      if (response.data.success) dispatch(handleAddAddress(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.order_list,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const Qty = cartItem?.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(Qty);

    const tPrice = cartItem.reduce((preve, curr) => {
      const priceAfterDiscount = pricewithDiscount(
        curr?.productId?.price,
        curr?.productId?.discount
      );

      return preve + priceAfterDiscount * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce((prev, curr) => {
      return prev + curr?.productId?.price * curr.quantity;
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  useEffect(() => {
    if (user?._id) {
      fetchCartItem();
      fetchAddress();
      fetchOrder();
    }
  }, [user?._id]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        notDiscountTotalPrice,
        totalPrice,
        totalQty,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
