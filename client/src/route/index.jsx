import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import UserMenuMobile from "../pages/UserMenuMobile";
import CartMobile from "../pages/CartMobile";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success"
import Cancel from "../pages/cancel";
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"otp-verification",
                element:<OtpVerification/>
            },
            {
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"address",
                element:<Address/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                    {
                        path:"myOrders",
                        element:<MyOrder/>
                    },
                    {
                        path:"address",
                        element:<Address/>
                    },
                    {
                        path:"category",
                        element: <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path:"sub-category",
                        element:<AdminPermision><SubCategory/></AdminPermision>
                    },
                    {
                        path:"upload-product",
                        element:<AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path:"product",
                        element:<AdminPermision><ProductAdmin/></AdminPermision>
                    },
                ]
            },
            {
                path:"user",
                element:<UserMenuMobile/>
            },
            {
                path:":category",
                children:[
                    {
                        path:":subCategory",
                        element:<ProductListPage/>
                    }
                ]
            },
            {
                path:"product/:product",
                element:<ProductDisplayPage/>
            },
            {
                path:"cart",
                element:<CartMobile/>
            },
            {
                path:"checkout",
                element:<Checkout/>
            },
            {
                path:"success",
                element:<Success/>
            },
            {
                path:"cancel",
                element:<Cancel/>
            },
        ]
    }
])
export default router