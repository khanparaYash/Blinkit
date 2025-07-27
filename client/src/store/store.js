import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import productReducer from "./ProductSlice"
const store = configureStore({
  reducer: {
    user:userReducer,
    product:productReducer
  },
})

export default store