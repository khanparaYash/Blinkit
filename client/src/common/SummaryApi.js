export const baseURL = import.meta.env.VITE_BACKEND;

export const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refresh_token:{
    url:'/api/user/refresh-token',
    method:"post",
  },
  user_details:{
    url:'/api/user/user-details',
    method:"get",
  },
  logout:{
    url:'/api/user/logout',
    method:"get",
  },
  upload_avatar:{
    url:'/api/user/upload-avatar',
    method:"put",
  },
  add_Category:{
    url:'api/category/add-category',
    method:"post"
  },
  upload_Image:{
    url:"api/file/upload",
    method:"post"
  },
  get_Category:{
    url:"api/category/get-category",
    method:"get"
  },
  update_category:{
    url:"api/category/update-category",
    method:"put"
  },
  delete_category:{
    url:"api/category/delete-category",
    method:"delete"
  },
  add_sub_category:{
    url:"api/subCategory/add-subCategory",
    method:"post"
  },
  get_sub_category:{
    url:"api/subCategory/get-subCategory",
    method:"get"
  },
  update_sub_category:{
    url:"api/subCategory/update-subCategory",
    method:"put"
  },
  delete_sub_category:{
    url:"api/subCategory/delete-subCategory",
    method:"delete"
  },
  add_product:{
    url:"api/product/add-product",
    method:"post"
  },
  get_product:{
    url:"api/product/get-product",
    method:"post"
  },
  get_productByCategory:{
    url:"api/product/get-product-by-category",
    method:"post"
  },
  get_productByCategory_SubCategory:{
    url:"api/product/get-product-by-category-subCategory",
    method:"post"
  },
  get_product_details:{
    url:"api/product/get-product-Details",
    method:"post"
  },
  update_product:{
    url:"api/product/update-product",
    method:"put"
  },
  delete_product:{
    url:"api/product/delete-product",
    method:"delete"
  },
  search_product:{
    url:"api/product/search-product",
    method:"post"
  },
  add_to_cart:{
    url:"api/cart/add-cart",
    method:"post"
  }, 
  get_cart:{
    url:"api/cart/get-cart",
    method:"get"
  },
  update_qty_cart:{
    url:"api/cart/update-qty-cart",
    method:"put"
  },
  delete_item_cart:{
    url:"api/cart/delete-cart",
    method:"delete"
  },
  Add_address:{
    url:"api/address/create",
    method:"post"
  },
  get_address:{
    url:"api/address/get",
    method:"get"
  },
  update_address:{
    url:"api/address/update",
    method:"put"
  },
  delete_address:{
    url:"api/address/delete",
    method:"put"
  },
  cash_on_delivery:{
    url:"api/order/cash-on-delivery",
    method:"post"
  },
  payment_url:{
    url:"api/order/checkout",
    method:"post"
  },
  order_list:{
    url:"api/order/order-list",
    method:"get"
  },
};
