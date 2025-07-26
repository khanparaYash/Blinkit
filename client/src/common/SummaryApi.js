export const baseURL = "http://localhost:8000";

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
  }
};
