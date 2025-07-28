import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  allCategory: [],
  subCategory: [],
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {  
      state.allCategory = [...action.payload];
    },
    setSubCategory: (state, action) => {  
      state.subCategory = [...action.payload];
    },
     removeCategory: (state, action) => {
      state.allCategory = state.allCategory.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});
export const {setAllCategory,setSubCategory,removeCategory}=productSlice.actions
export default productSlice.reducer