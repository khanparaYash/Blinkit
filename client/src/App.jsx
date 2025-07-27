import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchUserDetails } from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { Axios } from "./utils/Axios";
import { SummaryApi } from "./common/SummaryApi";
import { setAllCategory } from "./store/ProductSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const user = await fetchUserDetails();
    dispatch(setUserDetails(user.data.data));
  };
  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_Category,
      });
      const { data: responseData } = response;
      
      if (responseData?.success) dispatch(setAllCategory(responseData?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
