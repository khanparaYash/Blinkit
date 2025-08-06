import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import productReducer from "./ProductSlice"
import cartReducer from "./cartSlice"
import addressReducer from "./addressSlice"
import orderReducer from "./orderSlice"
import categoryProductReducer from "./cataegoryProductSlice"
const store = configureStore({
  reducer: {
    user:userReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer,
    order:orderReducer,
    categoryProduct:categoryProductReducer,
  },
})

export default store