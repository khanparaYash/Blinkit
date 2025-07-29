import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  allCategory: [],
  subCategory: [],
  loadingCategory:false,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {  
      state.allCategory = [...action.payload];
    },
    setLoadingCategory:(state,action)=>{
      state.loadingCategory=action.payload
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
export const {setAllCategory,setSubCategory,setLoadingCategory,removeCategory}=productSlice.actions
export default productSlice.reducer