import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchUserDetails } from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { Axios } from "./utils/Axios";
import { SummaryApi } from "./common/SummaryApi";
import { setAllCategory, setLoadingCategory, setSubCategory } from "./store/ProductSlice";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobileLink";
function App() {
  const dispatch = useDispatch();
  const location=useLocation()
  const fetchUser = async () => {
    const user = await fetchUserDetails();
    dispatch(setUserDetails(user.data.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.get_Category,
      });
      const { data: responseData } = response;
      
      if (responseData?.success) dispatch(setAllCategory(responseData?.data));

    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoadingCategory(false))
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_sub_category,
      });
      const { data: responseData } = response;
      
      if (responseData?.success) dispatch(setSubCategory(responseData?.data));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    
  }, []);
  return (
    <GlobalProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname!=="/checkout"&&(

          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  );
}

export default App;
