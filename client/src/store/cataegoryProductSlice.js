import { createSlice } from "@reduxjs/toolkit";
const initialValue = {  categories: {}  };
const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: initialValue,
  reducers: {
     setCategoryProducts: (state, action) => {
      const { categoryId, products } = action.payload;
      state.categories[categoryId] = {
        data: products,
        lastFetched: Date.now()
      };
    }
  },
});

export const { setCategoryProducts } = categoryProductSlice.actions;
export default categoryProductSlice.reducer;
